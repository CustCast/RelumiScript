using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Platform.Storage;
using Avalonia.Threading;
using AvaloniaWebView;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebViewCore.Events;
using Avalonia.Media;
using System.Collections.ObjectModel;
using Avalonia.Input;
using System.Diagnostics;
using RelumiScript.Models;
using RelumiScript.ViewModels;
using RelumiScript.Services;

namespace RelumiScript
{
    public partial class MainWindow : Avalonia.Controls.Window
    {
        private AssetBundleService _service;
        private MessageRenderer? _messageRenderer;

        private bool _isEditorReady = false;
        private bool _isNavigating = false;

        private string _currentScriptContent = "";
        private List<FileNode> _loadedMessages = new List<FileNode>();
        private string _workingDirectory = "";

        private List<string> _currentMessagePages = new List<string>();
        private int _currentPageIndex = 0;

        private List<FlagUsageInfo> _allFlagUsages = new List<FlagUsageInfo>();
        private List<CommandUsageInfo> _allCommandUsages = new List<CommandUsageInfo>();
        private List<FlagUsageInfo> _allWorkUsages = new List<FlagUsageInfo>();
        private List<EventUsageInfo> _allEventUsages = new List<EventUsageInfo>();
        private Dictionary<int, string> _workIdMap = new Dictionary<int, string>();

        private ThemeEditorViewModel _themeVm = new ThemeEditorViewModel();

        private string _currentView = "Explorer";
        private string _currentBottomView = "";

        private GridLength _lastSidebarWidth = new GridLength(300);

        public MainWindow()
        {
            InitializeComponent();
            _service = new AssetBundleService();
            InitializeEditor();
            TryInitMessageRenderer();

            PanelTheme.DataContext = _themeVm;
            SwitchSideView("Explorer");
        }

        // --- SIDEBAR NAV ---
        public void OnSidebarNav_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Button btn && btn.Tag is string tag) SwitchSideView(tag);
        }

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

            if (!SidePanelContainer.IsVisible)
            {
                SidebarGrid.ColumnDefinitions[1].Width = _lastSidebarWidth;
                SidebarGrid.ColumnDefinitions[2].Width = new GridLength(4);
            }

            SidePanelContainer.IsVisible = true;
            _currentView = viewName;

            PanelExplorer.IsVisible = viewName == "Explorer";
            PanelSearch.IsVisible = viewName == "Search";
            PanelFlags.IsVisible = viewName == "Flags";
            PanelCommands.IsVisible = viewName == "Commands";
            PanelTheme.IsVisible = viewName == "Theme";

            SetButtonActive(viewName);

            if (viewName == "Search")
            {
                Dispatcher.UIThread.Post(() => { SearchBox.Focus(); if (!string.IsNullOrWhiteSpace(SearchBox.Text)) PerformSearch(SearchBox.Text); });
            }
            else if (viewName == "Flags") { if (_allFlagUsages.Count == 0) RefreshAllTrackers(); }
            else if (viewName == "Commands") { if (_allWorkUsages.Count == 0) RefreshAllTrackers(); }
        }

        private void SetButtonActive(string? activeTag)
        {
            UpdateBtnStyle(BtnNavExplorer, activeTag);
            UpdateBtnStyle(BtnNavSearch, activeTag);
            UpdateBtnStyle(BtnNavFlags, activeTag);
            UpdateBtnStyle(BtnNavCommands, activeTag);
            UpdateBtnStyle(BtnNavTheme, activeTag);
        }

        // --- BOTTOM PANEL NAV ---
        public void OnBottomNav_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Button btn && btn.Tag is string tag) SwitchBottomView(tag);
        }

        public void BtnTerminal_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Terminal");
        public void BtnTerminalClose_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Terminal");
        public void BtnPreviewClose_Click(object? sender, RoutedEventArgs e) => SwitchBottomView("Preview");

        private void SwitchBottomView(string viewName)
        {
            if (BottomPanelContainer.IsVisible && _currentBottomView == viewName)
            {
                BottomPanelContainer.IsVisible = false;
                SetBottomButtonActive(null);
                return;
            }

            BottomPanelContainer.IsVisible = true;
            _currentBottomView = viewName;

            TerminalPanel.IsVisible = viewName == "Terminal";
            PreviewPanel.IsVisible = viewName == "Preview";

            SetBottomButtonActive(viewName);
            if (viewName == "Terminal") TerminalInput.Focus();
        }

        private void SetBottomButtonActive(string? activeTag)
        {
            UpdateBtnStyle(BtnNavTerminal, activeTag);
            UpdateBtnStyle(BtnNavPreview, activeTag);
        }

        private void UpdateBtnStyle(Button btn, string? activeTag)
        {
            if (btn.Tag?.ToString() == activeTag)
            {
                if (!btn.Classes.Contains("Active")) btn.Classes.Add("Active");
            }
            else
            {
                btn.Classes.Remove("Active");
            }
        }

        public void CloseApp_Click(object? sender, RoutedEventArgs e) => Close();
        public void ShowTheme_Click(object? sender, RoutedEventArgs e) => SwitchSideView("Theme");

        private async void RefreshAllTrackers()
        {
            StatusText.Text = "Scanner: Indexing...";
            try
            {
                List<object> nodesToScan = new List<object>();
                if (ScriptTree.ItemsSource is System.Collections.IEnumerable items) { foreach (var item in items) nodesToScan.Add(item); }

                LoadWorkIdMap();
                var result = await ScriptScanner.ScanAllAsync(nodesToScan, _service.FlagMap, _service.SysFlagMap, _workIdMap);

                _allFlagUsages = result.Flags;
                _allWorkUsages = result.Works;
                _allCommandUsages = result.Commands;
                _allEventUsages = result.Events;

                FilterFlags(FlagSearchBox.Text ?? "");
                FilterWorks(ScriptSearchBox.Text ?? "");
                StatusText.Text = $"Scanner: Indexed {result.Flags.Count} flags, {result.Works.Count} works.";
            }
            catch (Exception ex)
            {
                StatusText.Text = $"Scanner Error: {ex.Message}";
            }
        }

        public void RefreshFlags_Click(object? sender, RoutedEventArgs e) => RefreshAllTrackers();
        public void RefreshScripts_Click(object? sender, RoutedEventArgs e) => RefreshAllTrackers();

        private void LoadWorkIdMap()
        {
            _workIdMap.Clear();
            string? jsonDir = FindJsonFolder();
            if (string.IsNullOrEmpty(jsonDir)) return;
            try
            {
                string workPath = Path.Combine(jsonDir, "work.json");
                if (File.Exists(workPath))
                {
                    var jArray = JArray.Parse(File.ReadAllText(workPath));
                    foreach (var item in jArray) { int id = item["Id"]?.Value<int>() ?? 0; string name = item["Name"]?.Value<string>() ?? ""; if (!_workIdMap.ContainsKey(id)) _workIdMap.Add(id, name); }
                }
            }
            catch { }
        }

        public void SearchBox_TextChanged(object? sender, TextChangedEventArgs e) => PerformSearch(SearchBox.Text);
        public void FlagSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterFlags(FlagSearchBox.Text ?? "");
        public void ScriptSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterWorks(ScriptSearchBox.Text ?? "");

        private void FilterFlags(string query)
        {
            var unused = _allFlagUsages.Where(x => x.Locations.Count == 0 && !x.FlagName.StartsWith("$"));
            if (string.IsNullOrWhiteSpace(query)) { FlagList.ItemsSource = unused.ToList(); return; }
            FlagList.ItemsSource = unused.Where(f => f.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private void FilterWorks(string query)
        {
            var unused = _allWorkUsages.Where(x => x.Locations.Count == 0);
            if (string.IsNullOrWhiteSpace(query)) { ScriptList.ItemsSource = unused.ToList(); return; }
            ScriptList.ItemsSource = unused.Where(c => c.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private void PerformSearch(string? query)
        {
            if (string.IsNullOrWhiteSpace(query)) { SearchResultsList.ItemsSource = null; return; }
            var results = new List<SearchResult>();
            query = query.Trim();
            bool isIdSearch = int.TryParse(query, out int searchId);

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
        }

        public async void SaveTheme_Click(object? sender, RoutedEventArgs e)
        {
            var settings = _themeVm.ToSettings();
            string? jsonDir = FindJsonFolder();
            if (string.IsNullOrEmpty(jsonDir)) return;
            string themePath = Path.Combine(jsonDir, "theme.json");
            try { File.WriteAllText(themePath, JsonConvert.SerializeObject(settings, Formatting.Indented)); await InjectTheme(settings); StatusText.Text = "Theme saved."; } catch (Exception ex) { StatusText.Text = "Theme Save Error: " + ex.Message; }
        }

        private async Task InjectTheme(ThemeSettings? directSettings = null)
        {
            ThemeSettings settings = directSettings ?? new ThemeSettings();
            if (directSettings == null)
            {
                string? jsonDir = FindJsonFolder();
                if (!string.IsNullOrEmpty(jsonDir))
                {
                    string themePath = Path.Combine(jsonDir, "theme.json");
                    if (File.Exists(themePath)) settings = JsonConvert.DeserializeObject<ThemeSettings>(File.ReadAllText(themePath)) ?? settings;
                }
            }
            _themeVm.LoadFromSettings(settings);
            if (_isEditorReady && Editor != null) await Editor.ExecuteScriptAsync($"if (window.updateRelumiTheme) window.updateRelumiTheme({JsonConvert.SerializeObject(settings)});");
        }

        private void InitializeEditor()
        {
            string monacoPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "index.html");
            if (File.Exists(monacoPath))
            {
                Editor.Url = new Uri($"file:///{monacoPath.Replace("\\", "/")}");
                Editor.WebMessageReceived += OnEditorMessageReceived;
                Editor.NavigationCompleted += async (s, e) => { if (e.IsSuccess) { _isEditorReady = true; await GenerateAndInjectSyntax(); await InjectMonacoListeners(); await InjectTheme(); } };
            }
        }

        private async Task InjectMonacoListeners()
        {
            string script = @"editor.onDidChangeCursorPosition((e)=>{var l=editor.getModel().getLineContent(e.position.lineNumber);var m=l.match(/(?:_TALKMSG|_TALK_KEYWAIT|_EASY_OBJ_MSG|_EASY_BOARD_MSG)\s*\(\s*[@""]([^%]+)%([^)""]+)[""]?\s*\)/);if(m)window.chrome.webview.postMessage('PREVIEW:'+m[1]+'%'+m[2]);else window.chrome.webview.postMessage('HIDE_PREVIEW');});editor.addAction({id:'relumi-lookup',label:'Search in Global View',contextMenuGroupId:'navigation',contextMenuOrder:1.5,run:function(ed){var p=ed.getPosition();var m=ed.getModel();var w=m.getWordAtPosition(p);if(w){var charBefore=w.startColumn>1?m.getLineContent(p.lineNumber).charAt(w.startColumn-2):'';var prefix=(charBefore==='#'||charBefore==='$'||charBefore==='@')?charBefore:'';window.chrome.webview.postMessage('GLOBAL_SEARCH:'+prefix+w.word);}}});";
            await Editor.ExecuteScriptAsync(script);
        }

        private void OnEditorMessageReceived(object? sender, WebViewMessageReceivedEventArgs e)
        {
            if (e.Message == "HIDE_PREVIEW") { /* No longer auto-hiding logic needed */ return; }
            if (e.Message.StartsWith("PREVIEW:"))
            {
                var p = e.Message.Substring(8).Split('%');
                if (p.Length == 2) ShowMessagePreview(p[0].Trim(), p[1].Trim());
                return;
            }
            if (e.Message.StartsWith("GLOBAL_SEARCH:"))
            {
                SwitchSideView("Search", forceOpen: true);
                SearchBox.Text = e.Message.Substring(e.Message.IndexOf(':') + 1).Trim();
                return;
            }
            if (e.Message.StartsWith("CONTENT_UPDATE:")) _currentScriptContent = e.Message.Substring(15);
        }

        public async void BtnLoad_Click(object? sender, RoutedEventArgs e)
        {
            var top = TopLevel.GetTopLevel(this);
            var folders = await top!.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions { AllowMultiple = false, Title = "Select Project Root Folder" });
            if (folders.Count == 0) return;

            var root = folders[0].Path.LocalPath;
            _workingDirectory = root;
            StatusText.Text = "Scanning...";

            try
            {
                string? jsonDir = FindJsonFolder();
                if (_service.InitSummary.Contains("Cmds: 0") && !string.IsNullOrEmpty(jsonDir))
                    _service.Initialize(jsonDir);

                // 1. Load Game Data (Pokemon/Item Names from YAML assets)
                StatusText.Text = "Loading Game Data...";
                await Task.Run(() => _service.LoadGameData(root));

                // 2. Load Scripts (.ev text files)
                StatusText.Text = "Loading Scripts...";
                var scripts = await Task.Run(() => _service.LoadAndDecompile(root));

                // 3. Load Messages (.asset YAML files)
                StatusText.Text = "Loading Messages...";
                _loadedMessages = await Task.Run(() => _service.LoadMessageFiles(root));

                await GenerateAndInjectSyntax();

                ScriptTree.ItemsSource = scripts.OrderBy(x => x.Name).ToList();
                StatusText.Text = $"Loaded {scripts.Count} scripts.";

                RefreshAllTrackers();
                SwitchSideView("Explorer");
            }
            catch (Exception ex)
            {
                StatusText.Text = $"Load Error: {ex.Message}";
                Debug.WriteLine(ex);
            }
        }

        public void BtnSave_Click(object? sender, RoutedEventArgs e)
        {
            StatusText.Text = "Saving is currently disabled.";
        }

        private string? FindFile(string root, params string[] segments)
        {
            string full = Path.Combine(root, Path.Combine(segments));
            if (File.Exists(full)) return full;
            try { return Directory.EnumerateFiles(root, segments.Last(), SearchOption.AllDirectories).FirstOrDefault(); } catch { return null; }
        }

        public void BtnPrevPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex > 0) { _currentPageIndex--; RenderCurrentPage(); } }
        public void BtnNextPage_Click(object? sender, RoutedEventArgs e) { if (_currentPageIndex < _currentMessagePages.Count - 1) { _currentPageIndex++; RenderCurrentPage(); } }

        private void ShowMessagePreview(string file, string label)
        {
            TryInitMessageRenderer();
            if (_messageRenderer == null) return;
            var target = _loadedMessages.FirstOrDefault(f => f.Name.Equals(file, StringComparison.OrdinalIgnoreCase))?.Scripts.FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase));
            if (target != null)
            {
                _currentMessagePages = _messageRenderer.SplitIntoPages(target.Content);
                _currentPageIndex = 0;
                RenderCurrentPage();
            }
        }

        private void RenderCurrentPage()
        {
            if (_messageRenderer == null || _currentMessagePages.Count == 0) return;
            _currentPageIndex = Math.Clamp(_currentPageIndex, 0, _currentMessagePages.Count - 1);
            MessagePreviewContent.Content = _messageRenderer.RenderPage(_currentMessagePages[_currentPageIndex], _currentPageIndex + 1, _currentMessagePages.Count);
            PageIndicator.Text = $"{_currentPageIndex + 1} / {_currentMessagePages.Count}";
            BtnPrevPage.IsVisible = BtnNextPage.IsVisible = PageIndicator.IsVisible = _currentMessagePages.Count > 1;
        }

        private async void TerminalInput_KeyDown(object? sender, KeyEventArgs e)
        {
            if (e.Key != Key.Enter || string.IsNullOrWhiteSpace(TerminalInput.Text)) return;
            string cmd = TerminalInput.Text;
            TerminalOutput.Text += $"> {cmd}\n";
            TerminalInput.Text = "";
            if (cmd.ToLower() == "cls") { TerminalOutput.Text = ""; return; }
            await Task.Run(() =>
            {
                try
                {
                    var info = new ProcessStartInfo("cmd.exe", $"/c {cmd}") { RedirectStandardOutput = true, RedirectStandardError = true, UseShellExecute = false, CreateNoWindow = true, WorkingDirectory = string.IsNullOrEmpty(_workingDirectory) ? AppDomain.CurrentDomain.BaseDirectory : _workingDirectory };
                    using var p = Process.Start(info);
                    if (p == null) return;
                    string o = p.StandardOutput.ReadToEnd(); string err = p.StandardError.ReadToEnd(); p.WaitForExit();
                    Dispatcher.UIThread.Post(() => TerminalOutput.Text += $"{o}{err}\n");
                }
                catch (Exception ex) { Dispatcher.UIThread.Post(() => TerminalOutput.Text += $"Error: {ex.Message}\n"); }
            });
        }

        public async void ScriptTree_SelectionChanged(object? sender, SelectionChangedEventArgs e)
        {
            if (_isNavigating) return;
            if (e.RemovedItems.Count > 0 && e.RemovedItems[0] is ScriptNode oldNode) oldNode.Content = _currentScriptContent;
            if (ScriptTree.SelectedItem is ScriptNode s) await SetEditorText(s.Content); else if (ScriptTree.SelectedItem is FileNode f) await SetEditorText(string.Join(Environment.NewLine, f.Scripts.Select(x => x.Content)));
        }

        public async void JumpToLocation_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Control c && c.Tag is FlagLocation loc)
            {
                _isNavigating = true;
                try
                {
                    if (loc.NodeObject != null) ScriptTree.SelectedItem = loc.NodeObject;
                    string content = ""; if (loc.NodeObject is ScriptNode sNode) content = sNode.Content; else if (loc.NodeObject is FileNode fNode) content = string.Join(Environment.NewLine, fNode.Scripts.Select(x => x.Content));
                    if (!string.IsNullOrEmpty(content)) await SetEditorText(content);
                    if (_isEditorReady) { await Task.Delay(50); await Editor.ExecuteScriptAsync($"editor.revealLineInCenter({loc.LineNumber}); editor.setPosition({{lineNumber: {loc.LineNumber}, column: 1}}); editor.focus();"); }
                }
                finally { _isNavigating = false; }
            }
        }

        private async Task SetEditorText(string content)
        {
            _currentScriptContent = content;
            string safe = JsonConvert.ToString(content);
            if (_isEditorReady) await Editor.ExecuteScriptAsync($"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe}); editor.updateOptions({{readOnly: false}});");
        }

        private void TryInitMessageRenderer() { if (_messageRenderer == null && !string.IsNullOrEmpty(FindJsonFolder())) _messageRenderer = new MessageRenderer(Path.GetFullPath(Path.Combine(FindJsonFolder()!, "..", "Assets"))); }
        private async Task GenerateAndInjectSyntax() { string? jd = FindJsonFolder(); if (string.IsNullOrEmpty(jd)) return; await Task.Run(() => { string cmds = File.Exists(Path.Combine(jd, "commands.json")) ? File.ReadAllText(Path.Combine(jd, "commands.json")) : "[]"; string js = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: [], sysflags: [], works: [], pokes: {JsonConvert.SerializeObject(_service.PokemonMap)}, items: {JsonConvert.SerializeObject(_service.ItemMap)} }}; window.RELUMI_DATA_LOADED = true;"; File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "syntax_data.js"), js, Encoding.UTF8); }); if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');"); }
        private string? FindJsonFolder() { string b = AppDomain.CurrentDomain.BaseDirectory; if (Directory.Exists(Path.Combine(b, "JSON"))) return Path.Combine(b, "JSON"); if (Directory.Exists(Path.Combine(b, "..", "..", "..", "JSON"))) return Path.GetFullPath(Path.Combine(b, "..", "..", "..", "JSON")); return null; }
    }
}