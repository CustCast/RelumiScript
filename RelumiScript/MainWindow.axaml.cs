using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
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
        private bool _isNavigating = false;
        private string _workingDirectory = "";

        // Document Management
        private ObservableCollection<EditorDocument> _documents = new ObservableCollection<EditorDocument>();
        private EditorDocument? _activeDocument;

        // Autosave
        private DispatcherTimer _autoSaveTimer;

        // Trackers
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
            TryInitMessageRenderer();
            PanelTheme.DataContext = _themeVm;
            RefreshThemeList();
            SwitchSideView("Explorer");
            SetupAutosave();
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
            // Only autosave if we have a valid working directory and there are dirty files
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

        private async void OpenDocument(object node, bool isPeek) { if (node == null) return; string docId = "", title = "", content = ""; if (node is FileNode fNode) { docId = "FILE:" + fNode.FileName; title = fNode.Name; content = string.Join(Environment.NewLine, fNode.Scripts.Select(x => x.Content)); } else if (node is ScriptNode sNode) { docId = "SCRIPT:" + sNode.Label; title = sNode.Label; content = sNode.Content; } else return; var existing = _documents.FirstOrDefault(d => d.Id == docId); if (existing != null) { if (!isPeek && existing.IsPreview) existing.IsPreview = false; SetActiveDocument(existing); return; } var newDoc = new EditorDocument { Id = docId, Title = title, Content = content, OriginalContent = content, IsDirty = false, IsPreview = isPeek, SourceNode = node }; if (isPeek) { var currentPreview = _documents.FirstOrDefault(d => d.IsPreview); if (currentPreview != null) { if (currentPreview.IsDirty) { currentPreview.IsPreview = false; _documents.Add(newDoc); } else { int index = _documents.IndexOf(currentPreview); _documents[index] = newDoc; } } else _documents.Add(newDoc); } else _documents.Add(newDoc); SetActiveDocument(newDoc); }
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
            string script = @"editor.onDidChangeCursorPosition((e)=>{var l=editor.getModel().getLineContent(e.position.lineNumber);var m=l.match(/(?:_TALKMSG|_TALK_KEYWAIT|_EASY_OBJ_MSG|_EASY_BOARD_MSG)\s*\(\s*[@""']([^%]+)%([^)""']+)[""']?\s*\)/);if(m)window.chrome.webview.postMessage('PREVIEW:'+m[1]+'%'+m[2]);else window.chrome.webview.postMessage('HIDE_PREVIEW');});editor.addAction({id:'relumi-lookup',label:'Search in Global View',contextMenuGroupId:'navigation',contextMenuOrder:1.5,run:function(ed){var p=ed.getPosition();var m=ed.getModel();var w=m.getWordAtPosition(p);if(w){var charBefore=w.startColumn>1?m.getLineContent(p.lineNumber).charAt(w.startColumn-2):'';var prefix=(charBefore==='#'||charBefore==='$'||charBefore==='@')?charBefore:'';window.chrome.webview.postMessage('GLOBAL_SEARCH:'+prefix+w.word);}}});";
            script += @" editor.onDidChangeModelContent((e) => { if(!e.isFlush) window.chrome.webview.postMessage('CONTENT_UPDATE:' + editor.getValue()); });";

            script += @"
editor.addAction({
    id: 'relumi-save',
    label: 'Save',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
    run: function(ed) { window.chrome.webview.postMessage('SAVE_REQUEST'); }
});";

            script += @"
editor.addAction({
    id: 'relumi-edit-def',
    label: 'Edit Definition',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.0,
    run: function(ed) {
        var p = ed.getPosition();
        var m = ed.getModel();
        var w = m.getWordAtPosition(p);
        if(w) {
            var charBefore = w.startColumn > 1 ? m.getLineContent(p.lineNumber).charAt(w.startColumn - 2) : '';
            var prefix = (charBefore === '#' || charBefore === '$' || charBefore === '@') ? charBefore : '';
            var token = prefix + w.word;
            
            if (prefix === '#') { window.chrome.webview.postMessage('EDIT_DEFINITION:FLG:' + w.word); }
            else if (prefix === '$') { window.chrome.webview.postMessage('EDIT_DEFINITION:SYS:' + w.word); }
            else if (prefix === '@') { window.chrome.webview.postMessage('EDIT_DEFINITION:WRK:' + w.word); }
            else if(token.startsWith('Cmd_') || token.startsWith('_') || /^[A-Z0-9_]+$/.test(token)) { window.chrome.webview.postMessage('EDIT_DEFINITION:CMD:' + w.word); }
        }
    }
});";
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
            try { string? jsonDir = FindJsonFolder(); if (_service.InitSummary.Contains("Cmds: 0") && !string.IsNullOrEmpty(jsonDir)) _service.Initialize(jsonDir); StatusText.Text = "Loading Game Data..."; await Task.Run(() => _service.LoadGameData(root)); StatusText.Text = "Loading Scripts..."; var scripts = await Task.Run(() => _service.LoadAndDecompile(root)); StatusText.Text = "Loading Messages..."; _loadedMessages = await Task.Run(() => _service.LoadMessageFiles(root)); await GenerateAndInjectSyntax(); ScriptTree.ItemsSource = scripts.OrderBy(x => x.Name).ToList(); StatusText.Text = $"Loaded {scripts.Count} scripts."; RefreshAllTrackers(); SwitchSideView("Explorer"); } catch (Exception ex) { StatusText.Text = $"Load Error: {ex.Message}"; Debug.WriteLine(ex); }
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
                // If it's autosave and we don't have a folder, just return silently
                if (isAutoSave) return;

                var top = TopLevel.GetTopLevel(this);
                var folders = await top!.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions { AllowMultiple = false, Title = "Select Save Destination (Debug)" });
                if (folders.Count == 0) return;
                saveDir = folders[0].Path.LocalPath;
            }

            try
            {
                int savedCount = 0;
                // Only take dirty documents
                var dirtyDocs = _documents.Where(d => d.IsDirty).ToList();

                // If autosave and nothing dirty, just return
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
                }

                // Update the dirty state for successfully saved documents
                foreach (var doc in dirtyDocs)
                {
                    doc.OriginalContent = doc.Content;
                    doc.IsDirty = false;
                }

                if (!isAutoSave && savedCount > 0)
                    StatusText.Text = $"Saved {savedCount} files to {saveDir}";
            }
            catch (Exception ex)
            {
                StatusText.Text = $"Save Error: {ex.Message}";
            }
        }

        public void CloseApp_Click(object? sender, RoutedEventArgs e) => Close();
        public void ShowTheme_Click(object? sender, RoutedEventArgs e) => SwitchSideView("Theme");
        public async void JumpToLocation_Click(object? sender, RoutedEventArgs e) { if (sender is Control c && c.Tag is FlagLocation loc) { _isNavigating = true; try { if (loc.NodeObject != null) OpenDocument(loc.NodeObject, isPeek: true); if (_isEditorReady) { await Task.Delay(50); await Editor.ExecuteScriptAsync($"editor.revealLineInCenter({loc.LineNumber}); editor.setPosition({{lineNumber: {loc.LineNumber}, column: 1}}); editor.focus();"); } } finally { _isNavigating = false; } } }
        public void OnBottomNav_Click(object? sender, RoutedEventArgs e) { if (sender is Button btn && btn.Tag is string tag) SwitchBottomView(tag); }
        public void BtnTerminal_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Terminal");
        public void BtnTerminalClose_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Terminal");
        public void BtnPreviewClose_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Preview");
        private void SwitchBottomView(string viewName) { if (BottomPanelContainer.IsVisible && _currentBottomView == viewName) { BottomPanelContainer.IsVisible = false; SetBottomButtonActive(null); return; } BottomPanelContainer.IsVisible = true; _currentBottomView = viewName; TerminalPanel.IsVisible = viewName == "Terminal"; PreviewPanel.IsVisible = viewName == "Preview"; SetBottomButtonActive(viewName); if (viewName == "Terminal") TerminalInput.Focus(); }
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
            if (isIdSearch && _workIdMap.TryGetValue(searchId, out string? wName)) { var usage = _allWorkUsages.FirstOrDefault(u => u.FlagName.Equals("@" + wName, StringComparison.OrdinalIgnoreCase)); results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Id = searchId, Name = wName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() }); }
            var wrkMatches = _allWorkUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase));
            var wrkExact = wrkMatches.Where(x => x.FlagName.Equals(query, StringComparison.OrdinalIgnoreCase) || x.FlagName.Equals("@" + query, StringComparison.OrdinalIgnoreCase)).ToList();
            foreach (var w in (wrkExact.Any() ? wrkExact : wrkMatches.Take(20))) results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Name = w.FlagName, Locations = new ObservableCollection<FlagLocation>(w.Locations) });
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
        private async void TerminalInput_KeyDown(object? sender, KeyEventArgs e) { if (e.Key != Key.Enter || string.IsNullOrWhiteSpace(TerminalInput.Text)) return; string cmd = TerminalInput.Text; TerminalOutput.Text += $"> {cmd}\n"; TerminalInput.Text = ""; if (cmd.ToLower() == "cls") { TerminalOutput.Text = ""; return; } await Task.Run(() => { try { var info = new ProcessStartInfo("cmd.exe", $"/c {cmd}") { RedirectStandardOutput = true, RedirectStandardError = true, UseShellExecute = false, CreateNoWindow = true, WorkingDirectory = string.IsNullOrEmpty(_workingDirectory) ? AppDomain.CurrentDomain.BaseDirectory : _workingDirectory }; using var p = Process.Start(info); if (p == null) return; string o = p.StandardOutput.ReadToEnd(); string err = p.StandardError.ReadToEnd(); p.WaitForExit(); Dispatcher.UIThread.Post(() => TerminalOutput.Text += $"{o}{err}\n"); } catch (Exception ex) { Dispatcher.UIThread.Post(() => TerminalOutput.Text += $"Error: {ex.Message}\n"); } }); }
        private void TryInitMessageRenderer() { if (_messageRenderer == null && !string.IsNullOrEmpty(FindJsonFolder())) _messageRenderer = new MessageRenderer(Path.GetFullPath(Path.Combine(FindJsonFolder()!, "..", "Assets"))); }
        private async Task GenerateAndInjectSyntax() { string? jd = FindJsonFolder(); if (string.IsNullOrEmpty(jd)) return; await Task.Run(() => { string cmds = File.Exists(Path.Combine(jd, "commands.json")) ? File.ReadAllText(Path.Combine(jd, "commands.json")) : "[]"; string js = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: [], sysflags: [], works: [], pokes: {JsonConvert.SerializeObject(_service.PokemonMap)}, items: {JsonConvert.SerializeObject(_service.ItemMap)} }}; window.RELUMI_DATA_LOADED = true;"; File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "syntax_data.js"), js, Encoding.UTF8); }); if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');"); }
        private string? FindJsonFolder() { string b = AppDomain.CurrentDomain.BaseDirectory; if (Directory.Exists(Path.Combine(b, "JSON"))) return Path.Combine(b, "JSON"); if (Directory.Exists(Path.Combine(b, "..", "..", "..", "JSON"))) return Path.GetFullPath(Path.Combine(b, "..", "..", "..", "JSON")); return null; }
        private void LoadConfig() { try { string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.json"); if (File.Exists(path)) { var cfg = JsonConvert.DeserializeObject<AppConfig>(File.ReadAllText(path)); if (cfg != null) _config = cfg; } } catch (Exception ex) { Debug.WriteLine($"Error loading config: {ex.Message}"); } }
        private void SaveConfig() { try { string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config.json"); File.WriteAllText(path, JsonConvert.SerializeObject(_config, Formatting.Indented)); } catch (Exception ex) { Debug.WriteLine($"Error saving config: {ex.Message}"); } }
        public void SearchResult_PointerWheelChanged(object? sender, PointerWheelEventArgs e) { if (e.KeyModifiers.HasFlag(KeyModifiers.Alt)) { if (sender is Control control && ToolTip.GetIsOpen(control)) { var tipContent = ToolTip.GetTip(control); if (tipContent is Border border && border.Child is ScrollViewer scroller) { double offset = e.Delta.Y * -30; scroller.Offset = new Vector(scroller.Offset.X, Math.Clamp(scroller.Offset.Y + offset, 0, scroller.Extent.Height)); e.Handled = true; } } } }
    }
}