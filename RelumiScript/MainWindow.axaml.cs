using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Interactivity;
using Avalonia.Media;
using Avalonia.Platform.Storage;
using Avalonia.Threading;
using AvaloniaWebView;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RelumiScript.Models;
using RelumiScript.Services;
using RelumiScript.Services.Interfaces;
using RelumiScript.ViewModels;
using WebViewCore.Events;

namespace RelumiScript
{
    public partial class MainWindow : Avalonia.Controls.Window
    {
        private MainViewModel _viewModel;
        private MessageRenderer? _messageRenderer;

        public ThemeEditorViewModel ThemeVm => _viewModel.ThemeVm;

        private bool _isEditorReady = false;
        private bool _isTerminalReady = false;
        private bool _isNavigating = false;
        private TerminalSession? _terminalSession;
        private Queue<string> _terminalOutputQueue = new Queue<string>();
        private DispatcherTimer _autoSaveTimer;

        private string _currentView = "Explorer";
        private string _currentBottomView = "";
        private GridLength _lastSidebarWidth = new GridLength(300);

        // Track the height of the bottom panel so we can restore it when toggling back on
        private double _lastBottomRowHeight = 250;

        private List<string> _currentMessagePages = new List<string>();
        private int _currentPageIndex = 0;

        public MainWindow()
        {
            var projectService = new ProjectService();
            var dialogService = new DialogService(this);
            _viewModel = new MainViewModel(projectService, dialogService);

            InitializeComponent();
            DataContext = _viewModel;
            TabStrip.ItemsSource = _viewModel.Documents;

            InitializeEditor();
            InitializeTerminal();
            TryInitMessageRenderer();
            SetupAutosave();

            _viewModel.ThemeVm.Colors.PropertyChanged += (s, e) => UpdateDynamicResources();
            PanelTheme.DataContext = _viewModel.ThemeVm;
            RefreshThemeList();
            SwitchSideView("Explorer");
            UpdateNoTabsPlaceholder();

            _viewModel.PropertyChanged += ViewModel_PropertyChanged;
            this.Closing += (s, e) => _terminalSession?.Dispose();
        }

        private void SetupAutosave()
        {
            _autoSaveTimer = new DispatcherTimer();
            _autoSaveTimer.Interval = TimeSpan.FromSeconds(2);
            _autoSaveTimer.Tick += AutoSaveTimer_Tick;
            _autoSaveTimer.Start();
        }

        private async void AutoSaveTimer_Tick(object? sender, EventArgs e) { await _viewModel.SaveAllCommand(); }

        private async void ViewModel_PropertyChanged(object? sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(MainViewModel.Files))
            {
                // DELEGATE TO VIEWMODEL INSTEAD OF OVERWRITING ITEMSSOURCE
                _viewModel.Explorer.Refresh();

                SwitchSideView("Explorer");
                if (_terminalSession != null && _terminalSession.IsRunning && !string.IsNullOrEmpty(_viewModel.Project.WorkingDirectory))
                {
                    _terminalSession.SendCommand($"Set-Location -Path \"{_viewModel.Project.WorkingDirectory}\";");
                }
            }
            else if (e.PropertyName == nameof(MainViewModel.AnalysisRevision)) RefreshAllTrackers();
            else if (e.PropertyName == nameof(MainViewModel.SyntaxRevision))
            {
                if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");
            }
            else if (e.PropertyName == nameof(MainViewModel.ActiveDocument))
            {
                if (_viewModel.ActiveDocument != null) { TabStrip.SelectedItem = _viewModel.ActiveDocument; await SetEditorText(_viewModel.ActiveDocument.Content); }
                else { await SetEditorText(""); }
                UpdateNoTabsPlaceholder();
            }
        }

        private (FileNode? file, int startLine) GetParentFileAndLine(ScriptNode sNode)
        {
            if (_viewModel.Files == null) return (null, 0);
            var parent = _viewModel.Files.FirstOrDefault(f => f.Scripts.Contains(sNode));
            if (parent != null)
            {
                int line = 1;
                foreach (var s in parent.Scripts)
                {
                    if (s == sNode) return (parent, line);
                    line += s.Content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None).Length;
                }
            }
            return (null, 0);
        }

        private async Task ScrollToLine(int lineNumber)
        {
            if (_isEditorReady)
            {
                await Task.Delay(50);
                await Editor.ExecuteScriptAsync($"editor.revealLineInCenter({lineNumber}); editor.setPosition({{lineNumber: {lineNumber}, column: 1}}); editor.focus();");
            }
        }

        public async void ScriptTree_SelectionChanged(object? sender, SelectionChangedEventArgs e)
        {
            if (_isNavigating) return;
            if (ScriptTree.SelectedItem is ScriptNode s)
            {
                _viewModel.OpenDocument(s, isPeek: true);
                var (parent, offset) = GetParentFileAndLine(s);
                if (parent != null) await ScrollToLine(offset);
            }
            else if (ScriptTree.SelectedItem is FileNode f) _viewModel.OpenDocument(f, isPeek: true);
        }

        public async void OnExplorerItem_DoubleTapped(object? sender, TappedEventArgs e)
        {
            var node = (sender as Control)?.DataContext;
            if (node != null)
            {
                _viewModel.OpenDocument(node, isPeek: false);
                if (node is ScriptNode sNode)
                {
                    var (parent, offset) = GetParentFileAndLine(sNode);
                    if (parent != null) await ScrollToLine(offset);
                }
            }
        }

        public void OnSidebarNav_Click(object? sender, RoutedEventArgs e) { if (sender is Button btn && btn.Tag is string tag) SwitchSideView(tag); }

        private void SwitchSideView(string viewName, bool forceOpen = false)
        {
            if (!forceOpen && viewName == _currentView && SidePanelContainer.IsVisible) { _lastSidebarWidth = SidebarGrid.ColumnDefinitions[1].Width; SidebarGrid.ColumnDefinitions[1].Width = new GridLength(0); SidebarGrid.ColumnDefinitions[2].Width = new GridLength(0); SidePanelContainer.IsVisible = false; SetButtonActive(null); return; }
            if (!SidePanelContainer.IsVisible) { SidebarGrid.ColumnDefinitions[1].Width = _lastSidebarWidth; SidebarGrid.ColumnDefinitions[2].Width = new GridLength(4); }
            SidePanelContainer.IsVisible = true;
            _currentView = viewName;
            PanelFile.IsVisible = viewName == "File";
            PanelExplorer.IsVisible = viewName == "Explorer";
            PanelSearch.IsVisible = viewName == "Search";
            PanelFlags.IsVisible = viewName == "Flags";
            PanelCommands.IsVisible = viewName == "Commands";
            PanelTheme.IsVisible = viewName == "Theme";

            // NEW
            PanelHints.IsVisible = viewName == "Hints";

            SetButtonActive(viewName);

            if (viewName == "Search") Dispatcher.UIThread.Post(() => { SearchBox.Focus(); if (!string.IsNullOrWhiteSpace(SearchBox.Text)) PerformSearch(SearchBox.Text); });
            else if (viewName == "Flags") { if (_viewModel.Project.AllFlagUsages.Count > 0 && FlagList.ItemsSource == null) FilterFlags(""); }
            else if (viewName == "Commands") { if (_viewModel.Project.AllWorkUsages.Count > 0 && ScriptList.ItemsSource == null) FilterWorks(""); }
            else if (viewName == "Explorer") Dispatcher.UIThread.Post(() => ExplorerSearchBox.Focus());
        }
        private void SetButtonActive(string? activeTag)
        {
            UpdateBtnStyle(BtnNavFile, activeTag);
            UpdateBtnStyle(BtnNavExplorer, activeTag);
            UpdateBtnStyle(BtnNavSearch, activeTag);
            UpdateBtnStyle(BtnNavFlags, activeTag);
            UpdateBtnStyle(BtnNavCommands, activeTag);

            // NEW
            UpdateBtnStyle(BtnNavHints, activeTag);

            UpdateBtnStyle(BtnNavTheme, activeTag);
        }
        private void UpdateBtnStyle(Button btn, string? activeTag) { if (btn.Tag?.ToString() == activeTag) { if (!btn.Classes.Contains("Active")) btn.Classes.Add("Active"); } else btn.Classes.Remove("Active"); }

        private void PerformSearch(string? query)
        {
            if (string.IsNullOrWhiteSpace(query)) { SearchResultsList.ItemsSource = null; return; }
            var results = new List<SearchResult>(); query = query.Trim(); bool isIdSearch = int.TryParse(query, out int searchId);
            var service = _viewModel.Project.AssetService;
            var workMap = _viewModel.Project.WorkIdMap;

            if (isIdSearch && service.PokemonMap.TryGetValue(searchId, out string? pName)) results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = searchId, Name = pName });
            var pkmMatches = service.PokemonMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId);
            foreach (var kvp in pkmMatches.Take(20)) results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = kvp.Key, Name = kvp.Value });
            if (isIdSearch && service.ItemMap.TryGetValue(searchId, out string? iName)) results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = searchId, Name = iName });
            var itmMatches = service.ItemMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId);
            foreach (var kvp in itmMatches.Take(20)) results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = kvp.Key, Name = kvp.Value });

            if (isIdSearch && workMap.TryGetValue(searchId, out string? wName)) { var usage = _viewModel.Project.AllWorkUsages.FirstOrDefault(u => u.FlagName.Equals("@" + wName, StringComparison.OrdinalIgnoreCase)); results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Id = searchId, Name = wName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() }); }
            var wrkMatches = _viewModel.Project.AllWorkUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var w in wrkMatches.Take(20)) results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Name = w.FlagName, Locations = new ObservableCollection<FlagLocation>(w.Locations) });

            if (isIdSearch && service.FlagMap.TryGetValue(searchId, out string? fName)) { var usage = _viewModel.Project.AllFlagUsages.FirstOrDefault(u => u.FlagName.Equals("#" + fName, StringComparison.OrdinalIgnoreCase)); results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Id = searchId, Name = fName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() }); }
            if (isIdSearch && service.SysFlagMap.TryGetValue(searchId, out string? sName)) { var usage = _viewModel.Project.AllFlagUsages.FirstOrDefault(u => u.FlagName.Equals("$" + sName, StringComparison.OrdinalIgnoreCase)); results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Id = searchId, Name = sName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() }); }
            var flgMatches = _viewModel.Project.AllFlagUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var f in flgMatches.Take(20)) results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Name = f.FlagName, Locations = new ObservableCollection<FlagLocation>(f.Locations) });

            var cmdMatches = _viewModel.Project.AllCommandUsages.Where(x => x.CommandName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var c in cmdMatches.Take(20)) results.Add(new SearchResult { Type = "CMD", Color = "#BD93F9", Name = c.CommandName, Locations = new ObservableCollection<FlagLocation>(c.Locations) });
            var evtMatches = _viewModel.Project.AllEventUsages.Where(x => x.EventName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var e in evtMatches.Take(20)) { var sortedLocs = new ObservableCollection<FlagLocation>(e.Locations.OrderByDescending(l => l.IsDeclaration).ThenBy(l => l.FileName)); results.Add(new SearchResult { Type = "EVT", Color = "#FF79C6", Name = e.EventName, Locations = sortedLocs }); }

            SearchResultsList.ItemsSource = results;
            if (results.Count == 1) results[0].IsExpanded = true;
        }

        public void TitleBar_PointerPressed(object sender, PointerPressedEventArgs e) { if (e.GetCurrentPoint(this).Properties.IsLeftButtonPressed) BeginMoveDrag(e); }

        private void UpdateDynamicResources()
        {
            var colors = _viewModel.ThemeVm.Colors;
            this.Resources["ThemeWindowBackground"] = new SolidColorBrush(colors.WindowBackground);
            this.Resources["ThemeSidebarBackground"] = new SolidColorBrush(colors.SidebarBackground);
            this.Resources["ThemePanelBackground"] = new SolidColorBrush(colors.PanelBackground);
            this.Resources["ThemeActivityBarBackground"] = new SolidColorBrush(colors.ActivityBarBackground);
            this.Resources["ThemeAccentColor"] = new SolidColorBrush(colors.AccentColor);
            this.Resources["ThemeTextColor"] = new SolidColorBrush(colors.TextColor);
            this.Resources["ThemeInputBackground"] = new SolidColorBrush(colors.InputBackground);
            this.Resources["ThemeInputForeground"] = new SolidColorBrush(colors.InputForeground);
            this.Resources["ThemeActivityForeground"] = new SolidColorBrush(colors.ActivityForeground);
            this.Resources["ThemeActivityActiveForeground"] = new SolidColorBrush(colors.ActivityActiveForeground);
        }

        private string GetThemesFolder() { string baseDir = AppDomain.CurrentDomain.BaseDirectory; string themesDir = Path.Combine(baseDir, "Themes"); if (!Directory.Exists(themesDir)) Directory.CreateDirectory(themesDir); return themesDir; }
        private void RefreshThemeList()
        {
            _viewModel.ThemeVm.AvailableThemes.Clear(); var dir = GetThemesFolder(); var files = Directory.GetFiles(dir, "*.json");
            foreach (var f in files) _viewModel.ThemeVm.AvailableThemes.Add(Path.GetFileNameWithoutExtension(f));
            if (_viewModel.ThemeVm.AvailableThemes.Count == 0) { _viewModel.ThemeVm.AvailableThemes.Add("Default"); SaveThemeByName("Default"); }
            if (_viewModel.ThemeVm.AvailableThemes.Contains("Default")) _viewModel.ThemeVm.CurrentThemeName = "Default";
            else _viewModel.ThemeVm.CurrentThemeName = _viewModel.ThemeVm.AvailableThemes.First();
            LoadThemeByName(_viewModel.ThemeVm.CurrentThemeName);
        }
        private void LoadThemeByName(string name) { if (string.IsNullOrEmpty(name)) return; try { string path = Path.Combine(GetThemesFolder(), name + ".json"); if (File.Exists(path)) { var settings = JsonConvert.DeserializeObject<ThemeSettings>(File.ReadAllText(path)); if (settings != null) InjectTheme(settings); } } catch (Exception ex) { _viewModel.StatusMessage = $"Error loading theme {name}: {ex.Message}"; } }
        private void SaveThemeByName(string name) { if (string.IsNullOrEmpty(name)) return; try { var settings = _viewModel.ThemeVm.ToSettings(); string path = Path.Combine(GetThemesFolder(), name + ".json"); File.WriteAllText(path, JsonConvert.SerializeObject(settings, Formatting.Indented)); _viewModel.StatusMessage = $"Theme '{name}' saved."; } catch (Exception ex) { _viewModel.StatusMessage = $"Error saving theme: {ex.Message}"; } }
        public void ThemeComboBox_SelectionChanged(object? sender, SelectionChangedEventArgs e) { if (_viewModel.ThemeVm.CurrentThemeName != null) { LoadThemeByName(_viewModel.ThemeVm.CurrentThemeName); } }
        public async void BtnNewTheme_Click(object? sender, RoutedEventArgs e) { var dialog = new InputNameDialog(); string? result = await dialog.ShowDialog<string?>(this); if (string.IsNullOrWhiteSpace(result)) return; string safeName = string.Join("_", result.Split(Path.GetInvalidFileNameChars())); if (string.IsNullOrWhiteSpace(safeName)) safeName = "New_Theme"; if (_viewModel.ThemeVm.AvailableThemes.Contains(safeName)) { _viewModel.StatusMessage = $"Theme '{safeName}' already exists."; return; } _viewModel.ThemeVm.AvailableThemes.Add(safeName); _viewModel.ThemeVm.CurrentThemeName = safeName; SaveThemeByName(safeName); }
        public async void SaveTheme_Click(object? sender, RoutedEventArgs e) { if (!string.IsNullOrEmpty(_viewModel.ThemeVm.CurrentThemeName)) { SaveThemeByName(_viewModel.ThemeVm.CurrentThemeName); await InjectTheme(null); } }
        public void BtnResetTheme_Click(object? sender, RoutedEventArgs e) { if (!string.IsNullOrEmpty(_viewModel.ThemeVm.CurrentThemeName)) { LoadThemeByName(_viewModel.ThemeVm.CurrentThemeName); _viewModel.StatusMessage = "Theme changes discarded."; } }
        private async Task InjectTheme(ThemeSettings? directSettings = null) { ThemeSettings settings = directSettings ?? _viewModel.ThemeVm.ToSettings(); _viewModel.ThemeVm.LoadFromSettings(settings); UpdateDynamicResources(); if (_isEditorReady && Editor != null) { await Editor.ExecuteScriptAsync($"if (window.updateRelumiTheme) window.updateRelumiTheme({JsonConvert.SerializeObject(settings)});"); } }

        private void InitializeEditor()
        {
            string monacoPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "index.html");
            if (File.Exists(monacoPath)) { Editor.Url = new Uri($"file:///{monacoPath.Replace("\\", "/")}"); Editor.WebMessageReceived += OnEditorMessageReceived; Editor.NavigationCompleted += async (s, e) => { if (e.IsSuccess) { _isEditorReady = true; await InjectMonacoListeners(); await InjectTheme(); } }; }
        }

        private async Task InjectMonacoListeners()
        {
            string script = @"
                editor.onDidChangeCursorPosition((e) => {
                    var l = editor.getModel().getLineContent(e.position.lineNumber);
                    var m = l.match(/(?:_TALKMSG|_TALK_KEYWAIT|_EASY_OBJ_MSG|_EASY_BOARD_MSG)\s*\(\s*'([\w-]+)%([\w-]+)'\s*.*\)/);
                    var macroMatch = l.match(/(?:_MACRO_TALKMSG|_MACRO_TALK_KEYWAIT|_MACRO_EASY_OBJ_MSG)\s*\(\s*'([\w-]+)',\s*'([\w-]+)',\s*'([^']+)'\s*\)/);
                    if (m) {
                        window.chrome.webview.postMessage('PREVIEW:' + m[1] + '%' + m[2]);
                    } else if (macroMatch) {
                        window.chrome.webview.postMessage('PREVIEW:' + macroMatch[1] + '%' + macroMatch[2] + '%' + macroMatch[3]);
                    } else {
                        window.chrome.webview.postMessage('HIDE_PREVIEW');
                    }
                });
                editor.addAction({
                    id: 'relumi-lookup',
                    label: 'Search in Global View',
                    contextMenuGroupId: 'navigation',
                    contextMenuOrder: 1.5,
                    run: function(ed) {
                        var p = ed.getPosition();
                        var m = ed.getModel();
                        var w = m.getWordAtPosition(p);
                        if (w) {
                            var charBefore = w.startColumn > 1 ? m.getLineContent(p.lineNumber).charAt(w.startColumn - 2) : '';
                            var prefix = (charBefore === '#' || charBefore === '$' || charBefore === '@') ? charBefore : '';
                            window.chrome.webview.postMessage('GLOBAL_SEARCH:' + prefix + w.word);
                        }
                    }
                });
                editor.onDidChangeModelContent((e) => { if(!e.isFlush) window.chrome.webview.postMessage('CONTENT_UPDATE:' + editor.getValue()); });
                editor.addAction({ id: 'relumi-save', label: 'Save', keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S], run: function(ed) { window.chrome.webview.postMessage('SAVE_REQUEST'); } });
                editor.addAction({ id: 'relumi-edit-def', label: 'Edit Definition', contextMenuGroupId: 'navigation', contextMenuOrder: 1.0, run: function(ed) { var p = ed.getPosition(); var m = ed.getModel(); var w = m.getWordAtPosition(p); if(w) { var charBefore = w.startColumn > 1 ? m.getLineContent(p.lineNumber).charAt(w.startColumn - 2) : ''; var prefix = (charBefore === '#' || charBefore === '$' || charBefore === '@') ? charBefore : ''; var token = prefix + w.word; if (prefix === '#') { window.chrome.webview.postMessage('EDIT_DEFINITION:FLG:' + w.word); } else if (prefix === '$') { window.chrome.webview.postMessage('EDIT_DEFINITION:SYS:' + w.word); } else if (prefix === '@') { window.chrome.webview.postMessage('EDIT_DEFINITION:WRK:' + w.word); } else if(token.startsWith('Cmd_') || token.startsWith('_') || /^[A-Z0-9_]+$/.test(token)) { window.chrome.webview.postMessage('EDIT_DEFINITION:CMD:' + w.word); } } } });";
            await Editor.ExecuteScriptAsync(script);
        }

        private async void OnEditorMessageReceived(object? sender, WebViewMessageReceivedEventArgs e)
        {
            if (e.Message == "HIDE_PREVIEW") return;
            if (e.Message == "SAVE_REQUEST") { await _viewModel.SaveAllCommand(); return; }
            if (e.Message.StartsWith("PREVIEW:"))
            {
                var p = e.Message.Substring(8).Split('%');
                if (p.Length == 2)
                {
                    ShowMessagePreview(p[0].Trim(), p[1].Trim());
                }
                else if (p.Length == 3)
                {
                    ShowMessagePreview(p[0].Trim(), p[1].Trim(), p[2].Trim());
                }
                return;
            }
            if (e.Message.StartsWith("GLOBAL_SEARCH:")) { SwitchSideView("Search", forceOpen: true); SearchBox.Text = e.Message.Substring(e.Message.IndexOf(':') + 1).Trim(); return; }
            if (e.Message.StartsWith("CONTENT_UPDATE:"))
            {
                string newContent = e.Message.Substring(15);
                if (_viewModel.ActiveDocument != null)
                {
                    if (_viewModel.ActiveDocument.IsPreview) _viewModel.ActiveDocument.IsPreview = false;
                    _viewModel.ActiveDocument.Content = newContent;
                    _viewModel.ActiveDocument.IsDirty = !string.Equals(_viewModel.ActiveDocument.Content, _viewModel.ActiveDocument.OriginalContent);
                }
                return;
            }
            if (e.Message.StartsWith("EDIT_DEFINITION:"))
            {
                var parts = e.Message.Split(':');
                if (parts.Length < 3) return;
                await HandleEditDefinition(parts[1], parts[2]);
            }

            // --- NEW: Handle Load File Message from Ctrl+Click (Go To Def) ---
            if (e.Message.StartsWith("LOAD_FILE:"))
            {
                try
                {
                    var json = e.Message.Substring(10);
                    var data = JObject.Parse(json);
                    string path = data["path"]?.ToString() ?? "";
                    int line = data["line"]?.Value<int>() ?? 1;

                    if (!string.IsNullOrEmpty(path))
                    {
                        // Look for the file in the project
                        var targetFile = _viewModel.Files.FirstOrDefault(f =>
                            f.FileName.Equals(path, StringComparison.OrdinalIgnoreCase) ||
                            f.Name.Equals(path, StringComparison.OrdinalIgnoreCase) ||
                            f.FileName.EndsWith(path, StringComparison.OrdinalIgnoreCase));

                        if (targetFile != null)
                        {
                            _viewModel.OpenDocument(targetFile, isPeek: true); // Open file
                            await ScrollToLine(line); // Jump to line
                        }
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("Load File Error: " + ex.Message);
                }
                return;
            }
        }

        private async Task HandleEditDefinition(string type, string name)
        {
            int foundId = -1;
            object? dataObj = null;

            var service = _viewModel.Project.AssetService;
            var workMap = _viewModel.Project.WorkIdMap;

            if (type == "FLG")
            {
                var kvp = service.FlagMap.FirstOrDefault(x => x.Value == name);
                if (kvp.Value != null) { foundId = kvp.Key; dataObj = new NameDef { Id = foundId, Name = name }; }
            }
            else if (type == "SYS")
            {
                var kvp = service.SysFlagMap.FirstOrDefault(x => x.Value == name);
                if (kvp.Value != null) { foundId = kvp.Key; dataObj = new NameDef { Id = foundId, Name = name }; }
            }
            else if (type == "WRK")
            {
                var kvp = workMap.FirstOrDefault(x => x.Value == name);
                if (kvp.Value != null) { foundId = kvp.Key; dataObj = new NameDef { Id = foundId, Name = name }; }
            }
            else if (type == "CMD")
            {
                var cmd = service.Commands.FirstOrDefault(c => c.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
                if (cmd != null) { foundId = cmd.Id; dataObj = cmd; }
            }

            if (foundId == -1 || dataObj == null) { _viewModel.StatusMessage = $"Could not find definition for {name} ({type})."; return; }

            var dialog = new EditDataDialog(type, foundId, dataObj, service, workMap, _viewModel.ThemeVm);
            var result = await dialog.ShowDialog<bool>(this);

            if (result)
            {
                _viewModel.StatusMessage = $"Updated definition for {name}. Re-scanning...";
                await _viewModel.Project.GenerateSyntaxFile();
                if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");
                await _viewModel.Project.RefreshTrackersAsync(msg => _viewModel.StatusMessage = msg);
                _viewModel.AnalysisRevision++;
            }
        }

        private async Task SetEditorText(string content) { string safe = JsonConvert.ToString(content); if (_isEditorReady) await Editor.ExecuteScriptAsync($"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe}); editor.updateOptions({{readOnly: false}});"); }
        public async void BtnCloseTab_Click(object? sender, RoutedEventArgs e) { if (sender is Button btn && btn.Tag is EditorDocument doc) { if (doc.IsDirty) { bool result = await new DiscardChangesDialog(doc.Title.TrimEnd('*')).ShowDialog<bool>(this); if (!result) return; } _viewModel.CloseDocument(doc); } }
        private void TabStrip_SelectionChanged(object? sender, SelectionChangedEventArgs e) { if (TabStrip.SelectedItem is EditorDocument doc) _viewModel.ActiveDocument = doc; }
        private void UpdateNoTabsPlaceholder() { if (NoTabsPlaceholder != null) NoTabsPlaceholder.IsVisible = _viewModel.Documents.Count == 0; if (Editor != null) Editor.IsVisible = _viewModel.Documents.Count > 0; }

        public void OnPlaceholder_PointerPressed(object? sender, PointerPressedEventArgs e) { _viewModel.LoadProjectCommand(); }
        public async void OnWindowKeyDown(object? sender, KeyEventArgs e) { if (e.KeyModifiers == KeyModifiers.Control && e.Key == Key.S) { e.Handled = true; await _viewModel.SaveAllCommand(); } }
        public void BtnLoad_Click(object? sender, RoutedEventArgs e) { _viewModel.LoadProjectCommand(); }
        public async void BtnSave_Click(object? sender, RoutedEventArgs e) { await _viewModel.SaveAllCommand(); }
        public void CloseApp_Click(object? sender, RoutedEventArgs e) => Close();
        public void ShowTheme_Click(object? sender, RoutedEventArgs e) => SwitchSideView("Theme");

        public async void JumpToLocation_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Control c && c.Tag is FlagLocation loc)
            {
                _isNavigating = true;
                try
                {
                    int targetLine = loc.LineNumber;
                    object targetNode = loc.NodeObject;
                    if (loc.NodeObject is ScriptNode sNode)
                    {
                        var (parent, offset) = GetParentFileAndLine(sNode);
                        if (parent != null) { targetNode = sNode; targetLine = offset + loc.LineNumber - 1; }
                    }
                    if (targetNode != null) _viewModel.OpenDocument(targetNode, isPeek: true);
                    await ScrollToLine(targetLine);
                }
                finally { _isNavigating = false; }
            }
        }

        public void OnBottomNav_Click(object? sender, RoutedEventArgs e) { if (sender is Button btn && btn.Tag is string tag) SwitchBottomView(tag); }
        public void BtnTerminal_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Terminal");
        public void BtnTerminalClose_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Terminal");
        public void BtnPreviewClose_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Preview");

        private void SwitchBottomView(string viewName)
        {
            var bottomRow = MainContentGrid.RowDefinitions[3];

            if (BottomPanelContainer.IsVisible && _currentBottomView == viewName)
            {
                if (bottomRow.Height.Value > 0) _lastBottomRowHeight = bottomRow.Height.Value;
                bottomRow.Height = new GridLength(0);

                BottomPanelContainer.IsVisible = false;
                SetBottomButtonActive(null);
                return;
            }

            BottomPanelContainer.IsVisible = true;

            if (bottomRow.Height.Value == 0)
            {
                bottomRow.Height = new GridLength(_lastBottomRowHeight > 50 ? _lastBottomRowHeight : 250);
            }

            _currentBottomView = viewName;
            TerminalPanel.IsVisible = viewName == "Terminal";
            PreviewPanel.IsVisible = viewName == "Preview";
            SetBottomButtonActive(viewName);
            if (viewName == "Terminal") { if (_terminalSession == null) { _terminalSession = new TerminalSession(); _terminalSession.OutputReceived += OnTerminalOutput; _terminalSession.Start(_viewModel.Project.WorkingDirectory); } TerminalWebView.Focus(); }
        }
        private void SetBottomButtonActive(string? activeTag) { UpdateBtnStyle(BtnNavTerminal, activeTag); UpdateBtnStyle(BtnNavPreview, activeTag); }

        private void InitializeTerminal()
        {
            // IMPROVED: Added ::-webkit-scrollbar CSS styles to the HTML header.
            // This forces the WebView to use a dark, flat scrollbar matching the app theme
            // instead of the default Windows scrollbar.
            string html = @"<!DOCTYPE html><html><head><link rel=""stylesheet"" href=""https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css"" /><script src=""https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js""></script><script src=""https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js""></script>
            <style>
                body { margin: 0; padding: 0; background-color: #0C0C0C; overflow: hidden; } 
                #terminal { width: 100vw; height: 100vh; }
                
                /* CUSTOM SCROLLBAR FOR TERMINAL */
                ::-webkit-scrollbar { width: 10px; height: 10px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #424242; border-radius: 0px; }
                ::-webkit-scrollbar-thumb:hover { background: #4F4F4F; }
                ::-webkit-scrollbar-corner { background: transparent; }
            </style>
            </head><body><div id=""terminal""></div><script>var term = new Terminal({ cursorBlink: true, theme: { background: '#0C0C0C', foreground: '#CCCCCC' }, fontFamily: 'Consolas, monospace', fontSize: 14, convertEol: true, rendererType: 'dom' }); var fitAddon = new FitAddon.FitAddon(); term.loadAddon(fitAddon); term.open(document.getElementById('terminal')); fitAddon.fit(); window.onresize = function() { fitAddon.fit(); }; window.addEventListener('click', function() { term.focus(); }); term.focus(); 
            
            term.attachCustomKeyEventHandler(e => {
                if (e.type !== 'keydown') return true;
                if (e.ctrlKey && e.key === 'c') {
                    if (term.hasSelection()) {
                        var text = term.getSelection();
                        if (navigator.clipboard) {
                            navigator.clipboard.writeText(text);
                        } else {
                            var textarea = document.createElement('textarea');
                            textarea.value = text;
                            document.body.appendChild(textarea);
                            textarea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textarea);
                        }
                        return false; 
                    }
                }
                if (e.ctrlKey && e.key === 'v') {
                     if (navigator.clipboard) {
                         navigator.clipboard.readText().then(text => {
                             window.chrome.webview.postMessage('TERM_INPUT:' + text);
                         });
                     }
                     return false;
                }
                return true;
            });

            window.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (navigator.clipboard) {
                    navigator.clipboard.readText().then(text => {
                        window.chrome.webview.postMessage('TERM_INPUT:' + text);
                    });
                }
            });

            if (!window.chrome || !window.chrome.webview) { term.write('\x1b[31mError: WebView Bridge not found. \r\n\x1b[0m\r\n'); } else { window.chrome.webview.postMessage('TERM_READY'); } var currentLine = """"; term.onData(e => { for (let i = 0; i < e.length; i++) { let char = e[i]; if (char === '\r') { term.write('\r\n'); if (window.chrome && window.chrome.webview) { window.chrome.webview.postMessage('TERM_INPUT:' + currentLine); } currentLine = """"; } else if (char === '\u007F') { if (currentLine.length > 0) { term.write('\b \b'); currentLine = currentLine.substring(0, currentLine.length - 1); } } else if (char === '\u0003') { term.write('^C\r\n'); currentLine = """"; } else { if (char.charCodeAt(0) >= 32) { currentLine += char; term.write(char); } } } }); window.writeOutput = function(data) { term.write(data); };</script></body></html>";
            try { string tempPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "terminal.html"); File.WriteAllText(tempPath, html); TerminalWebView.Url = new Uri($"file:///{tempPath.Replace("\\", "/")}"); } catch (Exception ex) { Debug.WriteLine("Terminal Init Error: " + ex.Message); }
            TerminalWebView.WebMessageReceived += OnTerminalMessageReceived;
            TerminalWebView.NavigationCompleted += (s, e) => { if (e.IsSuccess) { /* _isTerminalReady set in OnTerminalMessageReceived */ TerminalWebView.Focus(); } };
        }

        private void OnTerminalMessageReceived(object? sender, WebViewMessageReceivedEventArgs e)
        {
            if (e.Message == "TERM_READY")
            {
                _isTerminalReady = true;
                while (_terminalOutputQueue.Count > 0)
                {
                    OnTerminalOutput(_terminalOutputQueue.Dequeue());
                }
                return;
            }
            if (e.Message.StartsWith("TERM_INPUT:"))
            {
                string input = e.Message.Substring(11);
                _terminalSession?.SendCommand(input);
            }
        }

        private void OnTerminalOutput(string text)
        {
            Dispatcher.UIThread.Post(() => {
                if (_isTerminalReady)
                {
                    string safe = JsonConvert.ToString(text);
                    TerminalWebView.ExecuteScriptAsync($"window.writeOutput({safe});");
                }
                else
                {
                    _terminalOutputQueue.Enqueue(text);
                }
            });
        }

        private void RefreshAllTrackers() { if (_viewModel.Project.AllFiles.Count > 0) _viewModel.Explorer.Refresh(); FilterFlags(FlagSearchBox.Text ?? ""); FilterWorks(ScriptSearchBox.Text ?? ""); }
        public void RefreshFlags_Click(object? sender, RoutedEventArgs e) { _viewModel.Project.RefreshTrackersAsync(msg => _viewModel.StatusMessage = msg).ContinueWith(t => _viewModel.AnalysisRevision++); }
        public void RefreshScripts_Click(object? sender, RoutedEventArgs e) { _viewModel.Project.RefreshTrackersAsync(msg => _viewModel.StatusMessage = msg).ContinueWith(t => _viewModel.AnalysisRevision++); }
        public void SearchBox_TextChanged(object? sender, TextChangedEventArgs e) => PerformSearch(SearchBox.Text);
        public void FlagSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterFlags(FlagSearchBox.Text ?? "");
        public void ScriptSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterWorks(ScriptSearchBox.Text ?? "");
        private void FilterFlags(string query) { var unused = _viewModel.Project.AllFlagUsages.Where(x => x.Locations.Count == 0 && !x.FlagName.StartsWith("$")); if (string.IsNullOrWhiteSpace(query)) { FlagList.ItemsSource = unused.ToList(); return; } FlagList.ItemsSource = unused.Where(f => f.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList(); }
        private void FilterWorks(string query) { var unused = _viewModel.Project.AllWorkUsages.Where(x => x.Locations.Count == 0); if (string.IsNullOrWhiteSpace(query)) { ScriptList.ItemsSource = unused.ToList(); return; } ScriptList.ItemsSource = unused.Where(c => c.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList(); }

        private void BtnPrevPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex > 0) { _currentPageIndex--; RenderCurrentPage(); } }
        private void BtnNextPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex < _currentMessagePages.Count - 1) { _currentPageIndex++; RenderCurrentPage(); } }
        private void ShowMessagePreview(string file, string label, string? message = null)
        {
            TryInitMessageRenderer();

            if (_messageRenderer == null)
            {
                return;
            }

            if (message == null)
            {
                var target = _viewModel.Project.LoadedMessages
                    .FirstOrDefault(f => f.Name.Equals(file, StringComparison.OrdinalIgnoreCase))
                    ?.Scripts
                    .FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase));

                if (target != null)
                {
                    _currentMessagePages = _messageRenderer.SplitIntoPages(target.Content);
                    _currentPageIndex = 0;
                    RenderCurrentPage();
                }
            }
            else
            {
                _currentMessagePages = _messageRenderer.SplitIntoPages(message, true);
                _currentPageIndex = 0;
                RenderCurrentPage();
            }

        }

        private void RenderCurrentPage()
        {
            if (_messageRenderer == null || _currentMessagePages.Count == 0)
            {
                return;
            }

            _currentPageIndex = Math.Clamp(_currentPageIndex, 0, _currentMessagePages.Count - 1);

            MessagePreviewContent.Content = _messageRenderer.RenderPage(
                _currentMessagePages[_currentPageIndex],
                _currentPageIndex + 1,
                _currentMessagePages.Count
            );

            PageIndicator.Text = $"{_currentPageIndex + 1} / {_currentMessagePages.Count}";

            bool showPaginationControls = _currentMessagePages.Count > 1;
            BtnPrevPage.IsVisible = showPaginationControls;
            BtnNextPage.IsVisible = showPaginationControls;
            PageIndicator.IsVisible = showPaginationControls;
        }

        private void TryInitMessageRenderer()
        {
            if (_messageRenderer == null && !string.IsNullOrEmpty(_viewModel.Project.FindJsonFolder()))
            {
                _messageRenderer = new MessageRenderer(
                    Path.GetFullPath(Path.Combine(_viewModel.Project.FindJsonFolder()!, "..", "Assets"))
                );
            }
        }
        public void SearchResult_PointerWheelChanged(object? sender, PointerWheelEventArgs e) { if (e.KeyModifiers.HasFlag(KeyModifiers.Alt)) { if (sender is Control control && ToolTip.GetIsOpen(control)) { var tipContent = ToolTip.GetTip(control); if (tipContent is Border border && border.Child is ScrollViewer scroller) { double offset = e.Delta.Y * -30; scroller.Offset = new Vector(scroller.Offset.X, Math.Clamp(scroller.Offset.Y + offset, 0, scroller.Extent.Height)); e.Handled = true; } } } }
    }
}