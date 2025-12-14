using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions; // Added for Regex
using System.Threading.Tasks;
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
using RelumiScript.ViewModels;
using WebViewCore.Events;

namespace RelumiScript
{
    public partial class MainWindow : Avalonia.Controls.Window
    {
        private AssetBundleService _service;
        private MessageRenderer? _messageRenderer;
        private AppConfig _config = new AppConfig();

        private bool _isEditorReady = false;
        private bool _isTerminalReady = false;
        private bool _isNavigating = false;
        private string _workingDirectory = "";

        // Document Management
        private ObservableCollection<EditorDocument> _documents = new ObservableCollection<EditorDocument>();
        private EditorDocument? _activeDocument;

        // Autosave
        private DispatcherTimer _autoSaveTimer;

        // Trackers
        private List<FileNode> _allFiles = new List<FileNode>();
        private List<FileNode> _loadedMessages = new List<FileNode>();
        private List<string> _currentMessagePages = new List<string>();
        private int _currentPageIndex = 0;

        private List<FlagUsageInfo> _allFlagUsages = new List<FlagUsageInfo>();
        private List<CommandUsageInfo> _allCommandUsages = new List<CommandUsageInfo>();
        private List<FlagUsageInfo> _allWorkUsages = new List<FlagUsageInfo>();
        private List<EventUsageInfo> _allEventUsages = new List<EventUsageInfo>();
        private Dictionary<int, string> _workIdMap = new Dictionary<int, string>();

        private ThemeEditorViewModel _themeVm = new ThemeEditorViewModel();
        public ThemeEditorViewModel ThemeVm => _themeVm;

        private string _currentView = "Explorer";
        private string _currentBottomView = "";
        private GridLength _lastSidebarWidth = new GridLength(300);

        // Terminal
        private TerminalSession? _terminalSession;

        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;
            _service = new AssetBundleService();
            LoadConfig();
            _themeVm.Colors.PropertyChanged += (s, e) => UpdateDynamicResources();
            TabStrip.ItemsSource = _documents;
            UpdateNoTabsPlaceholder();
            InitializeEditor();
            InitializeTerminal();
            TryInitMessageRenderer();
            PanelTheme.DataContext = _themeVm;
            RefreshThemeList();
            SwitchSideView("Explorer");
            SetupAutosave();

            // Cleanup terminal on close
            this.Closing += (s, e) => _terminalSession?.Dispose();
        }

        private void SetupAutosave()
        {
            _autoSaveTimer = new DispatcherTimer();
            _autoSaveTimer.Interval = TimeSpan.FromSeconds(2);
            _autoSaveTimer.Tick += AutoSaveTimer_Tick;
            _autoSaveTimer.Start();
        }

        private async void AutoSaveTimer_Tick(object? sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(_workingDirectory) && _documents.Any(d => d.IsDirty))
            {
                await SaveDirtyFiles(isAutoSave: true);
            }
        }

        public void TitleBar_PointerPressed(object sender, PointerPressedEventArgs e) { if (e.GetCurrentPoint(this).Properties.IsLeftButtonPressed) BeginMoveDrag(e); }
        private void UpdateDynamicResources()
        {
            var colors = _themeVm.Colors;
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
            _themeVm.AvailableThemes.Clear(); var dir = GetThemesFolder(); var files = Directory.GetFiles(dir, "*.json");
            foreach (var f in files) _themeVm.AvailableThemes.Add(Path.GetFileNameWithoutExtension(f));
            if (_themeVm.AvailableThemes.Count == 0) { _themeVm.AvailableThemes.Add("Default"); SaveThemeByName("Default"); }
            if (!string.IsNullOrEmpty(_config.LastLoadedTheme) && _themeVm.AvailableThemes.Contains(_config.LastLoadedTheme)) _themeVm.CurrentThemeName = _config.LastLoadedTheme;
            else if (_themeVm.AvailableThemes.Contains("Default")) _themeVm.CurrentThemeName = "Default";
            else _themeVm.CurrentThemeName = _themeVm.AvailableThemes.First();
            LoadThemeByName(_themeVm.CurrentThemeName);
        }
        private void LoadThemeByName(string name) { if (string.IsNullOrEmpty(name)) return; try { string path = Path.Combine(GetThemesFolder(), name + ".json"); if (File.Exists(path)) { var settings = JsonConvert.DeserializeObject<ThemeSettings>(File.ReadAllText(path)); if (settings != null) InjectTheme(settings); } } catch (Exception ex) { StatusText.Text = $"Error loading theme {name}: {ex.Message}"; } }
        private void SaveThemeByName(string name) { if (string.IsNullOrEmpty(name)) return; try { var settings = _themeVm.ToSettings(); string path = Path.Combine(GetThemesFolder(), name + ".json"); File.WriteAllText(path, JsonConvert.SerializeObject(settings, Formatting.Indented)); StatusText.Text = $"Theme '{name}' saved."; } catch (Exception ex) { StatusText.Text = $"Error saving theme: {ex.Message}"; } }
        public void ThemeComboBox_SelectionChanged(object? sender, SelectionChangedEventArgs e) { if (_themeVm.CurrentThemeName != null) { LoadThemeByName(_themeVm.CurrentThemeName); if (_config.LastLoadedTheme != _themeVm.CurrentThemeName) { _config.LastLoadedTheme = _themeVm.CurrentThemeName; SaveConfig(); } } }
        public async void BtnNewTheme_Click(object? sender, RoutedEventArgs e) { var dialog = new InputNameDialog(); string? result = await dialog.ShowDialog<string?>(this); if (string.IsNullOrWhiteSpace(result)) return; string safeName = string.Join("_", result.Split(Path.GetInvalidFileNameChars())); if (string.IsNullOrWhiteSpace(safeName)) safeName = "New_Theme"; if (_themeVm.AvailableThemes.Contains(safeName)) { StatusText.Text = $"Theme '{safeName}' already exists."; return; } _themeVm.AvailableThemes.Add(safeName); _themeVm.CurrentThemeName = safeName; SaveThemeByName(safeName); }
        public async void SaveTheme_Click(object? sender, RoutedEventArgs e) { if (!string.IsNullOrEmpty(_themeVm.CurrentThemeName)) { SaveThemeByName(_themeVm.CurrentThemeName); await InjectTheme(null); } }
        public void BtnResetTheme_Click(object? sender, RoutedEventArgs e) { if (!string.IsNullOrEmpty(_themeVm.CurrentThemeName)) { LoadThemeByName(_themeVm.CurrentThemeName); StatusText.Text = "Theme changes discarded."; } }
        private async Task InjectTheme(ThemeSettings? directSettings = null) { ThemeSettings settings = directSettings ?? _themeVm.ToSettings(); _themeVm.LoadFromSettings(settings); UpdateDynamicResources(); if (_isEditorReady && Editor != null) { await Editor.ExecuteScriptAsync($"if (window.updateRelumiTheme) window.updateRelumiTheme({JsonConvert.SerializeObject(settings)});"); } }

        private (FileNode? file, int startLine) GetParentFileAndLine(ScriptNode sNode)
        {
            if (ScriptTree.ItemsSource is IEnumerable<FileNode> files)
            {
                var parent = files.FirstOrDefault(f => f.Scripts.Contains(sNode));
                if (parent != null)
                {
                    int line = 1;
                    foreach (var s in parent.Scripts)
                    {
                        if (s == sNode) return (parent, line);
                        line += s.Content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None).Length;
                    }
                }
            }
            return (null, 0);
        }

        private async void OpenDocument(object node, bool isPeek)
        {
            if (node == null) return;
            if (node is ScriptNode sNode)
            {
                var (parent, offset) = GetParentFileAndLine(sNode);
                if (parent != null)
                {
                    OpenDocument(parent, isPeek);
                    if (_isEditorReady)
                    {
                        await Task.Delay(50);
                        await Editor.ExecuteScriptAsync($"editor.revealLineInCenter({offset}); editor.setPosition({{lineNumber: {offset}, column: 1}}); editor.focus();");
                    }
                    return;
                }
            }

            string docId = "", title = "", content = "";
            if (node is FileNode fNode) { docId = "FILE:" + fNode.FileName; title = fNode.Name; content = string.Join(Environment.NewLine, fNode.Scripts.Select(x => x.Content)); }
            else if (node is ScriptNode scriptNode) { docId = "SCRIPT:" + scriptNode.Label; title = scriptNode.Label; content = scriptNode.Content; }
            else return;

            var existing = _documents.FirstOrDefault(d => d.Id == docId);
            if (existing != null) { if (!isPeek && existing.IsPreview) existing.IsPreview = false; SetActiveDocument(existing); return; }
            var newDoc = new EditorDocument { Id = docId, Title = title, Content = content, OriginalContent = content, IsDirty = false, IsPreview = isPeek, SourceNode = node };
            if (isPeek) { var currentPreview = _documents.FirstOrDefault(d => d.IsPreview); if (currentPreview != null) { if (currentPreview.IsDirty) { currentPreview.IsPreview = false; _documents.Add(newDoc); } else { int index = _documents.IndexOf(currentPreview); _documents[index] = newDoc; } } else _documents.Add(newDoc); } else _documents.Add(newDoc);
            SetActiveDocument(newDoc);
        }

        private async void SetActiveDocument(EditorDocument doc) { if (_activeDocument == doc) return; _activeDocument = doc; TabStrip.SelectedItem = doc; await SetEditorText(doc.Content); UpdateNoTabsPlaceholder(); }
        public void BtnCloseTab_Click(object? sender, RoutedEventArgs e) { if (sender is Button btn && btn.Tag is EditorDocument doc) CloseDocument(doc); }
        private async void CloseDocument(EditorDocument doc) { if (doc.IsDirty) { var dialog = new DiscardChangesDialog(doc.Title.TrimEnd('*')); var result = await dialog.ShowDialog<bool>(this); if (result) ForceCloseDocument(doc); } else ForceCloseDocument(doc); }
        private void ForceCloseDocument(EditorDocument doc) { int index = _documents.IndexOf(doc); _documents.Remove(doc); if (_documents.Count == 0) { _activeDocument = null; SetEditorText(""); } else if (_activeDocument == doc) { int newIndex = Math.Max(0, index - 1); if (newIndex < _documents.Count) SetActiveDocument(_documents[newIndex]); } UpdateNoTabsPlaceholder(); }
        private void TabStrip_SelectionChanged(object? sender, SelectionChangedEventArgs e) { if (TabStrip.SelectedItem is EditorDocument doc) SetActiveDocument(doc); }
        private void UpdateNoTabsPlaceholder() { if (NoTabsPlaceholder != null) NoTabsPlaceholder.IsVisible = _documents.Count == 0; if (Editor != null) Editor.IsVisible = _documents.Count > 0; }

        private void InitializeEditor()
        {
            string monacoPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "index.html");
            if (File.Exists(monacoPath)) { Editor.Url = new Uri($"file:///{monacoPath.Replace("\\", "/")}"); Editor.WebMessageReceived += OnEditorMessageReceived; Editor.NavigationCompleted += async (s, e) => { if (e.IsSuccess) { _isEditorReady = true; await GenerateAndInjectSyntax(); await InjectMonacoListeners(); await InjectTheme(); } }; }
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
            ";

            script += @"
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
            ";

            script += @" editor.onDidChangeModelContent((e) => { if(!e.isFlush) window.chrome.webview.postMessage('CONTENT_UPDATE:' + editor.getValue()); });";
            script += @" editor.addAction({ id: 'relumi-save', label: 'Save', keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S], run: function(ed) { window.chrome.webview.postMessage('SAVE_REQUEST'); } });";
            script += @" editor.addAction({ id: 'relumi-edit-def', label: 'Edit Definition', contextMenuGroupId: 'navigation', contextMenuOrder: 1.0, run: function(ed) { var p = ed.getPosition(); var m = ed.getModel(); var w = m.getWordAtPosition(p); if(w) { var charBefore = w.startColumn > 1 ? m.getLineContent(p.lineNumber).charAt(w.startColumn - 2) : ''; var prefix = (charBefore === '#' || charBefore === '$' || charBefore === '@') ? charBefore : ''; var token = prefix + w.word; if (prefix === '#') { window.chrome.webview.postMessage('EDIT_DEFINITION:FLG:' + w.word); } else if (prefix === '$') { window.chrome.webview.postMessage('EDIT_DEFINITION:SYS:' + w.word); } else if (prefix === '@') { window.chrome.webview.postMessage('EDIT_DEFINITION:WRK:' + w.word); } else if(token.startsWith('Cmd_') || token.startsWith('_') || /^[A-Z0-9_]+$/.test(token)) { window.chrome.webview.postMessage('EDIT_DEFINITION:CMD:' + w.word); } } } });";
            await Editor.ExecuteScriptAsync(script);
        }

        private async void OnEditorMessageReceived(object? sender, WebViewMessageReceivedEventArgs e)
        {
            if (e.Message == "HIDE_PREVIEW") return;
            if (e.Message == "SAVE_REQUEST") { await SaveDirtyFiles(false); return; }
            if (e.Message.StartsWith("PREVIEW:")) { var p = e.Message.Substring(8).Split('%'); if (p.Length == 2) ShowMessagePreview(p[0].Trim(), p[1].Trim()); return; }
            if (e.Message.StartsWith("GLOBAL_SEARCH:")) { SwitchSideView("Search", forceOpen: true); SearchBox.Text = e.Message.Substring(e.Message.IndexOf(':') + 1).Trim(); return; }
            if (e.Message.StartsWith("CONTENT_UPDATE:")) { string newContent = e.Message.Substring(15); if (_activeDocument != null) { if (_activeDocument.IsPreview) _activeDocument.IsPreview = false; _activeDocument.Content = newContent; _activeDocument.IsDirty = !string.Equals(_activeDocument.Content, _activeDocument.OriginalContent); } return; }
            if (e.Message.StartsWith("EDIT_DEFINITION:"))
            {
                var parts = e.Message.Split(':');
                if (parts.Length < 3) return;
                await HandleEditDefinition(parts[1], parts[2]);
            }
        }

        private async Task HandleEditDefinition(string type, string name)
        {
            LoadWorkIdMap();
            int foundId = -1;
            string description = "";
            List<CommandArg> parameters = new List<CommandArg>();

            if (type == "FLG") { var kvp = _service.FlagMap.FirstOrDefault(x => x.Value == name); if (kvp.Value != null) foundId = kvp.Key; }
            else if (type == "SYS") { var kvp = _service.SysFlagMap.FirstOrDefault(x => x.Value == name); if (kvp.Value != null) foundId = kvp.Key; }
            else if (type == "WRK") { var kvp = _workIdMap.FirstOrDefault(x => x.Value == name); if (kvp.Value != null) foundId = kvp.Key; }
            else if (type == "CMD")
            {
                var cmd = _service.Commands.FirstOrDefault(c => c.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
                if (cmd != null)
                {
                    foundId = cmd.Id;
                    description = cmd.Description;
                    parameters = cmd.Args.ToList();
                }
            }

            if (foundId == -1) { StatusText.Text = $"Could not find definition for {name} ({type})."; return; }

            var dialog = new EditDataDialog(type, foundId, name, description, parameters, _service, _workIdMap, _themeVm);
            var result = await dialog.ShowDialog<bool>(this);

            if (result)
            {
                StatusText.Text = $"Updated definition for {name}. Re-scanning...";
                await GenerateAndInjectSyntax();
                RefreshAllTrackers();
            }
        }

        private async Task SetEditorText(string content) { string safe = JsonConvert.ToString(content); if (_isEditorReady) await Editor.ExecuteScriptAsync($"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe}); editor.updateOptions({{readOnly: false}});"); }
        public void ScriptTree_SelectionChanged(object? sender, SelectionChangedEventArgs e) { if (_isNavigating) return; if (ScriptTree.SelectedItem is ScriptNode s) OpenDocument(s, isPeek: true); else if (ScriptTree.SelectedItem is FileNode f) OpenDocument(f, isPeek: true); }
        public void OnExplorerItem_DoubleTapped(object? sender, TappedEventArgs e) { var node = (sender as Control)?.DataContext; if (node != null) OpenDocument(node, isPeek: false); }
        public void OnSidebarNav_Click(object? sender, RoutedEventArgs e) { if (sender is Button btn && btn.Tag is string tag) SwitchSideView(tag); }
        private void SwitchSideView(string viewName, bool forceOpen = false)
        {
            if (!forceOpen && viewName == _currentView && SidePanelContainer.IsVisible) { _lastSidebarWidth = SidebarGrid.ColumnDefinitions[1].Width; SidebarGrid.ColumnDefinitions[1].Width = new GridLength(0); SidebarGrid.ColumnDefinitions[2].Width = new GridLength(0); SidePanelContainer.IsVisible = false; SetButtonActive(null); return; }
            if (!SidePanelContainer.IsVisible) { SidebarGrid.ColumnDefinitions[1].Width = _lastSidebarWidth; SidebarGrid.ColumnDefinitions[2].Width = new GridLength(4); }
            SidePanelContainer.IsVisible = true;
            _currentView = viewName;
            PanelFile.IsVisible = viewName == "File"; PanelExplorer.IsVisible = viewName == "Explorer"; PanelSearch.IsVisible = viewName == "Search"; PanelFlags.IsVisible = viewName == "Flags"; PanelCommands.IsVisible = viewName == "Commands"; PanelTheme.IsVisible = viewName == "Theme";
            SetButtonActive(viewName);
            if (viewName == "Search") Dispatcher.UIThread.Post(() => { SearchBox.Focus(); if (!string.IsNullOrWhiteSpace(SearchBox.Text)) PerformSearch(SearchBox.Text); });
            else if (viewName == "Flags") { if (_allFlagUsages.Count == 0) RefreshAllTrackers(); }
            else if (viewName == "Commands") { if (_allWorkUsages.Count == 0) RefreshAllTrackers(); }
            else if (viewName == "Explorer") Dispatcher.UIThread.Post(() => ExplorerSearchBox.Focus());
        }
        private void SetButtonActive(string? activeTag) { UpdateBtnStyle(BtnNavFile, activeTag); UpdateBtnStyle(BtnNavExplorer, activeTag); UpdateBtnStyle(BtnNavSearch, activeTag); UpdateBtnStyle(BtnNavFlags, activeTag); UpdateBtnStyle(BtnNavCommands, activeTag); UpdateBtnStyle(BtnNavTheme, activeTag); }
        private void UpdateBtnStyle(Button btn, string? activeTag) { if (btn.Tag?.ToString() == activeTag) { if (!btn.Classes.Contains("Active")) btn.Classes.Add("Active"); } else btn.Classes.Remove("Active"); }

        public void OnPlaceholder_PointerPressed(object? sender, PointerPressedEventArgs e) { BtnLoad_Click(sender, e); }

        public async void OnWindowKeyDown(object? sender, KeyEventArgs e)
        {
            if (e.KeyModifiers == KeyModifiers.Control && e.Key == Key.S)
            {
                e.Handled = true;
                await SaveDirtyFiles(false);
            }
        }

        public async void BtnLoad_Click(object? sender, RoutedEventArgs e)
        {
            var top = TopLevel.GetTopLevel(this); var folders = await top!.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions { AllowMultiple = false, Title = "Select Project Root Folder" }); if (folders.Count == 0) return; var root = folders[0].Path.LocalPath; _workingDirectory = root; StatusText.Text = "Scanning...";
            try
            {
                string? jsonDir = FindJsonFolder(); if (_service.InitSummary.Contains("Cmds: 0") && !string.IsNullOrEmpty(jsonDir)) _service.Initialize(jsonDir); StatusText.Text = "Loading Game Data..."; await Task.Run(() => _service.LoadGameData(root)); StatusText.Text = "Loading Scripts...";
                var scripts = await Task.Run(() => _service.LoadAndDecompile(root));
                _allFiles = scripts;
                StatusText.Text = "Loading Messages..."; _loadedMessages = await Task.Run(() => _service.LoadMessageFiles(root)); await GenerateAndInjectSyntax(); ScriptTree.ItemsSource = scripts.OrderBy(x => x.Name).ToList(); StatusText.Text = $"Loaded {scripts.Count} scripts."; RefreshAllTrackers(); SwitchSideView("Explorer");
                // Auto-nav terminal
                if (_terminalSession != null && _terminalSession.IsRunning)
                {
                    _terminalSession.SendCommand($"Set-Location -Path \"{_workingDirectory}\"; Write-Host 'Terminal set to project root.' -ForegroundColor Cyan");
                }
            }
            catch (Exception ex) { StatusText.Text = $"Load Error: {ex.Message}"; Debug.WriteLine(ex); }
        }

        public async void BtnSave_Click(object? sender, RoutedEventArgs e)
        {
            await SaveDirtyFiles(false);
        }

        private async Task SaveDirtyFiles(bool isAutoSave)
        {
            string saveDir;
            if (!string.IsNullOrEmpty(_workingDirectory))
            {
                saveDir = Path.Combine(_workingDirectory, "scripts");
                if (!Directory.Exists(saveDir)) { try { Directory.CreateDirectory(saveDir); } catch { } }
            }
            else
            {
                if (isAutoSave) return;
                var top = TopLevel.GetTopLevel(this);
                var folders = await top!.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions { AllowMultiple = false, Title = "Select Save Destination (Debug)" });
                if (folders.Count == 0) return;
                saveDir = folders[0].Path.LocalPath;
            }

            try
            {
                int savedCount = 0;
                var dirtyDocs = _documents.Where(d => d.IsDirty).ToList();
                if (isAutoSave && dirtyDocs.Count == 0) return;

                var allFiles = ScriptTree.ItemsSource as IEnumerable<FileNode>;
                var affectedFiles = new HashSet<FileNode>();
                foreach (var doc in dirtyDocs)
                {
                    if (doc.SourceNode is FileNode fn) affectedFiles.Add(fn);
                    else if (doc.SourceNode is ScriptNode sn && allFiles != null)
                    {
                        var parent = allFiles.FirstOrDefault(f => f.Scripts.Contains(sn));
                        if (parent != null) affectedFiles.Add(parent);
                    }
                }

                foreach (var file in affectedFiles)
                {
                    string content;
                    var fileDoc = dirtyDocs.FirstOrDefault(d => d.SourceNode == file);
                    if (fileDoc != null)
                    {
                        content = fileDoc.Content;
                    }
                    else
                    {
                        var scriptDocs = dirtyDocs.Where(d => d.SourceNode is ScriptNode sn && file.Scripts.Contains(sn)).ToDictionary(d => (ScriptNode)d.SourceNode!, d => d.Content);
                        content = string.Join(Environment.NewLine, file.Scripts.Select(s => scriptDocs.ContainsKey(s) ? scriptDocs[s] : s.Content));
                    }
                    string fileName = file.FileName;
                    if (!fileName.EndsWith(".ev", StringComparison.OrdinalIgnoreCase)) fileName += ".ev";
                    await File.WriteAllTextAsync(Path.Combine(saveDir, Path.GetFileName(fileName)), content);
                    savedCount++;

                    // --- NEW FIX: Re-parse content to update in-memory ScriptNodes ---
                    var newScripts = ParseScriptsFromContent(content);

                    // 1. Update the 'file' reference (which may be a transient node from FilterExplorer)
                    file.Scripts = new List<ScriptNode>(newScripts);

                    // 2. Update the master record in _allFiles so future filters/views use the new data
                    var masterNode = _allFiles.FirstOrDefault(f => f.FileName == file.FileName);
                    if (masterNode != null && masterNode != file)
                    {
                        masterNode.Scripts = new List<ScriptNode>(newScripts);
                    }
                }

                foreach (var doc in dirtyDocs)
                {
                    doc.OriginalContent = doc.Content;
                    doc.IsDirty = false;
                }

                if (!isAutoSave && savedCount > 0)
                {
                    StatusText.Text = $"Saved {savedCount} files to {saveDir}";
                    // Refresh Explorer to reflect changes (e.g. if user renamed a label)
                    Dispatcher.UIThread.Post(() => FilterExplorer(ExplorerSearchBox.Text));
                }
            }
            catch (Exception ex)
            {
                StatusText.Text = $"Save Error: {ex.Message}";
            }
        }

        // Helper to re-parse the full file content back into ScriptNodes
        private List<ScriptNode> ParseScriptsFromContent(string content)
        {
            var list = new List<ScriptNode>();
            var lines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            ScriptNode? currentScript = null;
            StringBuilder currentContent = new StringBuilder();
            var labelRegex = new Regex(@"^(?:\\s*)?([a-zA-Z0-9_]+):$");

            foreach (var line in lines)
            {
                var match = labelRegex.Match(line.Trim());
                if (match.Success)
                {
                    if (currentScript != null)
                    {
                        currentScript.Content = currentContent.ToString();
                        list.Add(currentScript);
                    }
                    currentScript = new ScriptNode { Label = match.Groups[1].Value };
                    currentContent.Clear();
                    currentContent.AppendLine(line);
                }
                else
                {
                    if (currentScript == null && !string.IsNullOrWhiteSpace(line))
                        currentScript = new ScriptNode { Label = "Header" };

                    if (currentScript != null)
                        currentContent.AppendLine(line);
                }
            }
            if (currentScript != null)
            {
                currentScript.Content = currentContent.ToString();
                list.Add(currentScript);
            }
            return list;
        }

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
                            targetLine = offset + loc.LineNumber - 1;
                        }
                    }

                    if (targetNode != null) OpenDocument(targetNode, isPeek: true);

                    if (_isEditorReady)
                    {
                        await Task.Delay(100);
                        await Editor.ExecuteScriptAsync($"editor.revealLineInCenter({targetLine}); editor.setPosition({{lineNumber: {targetLine}, column: 1}}); editor.focus();");
                    }
                }
                finally
                {
                    _isNavigating = false;
                }
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

            if (viewName == "Terminal")
            {
                if (_terminalSession == null)
                {
                    _terminalSession = new TerminalSession();
                    _terminalSession.OutputReceived += OnTerminalOutput;
                    _terminalSession.Start(_workingDirectory);
                }
                // Initial focus attempt
                TerminalWebView.Focus();
            }
        }

        private void InitializeTerminal()
        {
            // Robust Xterm.js HTML template with Bridge verification
            string html = @"
<!DOCTYPE html>
<html>
<head>
    <link rel=""stylesheet"" href=""https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css"" />
    <script src=""https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js""></script>
    <script src=""https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js""></script>
    <style>
        body { margin: 0; padding: 0; background-color: #0C0C0C; overflow: hidden; }
        #terminal { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id=""terminal""></div>
    <script>
        var term = new Terminal({
            cursorBlink: true,
            theme: { background: '#0C0C0C', foreground: '#CCCCCC' },
            fontFamily: 'Consolas, monospace',
            fontSize: 14,
            convertEol: true, // Handle \n vs \r\n
            rendererType: 'dom'
        });
        var fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        term.open(document.getElementById('terminal'));
        fitAddon.fit();

        window.onresize = function() { fitAddon.fit(); };
        
        // Ensure focus is captured
        window.addEventListener('click', function() { term.focus(); });
        term.focus();

        // Check for Bridge
        if (!window.chrome || !window.chrome.webview) {
            term.write('\x1b[31mError: WebView Bridge not found. \r\nThis usually happens with Data URIs.\r\nAttempting local echo only.\x1b[0m\r\n');
        } else {
            // Signal ready
            window.chrome.webview.postMessage('TERM_READY');
        }

        // Buffer for Line-Mode Input
        var currentLine = """";
        
        term.onData(e => {
            // Local Echo immediately so user sees typing
            // This is 'Cooked Mode' simulation
            
            // Loop through characters to support paste
            for (let i = 0; i < e.length; i++) {
                let char = e[i];

                if (char === '\r') { // Enter
                    term.write('\r\n');
                    if (window.chrome && window.chrome.webview) {
                        window.chrome.webview.postMessage('TERM_INPUT:' + currentLine);
                    }
                    currentLine = """";
                } else if (char === '\u007F') { // Backspace
                    if (currentLine.length > 0) {
                        term.write('\b \b');
                        currentLine = currentLine.substring(0, currentLine.length - 1);
                    }
                } else if (char === '\u0003') { // Ctrl+C
                     term.write('^C\r\n');
                     currentLine = """";
                     // Ideally send signal to backend here
                } else {
                    // Printable characters
                    if (char.charCodeAt(0) >= 32) {
                        currentLine += char;
                        term.write(char);
                    }
                }
            }
        });

        // Function called from C# to write output
        window.writeOutput = function(data) {
            term.write(data);
        };
    </script>
</body>
</html>";

            // Fix: Save to temporary file to allow bridge access (avoids Data URI sandbox)
            try
            {
                string tempPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "terminal.html");
                File.WriteAllText(tempPath, html);
                TerminalWebView.Url = new Uri($"file:///{tempPath.Replace("\\", "/")}");
            }
            catch (Exception ex)
            {
                // Fallback if file write fails (shouldn't happen in app dir usually)
                Debug.WriteLine("Terminal Init Error: " + ex.Message);
            }

            TerminalWebView.WebMessageReceived += OnTerminalMessageReceived;
            TerminalWebView.NavigationCompleted += (s, e) => {
                if (e.IsSuccess)
                {
                    _isTerminalReady = true;
                    TerminalWebView.Focus();
                }
            };
        }

        private void OnTerminalMessageReceived(object? sender, WebViewMessageReceivedEventArgs e)
        {
            if (e.Message == "TERM_READY")
            {
                _isTerminalReady = true;
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
            Dispatcher.UIThread.Post(() =>
            {
                if (_isTerminalReady)
                {
                    string safe = JsonConvert.ToString(text);
                    TerminalWebView.ExecuteScriptAsync($"window.writeOutput({safe});");
                }
            });
        }

        private void SetBottomButtonActive(string? activeTag) { UpdateBtnStyle(BtnNavTerminal, activeTag); UpdateBtnStyle(BtnNavPreview, activeTag); }
        private async void RefreshAllTrackers()
        {
            StatusText.Text = "Scanner: Indexing..."; try { List<object> nodesToScan = new List<object>(); if (ScriptTree.ItemsSource is System.Collections.IEnumerable items) { foreach (var item in items) nodesToScan.Add(item); } LoadWorkIdMap(); var result = await ScriptScanner.ScanAllAsync(nodesToScan, _service.FlagMap, _service.SysFlagMap, _workIdMap); _allFlagUsages = result.Flags; _allWorkUsages = result.Works; _allCommandUsages = result.Commands; _allEventUsages = result.Events; FilterFlags(FlagSearchBox.Text ?? ""); FilterWorks(ScriptSearchBox.Text ?? ""); StatusText.Text = $"Scanner: Indexed {result.Flags.Count} flags, {result.Works.Count} works."; } catch (Exception ex) { StatusText.Text = $"Scanner Error: {ex.Message}"; }
        }
        public void RefreshFlags_Click(object? sender, RoutedEventArgs e) => RefreshAllTrackers();
        public void RefreshScripts_Click(object? sender, RoutedEventArgs e) => RefreshAllTrackers();
        private void LoadWorkIdMap() { _workIdMap.Clear(); string? jsonDir = FindJsonFolder(); if (string.IsNullOrEmpty(jsonDir)) return; try { string workPath = Path.Combine(jsonDir, "work.json"); if (File.Exists(workPath)) { var jArray = JArray.Parse(File.ReadAllText(workPath)); foreach (var item in jArray) { int id = item["Id"]?.Value<int>() ?? 0; string name = item["Name"]?.Value<string>() ?? ""; if (!_workIdMap.ContainsKey(id)) _workIdMap.Add(id, name); } } } catch { } }
        public void SearchBox_TextChanged(object? sender, TextChangedEventArgs e) => PerformSearch(SearchBox.Text);
        public void FlagSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterFlags(FlagSearchBox.Text ?? "");
        public void ScriptSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterWorks(ScriptSearchBox.Text ?? "");

        public void ExplorerSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterExplorer(ExplorerSearchBox.Text);

        private void FilterExplorer(string? query)
        {
            if (_allFiles == null || _allFiles.Count == 0) return;
            if (string.IsNullOrWhiteSpace(query))
            {
                ScriptTree.ItemsSource = _allFiles.OrderBy(x => x.Name).ToList();
                return;
            }

            query = query.Trim();
            var filtered = new List<FileNode>();

            foreach (var file in _allFiles)
            {
                bool nameMatch = file.Name.Contains(query, StringComparison.OrdinalIgnoreCase);
                var matchingScripts = file.Scripts.Where(s => s.Label.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();

                if (nameMatch || matchingScripts.Count > 0)
                {
                    // Create transient node for view
                    var newNode = new FileNode
                    {
                        Name = file.Name,
                        FileName = file.FileName,
                        // FIX: Set IsMessage instead of assigning to read-only Icon. Icon will update automatically.
                        IsMessage = file.IsMessage
                    };

                    if (nameMatch)
                    {
                        // Match file name -> show all
                        // FIX: Use List instead of ObservableCollection to match FileNode.Scripts type
                        newNode.Scripts = new List<ScriptNode>(file.Scripts);
                    }
                    else
                    {
                        // Match only specific scripts
                        // FIX: matchingScripts is already a List<ScriptNode>, so direct assignment works
                        newNode.Scripts = matchingScripts;
                    }
                    filtered.Add(newNode);
                }
            }
            ScriptTree.ItemsSource = filtered.OrderBy(x => x.Name).ToList();
        }

        private void FilterFlags(string query) { var unused = _allFlagUsages.Where(x => x.Locations.Count == 0 && !x.FlagName.StartsWith("$")); if (string.IsNullOrWhiteSpace(query)) { FlagList.ItemsSource = unused.ToList(); return; } FlagList.ItemsSource = unused.Where(f => f.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList(); }
        private void FilterWorks(string query) { var unused = _allWorkUsages.Where(x => x.Locations.Count == 0); if (string.IsNullOrWhiteSpace(query)) { ScriptList.ItemsSource = unused.ToList(); return; } ScriptList.ItemsSource = unused.Where(c => c.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList(); }
        private void PerformSearch(string? query)
        {
            if (string.IsNullOrWhiteSpace(query)) { SearchResultsList.ItemsSource = null; return; }
            var results = new List<SearchResult>(); query = query.Trim(); bool isIdSearch = int.TryParse(query, out int searchId);
            if (isIdSearch && _service.PokemonMap.TryGetValue(searchId, out string? pName)) results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = searchId, Name = pName });
            var pkmMatches = _service.PokemonMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId);
            var pkmExact = pkmMatches.Where(k => k.Value.Equals(query, StringComparison.OrdinalIgnoreCase)).ToList();
            foreach (var kvp in (pkmExact.Any() ? pkmExact : pkmMatches.Take(20))) results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = kvp.Key, Name = kvp.Value });
            if (isIdSearch && _service.ItemMap.TryGetValue(searchId, out string? iName)) results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = searchId, Name = iName });
            var itmMatches = _service.ItemMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId);
            var itmExact = itmMatches.Where(k => k.Value.Equals(query, StringComparison.OrdinalIgnoreCase)).ToList();
            foreach (var kvp in (itmExact.Any() ? itmExact : itmMatches.Take(20))) results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = kvp.Key, Name = kvp.Value });

            // Works by ID
            if (isIdSearch && _workIdMap.TryGetValue(searchId, out string? wName))
            {
                var usage = _allWorkUsages.FirstOrDefault(u => u.FlagName.Equals("@" + wName, StringComparison.OrdinalIgnoreCase));
                results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Id = searchId, Name = wName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() });
            }

            var wrkMatches = _allWorkUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase));
            var wrkExact = wrkMatches.Where(x => x.FlagName.Equals(query, StringComparison.OrdinalIgnoreCase) || x.FlagName.Equals("@" + query, StringComparison.OrdinalIgnoreCase)).ToList();
            foreach (var w in (wrkExact.Any() ? wrkExact : wrkMatches.Take(20))) results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Name = w.FlagName, Locations = new ObservableCollection<FlagLocation>(w.Locations) });

            // Flags by ID (Regular)
            if (isIdSearch && _service.FlagMap.TryGetValue(searchId, out string? fName))
            {
                var usage = _allFlagUsages.FirstOrDefault(u => u.FlagName.Equals("#" + fName, StringComparison.OrdinalIgnoreCase));
                results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Id = searchId, Name = fName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() });
            }

            // Flags by ID (System)
            if (isIdSearch && _service.SysFlagMap.TryGetValue(searchId, out string? sName))
            {
                var usage = _allFlagUsages.FirstOrDefault(u => u.FlagName.Equals("$" + sName, StringComparison.OrdinalIgnoreCase));
                results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Id = searchId, Name = sName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() });
            }

            var flgMatches = _allFlagUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase));
            var flgExact = flgMatches.Where(x => x.FlagName.Equals(query, StringComparison.OrdinalIgnoreCase) || x.FlagName.Equals("#" + query, StringComparison.OrdinalIgnoreCase) || x.FlagName.Equals("$" + query, StringComparison.OrdinalIgnoreCase)).ToList();
            foreach (var f in (flgExact.Any() ? flgExact : flgMatches.Take(20))) results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Name = f.FlagName, Locations = new ObservableCollection<FlagLocation>(f.Locations) });
            var cmdMatches = _allCommandUsages.Where(x => x.CommandName.Contains(query, StringComparison.OrdinalIgnoreCase));
            var cmdExact = cmdMatches.Where(x => x.CommandName.Equals(query, StringComparison.OrdinalIgnoreCase)).ToList();
            foreach (var c in (cmdExact.Any() ? cmdExact : cmdMatches.Take(20))) results.Add(new SearchResult { Type = "CMD", Color = "#BD93F9", Name = c.CommandName, Locations = new ObservableCollection<FlagLocation>(c.Locations) });
            var evtMatches = _allEventUsages.Where(x => x.EventName.Contains(query, StringComparison.OrdinalIgnoreCase));
            var evtExact = evtMatches.Where(x => x.EventName.Equals(query, StringComparison.OrdinalIgnoreCase)).ToList();
            foreach (var e in (evtExact.Any() ? evtExact : evtMatches.Take(20))) { var sortedLocs = new ObservableCollection<FlagLocation>(e.Locations.OrderByDescending(l => l.IsDeclaration).ThenBy(l => l.FileName)); results.Add(new SearchResult { Type = "EVT", Color = "#FF79C6", Name = e.EventName, Locations = sortedLocs }); }
            SearchResultsList.ItemsSource = results;
            if (results.Count == 1) results[0].IsExpanded = true;
        }
        private void BtnPrevPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex > 0) { _currentPageIndex--; RenderCurrentPage(); } }
        private void BtnNextPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex < _currentMessagePages.Count - 1) { _currentPageIndex++; RenderCurrentPage(); } }
        private void ShowMessagePreview(string file, string label) { TryInitMessageRenderer(); if (_messageRenderer == null) return; var target = _loadedMessages.FirstOrDefault(f => f.Name.Equals(file, StringComparison.OrdinalIgnoreCase))?.Scripts.FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase)); if (target != null) { _currentMessagePages = _messageRenderer.SplitIntoPages(target.Content); _currentPageIndex = 0; RenderCurrentPage(); } }
        private void RenderCurrentPage() { if (_messageRenderer == null || _currentMessagePages.Count == 0) return; _currentPageIndex = Math.Clamp(_currentPageIndex, 0, _currentMessagePages.Count - 1); MessagePreviewContent.Content = _messageRenderer.RenderPage(_currentMessagePages[_currentPageIndex], _currentPageIndex + 1, _currentMessagePages.Count); PageIndicator.Text = $"{_currentPageIndex + 1} / {_currentMessagePages.Count}"; BtnPrevPage.IsVisible = BtnNextPage.IsVisible = PageIndicator.IsVisible = _currentMessagePages.Count > 1; }
        private void TryInitMessageRenderer() { if (_messageRenderer == null && !string.IsNullOrEmpty(FindJsonFolder())) _messageRenderer = new MessageRenderer(Path.GetFullPath(Path.Combine(FindJsonFolder()!, "..", "Assets"))); }
        private async Task GenerateAndInjectSyntax() { string? jd = FindJsonFolder(); if (string.IsNullOrEmpty(jd)) return; await Task.Run(() => { string cmds = File.Exists(Path.Combine(jd, "commands.json")) ? File.ReadAllText(Path.Combine(jd, "commands.json")) : "[]"; string js = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: [], sysflags: [], works: [], pokes: {JsonConvert.SerializeObject(_service.PokemonMap)}, items: {JsonConvert.SerializeObject(_service.ItemMap)} }}; window.RELUMI_DATA_LOADED = true;"; File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "syntax_data.js"), js, Encoding.UTF8); }); if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');"); }
        private string? FindJsonFolder() { string b = AppDomain.CurrentDomain.BaseDirectory; if (Directory.Exists(Path.Combine(b, "JSON"))) return Path.Combine(b, "JSON"); if (Directory.Exists(Path.Combine(b, "..", "..", "..", "JSON"))) return Path.GetFullPath(Path.Combine(b, "..", "..", "..", "JSON")); return null; }
        private void LoadConfig() { try { string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.json"); if (File.Exists(path)) { var cfg = JsonConvert.DeserializeObject<AppConfig>(File.ReadAllText(path)); if (cfg != null) _config = cfg; } } catch (Exception ex) { Debug.WriteLine($"Error loading config: {ex.Message}"); } }
        private void SaveConfig() { try { string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.json"); File.WriteAllText(path, JsonConvert.SerializeObject(_config, Formatting.Indented)); } catch (Exception ex) { Debug.WriteLine($"Error saving config: {ex.Message}"); } }
        public void SearchResult_PointerWheelChanged(object? sender, PointerWheelEventArgs e) { if (e.KeyModifiers.HasFlag(KeyModifiers.Alt)) { if (sender is Control control && ToolTip.GetIsOpen(control)) { var tipContent = ToolTip.GetTip(control); if (tipContent is Border border && border.Child is ScrollViewer scroller) { double offset = e.Delta.Y * -30; scroller.Offset = new Vector(scroller.Offset.X, Math.Clamp(scroller.Offset.Y + offset, 0, scroller.Extent.Height)); e.Handled = true; } } } }
    }
}