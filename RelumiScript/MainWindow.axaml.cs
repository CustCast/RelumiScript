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

        // FIX: Re-expose ThemeVm for the Search Tooltip XAML binding (#MainWindowRef.ThemeVm)
        public ThemeEditorViewModel ThemeVm => _viewModel.ThemeVm;

        // UI State
        private bool _isEditorReady = false;
        private bool _isTerminalReady = false;
        private bool _isNavigating = false;
        private TerminalSession? _terminalSession;

        // Autosave Timer
        private DispatcherTimer _autoSaveTimer;

        private string _currentView = "Explorer";
        private string _currentBottomView = "";
        private GridLength _lastSidebarWidth = new GridLength(300);

        // Pagination
        private List<string> _currentMessagePages = new List<string>();
        private int _currentPageIndex = 0;

        public MainWindow()
        {
            // 1. Initialize ViewModel Dependencies FIRST
            var projectService = new ProjectService();
            var dialogService = new DialogService(this);
            _viewModel = new MainViewModel(projectService, dialogService);

            // 2. Load XAML
            InitializeComponent();

            // 3. Set DataContext
            DataContext = _viewModel;

            // 4. Apply Manual Bindings
            TabStrip.ItemsSource = _viewModel.Documents;

            // 5. Initialize Components
            InitializeEditor();
            InitializeTerminal();
            TryInitMessageRenderer();
            SetupAutosave();

            // Theme Binding
            _viewModel.ThemeVm.Colors.PropertyChanged += (s, e) => UpdateDynamicResources();
            PanelTheme.DataContext = _viewModel.ThemeVm;
            RefreshThemeList();
            SwitchSideView("Explorer");
            UpdateNoTabsPlaceholder();

            // EVENTS: Subscribe to ViewModel changes
            _viewModel.PropertyChanged += ViewModel_PropertyChanged;

            this.Closing += (s, e) => _terminalSession?.Dispose();
        }

        // --- AUTOSAVE LOGIC ---
        private void SetupAutosave()
        {
            _autoSaveTimer = new DispatcherTimer();
            _autoSaveTimer.Interval = TimeSpan.FromSeconds(2);
            _autoSaveTimer.Tick += AutoSaveTimer_Tick;
            _autoSaveTimer.Start();
        }

        private async void AutoSaveTimer_Tick(object? sender, EventArgs e)
        {
            await _viewModel.SaveAllCommand();
        }

        private async void ViewModel_PropertyChanged(object? sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(MainViewModel.Explorer)) // Changed from 'Files' to 'Explorer'
            {
                // Handled by binding now
                SwitchSideView("Explorer");

                if (_terminalSession != null && _terminalSession.IsRunning && !string.IsNullOrEmpty(_viewModel.Project.WorkingDirectory))
                {
                    _terminalSession.SendCommand($"Set-Location -Path \"{_viewModel.Project.WorkingDirectory}\"; Write-Host 'Terminal set to project root.' -ForegroundColor Cyan");
                }
            }
            else if (e.PropertyName == nameof(MainViewModel.AnalysisRevision))
            {
                _viewModel.Analysis.RefreshAll();
                _viewModel.Search.Refresh();
            }
            else if (e.PropertyName == nameof(MainViewModel.SyntaxRevision))
            {
                if (_isEditorReady)
                {
                    await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");
                }
            }
            else if (e.PropertyName == nameof(MainViewModel.ActiveDocument))
            {
                if (_viewModel.ActiveDocument != null)
                {
                    TabStrip.SelectedItem = _viewModel.ActiveDocument;
                    await SetEditorText(_viewModel.ActiveDocument.Content);
                }
                else
                {
                    await SetEditorText("");
                }
                UpdateNoTabsPlaceholder();
            }
        }

        // --- Helper: Restore Scrolling Logic ---
        private (FileNode? file, int startLine) GetParentFileAndLine(ScriptNode sNode)
        {
            if (_viewModel.Project.AllFiles == null) return (null, 0);

            var parent = _viewModel.Project.AllFiles.FirstOrDefault(f => f.Scripts.Contains(sNode));
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

        // --- Navigation / Search ---

        public async void ScriptTree_SelectionChanged(object? sender, SelectionChangedEventArgs e)
        {
            if (_isNavigating) return;

            if (ScriptTree.SelectedItem is ScriptNode s)
            {
                _viewModel.OpenDocument(s, isPeek: true);
                var (parent, offset) = GetParentFileAndLine(s);
                if (parent != null) await ScrollToLine(offset);
            }
            else if (ScriptTree.SelectedItem is FileNode f)
            {
                _viewModel.OpenDocument(f, isPeek: true);
            }
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
            if (!forceOpen && viewName == _currentView && SidePanelContainer.IsVisible)
            {
                _lastSidebarWidth = SidebarGrid.ColumnDefinitions[1].Width;
                SidebarGrid.ColumnDefinitions[1].Width = new GridLength(0);
                SidebarGrid.ColumnDefinitions[2].Width = new GridLength(0);
                SidePanelContainer.IsVisible = false;
                SetButtonActive(null);
                return;
            }
            if (!SidePanelContainer.IsVisible) { SidebarGrid.ColumnDefinitions[1].Width = _lastSidebarWidth; SidebarGrid.ColumnDefinitions[2].Width = new GridLength(4); }

            SidePanelContainer.IsVisible = true;
            _currentView = viewName;

            PanelFile.IsVisible = viewName == "File";
            PanelExplorer.IsVisible = viewName == "Explorer";
            PanelSearch.IsVisible = viewName == "Search";
            PanelFlags.IsVisible = viewName == "Flags";
            PanelCommands.IsVisible = viewName == "Commands";
            PanelTheme.IsVisible = viewName == "Theme";

            SetButtonActive(viewName);

            if (viewName == "Search") Dispatcher.UIThread.Post(() => { SearchBox.Focus(); });
            else if (viewName == "Explorer") Dispatcher.UIThread.Post(() => ExplorerSearchBox.Focus());
        }

        private void SetButtonActive(string? activeTag) { UpdateBtnStyle(BtnNavFile, activeTag); UpdateBtnStyle(BtnNavExplorer, activeTag); UpdateBtnStyle(BtnNavSearch, activeTag); UpdateBtnStyle(BtnNavFlags, activeTag); UpdateBtnStyle(BtnNavCommands, activeTag); UpdateBtnStyle(BtnNavTheme, activeTag); }
        private void UpdateBtnStyle(Button btn, string? activeTag) { if (btn.Tag?.ToString() == activeTag) { if (!btn.Classes.Contains("Active")) btn.Classes.Add("Active"); } else btn.Classes.Remove("Active"); }

        // --- Core UI & Editor ---

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
                        window.chrome.webview.postMessage('PREVIEW:' + macroMatch[1] + '%' + macroMatch[2]);
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
            if (e.Message.StartsWith("PREVIEW:")) { var p = e.Message.Substring(8).Split('%'); if (p.Length == 2) ShowMessagePreview(p[0].Trim(), p[1].Trim()); return; }

            // --- UPDATED: Global Search Integration ---
            if (e.Message.StartsWith("GLOBAL_SEARCH:"))
            {
                SwitchSideView("Search", forceOpen: true);
                // Update ViewModel Property directly
                _viewModel.Search.SearchQuery = e.Message.Substring(e.Message.IndexOf(':') + 1).Trim();
                return;
            }

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
        }

        private async Task HandleEditDefinition(string type, string name)
        {
            int foundId = -1;
            string description = "";
            List<CommandArg> parameters = new List<CommandArg>();
            var service = _viewModel.Project.AssetService;
            var workMap = _viewModel.Project.WorkIdMap;

            if (type == "FLG") { var kvp = service.FlagMap.FirstOrDefault(x => x.Value == name); if (kvp.Value != null) foundId = kvp.Key; }
            else if (type == "SYS") { var kvp = service.SysFlagMap.FirstOrDefault(x => x.Value == name); if (kvp.Value != null) foundId = kvp.Key; }
            else if (type == "WRK") { var kvp = workMap.FirstOrDefault(x => x.Value == name); if (kvp.Value != null) foundId = kvp.Key; }
            else if (type == "CMD")
            {
                var cmd = service.Commands.FirstOrDefault(c => c.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
                if (cmd != null) { foundId = cmd.Id; description = cmd.Description; parameters = cmd.Args.ToList(); }
            }

            if (foundId == -1) { _viewModel.StatusMessage = $"Could not find definition for {name} ({type})."; return; }

            var dialog = new EditDataDialog(type, foundId, name, description, parameters, service, workMap, _viewModel.ThemeVm);
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
                        if (parent != null)
                        {
                            targetNode = sNode;
                            // Add offset from start of script file
                            targetLine = offset + loc.LineNumber - 1;
                        }
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
            if (BottomPanelContainer.IsVisible && _currentBottomView == viewName) { BottomPanelContainer.IsVisible = false; SetBottomButtonActive(null); return; }
            BottomPanelContainer.IsVisible = true;
            _currentBottomView = viewName;
            TerminalPanel.IsVisible = viewName == "Terminal";
            PreviewPanel.IsVisible = viewName == "Preview";
            SetBottomButtonActive(viewName);
            if (viewName == "Terminal") { if (_terminalSession == null) { _terminalSession = new TerminalSession(); _terminalSession.OutputReceived += OnTerminalOutput; _terminalSession.Start(_viewModel.Project.WorkingDirectory); } TerminalWebView.Focus(); }
        }
        private void SetBottomButtonActive(string? activeTag) { UpdateBtnStyle(BtnNavTerminal, activeTag); UpdateBtnStyle(BtnNavPreview, activeTag); }

        private void InitializeTerminal()
        {
            string html = @"<!DOCTYPE html><html><head><link rel=""stylesheet"" href=""https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css"" /><script src=""https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js""></script><script src=""https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js""></script><style>body { margin: 0; padding: 0; background-color: #0C0C0C; overflow: hidden; } #terminal { width: 100vw; height: 100vh; }</style></head><body><div id=""terminal""></div><script>var term = new Terminal({ cursorBlink: true, theme: { background: '#0C0C0C', foreground: '#CCCCCC' }, fontFamily: 'Consolas, monospace', fontSize: 14, convertEol: true, rendererType: 'dom' }); var fitAddon = new FitAddon.FitAddon(); term.loadAddon(fitAddon); term.open(document.getElementById('terminal')); fitAddon.fit(); window.onresize = function() { fitAddon.fit(); }; window.addEventListener('click', function() { term.focus(); }); term.focus(); if (!window.chrome || !window.chrome.webview) { term.write('\x1b[31mError: WebView Bridge not found. \r\n\x1b[0m\r\n'); } else { window.chrome.webview.postMessage('TERM_READY'); } var currentLine = """"; term.onData(e => { for (let i = 0; i < e.length; i++) { let char = e[i]; if (char === '\r') { term.write('\r\n'); if (window.chrome && window.chrome.webview) { window.chrome.webview.postMessage('TERM_INPUT:' + currentLine); } currentLine = """"; } else if (char === '\u007F') { if (currentLine.length > 0) { term.write('\b \b'); currentLine = currentLine.substring(0, currentLine.length - 1); } } else if (char === '\u0003') { term.write('^C\r\n'); currentLine = """"; } else { if (char.charCodeAt(0) >= 32) { currentLine += char; term.write(char); } } } }); window.writeOutput = function(data) { term.write(data); };</script></body></html>";
            try { string tempPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "terminal.html"); File.WriteAllText(tempPath, html); TerminalWebView.Url = new Uri($"file:///{tempPath.Replace("\\", "/")}"); } catch (Exception ex) { Debug.WriteLine("Terminal Init Error: " + ex.Message); }
            TerminalWebView.WebMessageReceived += OnTerminalMessageReceived;
            TerminalWebView.NavigationCompleted += (s, e) => { if (e.IsSuccess) { _isTerminalReady = true; TerminalWebView.Focus(); } };
        }
        private void OnTerminalMessageReceived(object? sender, WebViewMessageReceivedEventArgs e) { if (e.Message == "TERM_READY") { _isTerminalReady = true; return; } if (e.Message.StartsWith("TERM_INPUT:")) { string input = e.Message.Substring(11); _terminalSession?.SendCommand(input); } }
        private void OnTerminalOutput(string text) { Dispatcher.UIThread.Post(() => { if (_isTerminalReady) { string safe = JsonConvert.ToString(text); TerminalWebView.ExecuteScriptAsync($"window.writeOutput({safe});"); } }); }

        // --- UPDATED: Delegating Refresh to ViewModel ---
        public void RefreshFlags_Click(object? sender, RoutedEventArgs e)
        {
            // This async call updates the ProjectService, which triggers AnalysisRevision, which updates AnalysisViewModel
            _viewModel.Project.RefreshTrackersAsync(msg => _viewModel.StatusMessage = msg).ContinueWith(t => _viewModel.AnalysisRevision++);
        }
        public void RefreshScripts_Click(object? sender, RoutedEventArgs e)
        {
            _viewModel.Project.RefreshTrackersAsync(msg => _viewModel.StatusMessage = msg).ContinueWith(t => _viewModel.AnalysisRevision++);
        }

        private void BtnPrevPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex > 0) { _currentPageIndex--; RenderCurrentPage(); } }
        private void BtnNextPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex < _currentMessagePages.Count - 1) { _currentPageIndex++; RenderCurrentPage(); } }
        private void ShowMessagePreview(string file, string label)
        {
            TryInitMessageRenderer();
            if (_messageRenderer == null) return;
            var target = _viewModel.Project.LoadedMessages.FirstOrDefault(f => f.Name.Equals(file, StringComparison.OrdinalIgnoreCase))?.Scripts.FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase));
            if (target != null) { _currentMessagePages = _messageRenderer.SplitIntoPages(target.Content); _currentPageIndex = 0; RenderCurrentPage(); }
        }
        private void RenderCurrentPage()
        {
            if (_messageRenderer == null || _currentMessagePages.Count == 0) return;
            _currentPageIndex = Math.Clamp(_currentPageIndex, 0, _currentMessagePages.Count - 1);
            MessagePreviewContent.Content = _messageRenderer.RenderPage(_currentMessagePages[_currentPageIndex], _currentPageIndex + 1, _currentMessagePages.Count);
            PageIndicator.Text = $"{_currentPageIndex + 1} / {_currentMessagePages.Count}";
            bool showPaginationControls = _currentMessagePages.Count > 1;
            BtnPrevPage.IsVisible = showPaginationControls; BtnNextPage.IsVisible = showPaginationControls; PageIndicator.IsVisible = showPaginationControls;
        }
        private void TryInitMessageRenderer() { if (_messageRenderer == null && !string.IsNullOrEmpty(_viewModel.Project.FindJsonFolder())) _messageRenderer = new MessageRenderer(Path.GetFullPath(Path.Combine(_viewModel.Project.FindJsonFolder()!, "..", "Assets"))); }
        public void SearchResult_PointerWheelChanged(object? sender, PointerWheelEventArgs e) { if (e.KeyModifiers.HasFlag(KeyModifiers.Alt)) { if (sender is Control control && ToolTip.GetIsOpen(control)) { var tipContent = ToolTip.GetTip(control); if (tipContent is Border border && border.Child is ScrollViewer scroller) { double offset = e.Delta.Y * -30; scroller.Offset = new Vector(scroller.Offset.X, Math.Clamp(scroller.Offset.Y + offset, 0, scroller.Extent.Height)); e.Handled = true; } } } }
    }
}