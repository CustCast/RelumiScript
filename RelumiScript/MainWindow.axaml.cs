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
        private bool _isBlocklyReady = false;

        private string _currentScriptContent = "";
        private List<FileNode> _loadedMessages = new List<FileNode>();
        private string _workingDirectory = "";

        // Message preview state
        private List<string> _currentMessagePages = new List<string>();
        private int _currentPageIndex = 0;

        // Caches for search
        private List<FlagUsageInfo> _allFlagUsages = new List<FlagUsageInfo>();
        private List<CommandUsageInfo> _allCommandUsages = new List<CommandUsageInfo>();
        private List<FlagUsageInfo> _allWorkUsages = new List<FlagUsageInfo>();
        private Dictionary<int, string> _workIdMap = new Dictionary<int, string>();

        private ThemeEditorViewModel _themeVm = new ThemeEditorViewModel();

        public MainWindow()
        {
            InitializeComponent();
            _service = new AssetBundleService();
            InitializeEditor();
            InitializeBlockly();
            TryInitMessageRenderer();

            ThemePanel.DataContext = _themeVm;
        }

        // --- Core Scanning Logic ---

        private async void RefreshAllTrackers()
        {
            StatusText.Text = "Scanner: Indexing...";

            // Collect nodes
            List<object> nodesToScan = new List<object>();
            if (ScriptTree.ItemsSource is System.Collections.IEnumerable items)
            {
                foreach (var item in items) nodesToScan.Add(item);
            }

            // Load Work IDs for search
            LoadWorkIdMap();

            // Run Scanner Service
            var result = await ScriptScanner.ScanAllAsync(nodesToScan, _service.FlagMap, _service.SysFlagMap, _workIdMap);

            _allFlagUsages = result.Flags;
            _allWorkUsages = result.Works;
            _allCommandUsages = result.Commands;

            // UI Update
            if (FlagTrackerPanel.IsVisible) FilterFlags(FlagSearchBox.Text ?? "");
            if (ScriptTrackerPanel.IsVisible) FilterCommands(ScriptSearchBox.Text ?? "");

            StatusText.Text = $"Scanner: Indexed {result.Flags.Count} flags, {result.Works.Count} works, {result.Commands.Count} commands.";
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
                    foreach (var item in jArray)
                    {
                        int id = item["Id"]?.Value<int>() ?? 0;
                        string name = item["Name"]?.Value<string>() ?? "";
                        if (!_workIdMap.ContainsKey(id)) _workIdMap.Add(id, name);
                    }
                }
            }
            catch { /* Ignore */ }
        }

        // --- Search Logic ---

        public void BtnSearch_Click(object? sender, RoutedEventArgs e)
        {
            TogglePanel(SearchPanel);
            if (SearchPanel.IsVisible)
            {
                SearchBox.Focus();
                PerformSearch(SearchBox.Text);
            }
        }

        public void SearchBox_TextChanged(object? sender, TextChangedEventArgs e) => PerformSearch(SearchBox.Text);
        public void FlagSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterFlags(FlagSearchBox.Text ?? "");
        public void ScriptSearchBox_TextChanged(object? sender, TextChangedEventArgs e) => FilterCommands(ScriptSearchBox.Text ?? "");

        private void FilterFlags(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) { FlagList.ItemsSource = _allFlagUsages; return; }
            FlagList.ItemsSource = _allFlagUsages.Where(f => f.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private void FilterCommands(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) { ScriptList.ItemsSource = _allCommandUsages; return; }
            ScriptList.ItemsSource = _allCommandUsages.Where(c => c.CommandName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private void PerformSearch(string? query)
        {
            if (string.IsNullOrWhiteSpace(query)) { SearchResultsList.ItemsSource = null; return; }

            var results = new List<SearchResult>();
            query = query.Trim();
            bool isIdSearch = int.TryParse(query, out int searchId);

            // 1. Pokemon
            if (isIdSearch && _service.PokemonMap.TryGetValue(searchId, out string? pName))
                results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = searchId, Name = pName });
            foreach (var kvp in _service.PokemonMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId).Take(20))
                results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = kvp.Key, Name = kvp.Value });

            // 2. Items
            if (isIdSearch && _service.ItemMap.TryGetValue(searchId, out string? iName))
                results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = searchId, Name = iName });
            foreach (var kvp in _service.ItemMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId).Take(20))
                results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = kvp.Key, Name = kvp.Value });

            // 3. Works (ID + Name)
            if (isIdSearch && _workIdMap.TryGetValue(searchId, out string? wName))
            {
                var usage = _allWorkUsages.FirstOrDefault(u => u.FlagName.Equals("@" + wName, StringComparison.OrdinalIgnoreCase));
                results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Id = searchId, Name = wName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() });
            }
            foreach (var w in _allWorkUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).Take(20))
                results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Name = w.FlagName, Locations = new ObservableCollection<FlagLocation>(w.Locations) });

            // 4. Flags
            foreach (var f in _allFlagUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase)).Take(20))
                results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Name = f.FlagName, Locations = new ObservableCollection<FlagLocation>(f.Locations) });

            // 5. Commands
            foreach (var c in _allCommandUsages.Where(x => x.CommandName.Contains(query, StringComparison.OrdinalIgnoreCase)).Take(20))
                results.Add(new SearchResult { Type = "CMD", Color = "#BD93F9", Name = c.CommandName, Locations = new ObservableCollection<FlagLocation>(c.Locations) });

            SearchResultsList.ItemsSource = results;
        }

        // --- Theme Logic ---

        public void BtnTheme_Click(object? sender, RoutedEventArgs e) => TogglePanel(ThemePanel);

        public async void SaveTheme_Click(object? sender, RoutedEventArgs e)
        {
            var settings = _themeVm.ToSettings();
            string? jsonDir = FindJsonFolder();
            if (string.IsNullOrEmpty(jsonDir)) return;

            string themePath = Path.Combine(jsonDir, "theme.json");
            try
            {
                File.WriteAllText(themePath, JsonConvert.SerializeObject(settings, Formatting.Indented));
                await InjectTheme(settings);
                StatusText.Text = "Theme saved.";
            }
            catch (Exception ex) { StatusText.Text = "Theme Save Error: " + ex.Message; }
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
                    if (File.Exists(themePath))
                        settings = JsonConvert.DeserializeObject<ThemeSettings>(File.ReadAllText(themePath)) ?? settings;
                }
            }

            _themeVm.LoadFromSettings(settings);
            if (_isEditorReady && Editor != null)
                await Editor.ExecuteScriptAsync($"if (window.updateRelumiTheme) window.updateRelumiTheme({JsonConvert.SerializeObject(settings)});");
        }

        // --- Editor Integration ---

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
            string script = @"
                editor.onDidChangeCursorPosition((e) => {
                    var l = editor.getModel().getLineContent(e.position.lineNumber);
                    var m = l.match(/(?:_TALKMSG|_TALK_KEYWAIT|_EASY_OBJ_MSG|_EASY_BOARD_MSG)\s*\(\s*[@""]([^%]+)%([^)""]+)[""]?\s*\)/);
                    if (m) window.chrome.webview.postMessage('PREVIEW:' + m[1] + '%' + m[2]); 
                    else window.chrome.webview.postMessage('HIDE_PREVIEW');
                });
                editor.addAction({
                    id: 'relumi-lookup', label: 'Search in Global View', contextMenuGroupId: 'navigation', contextMenuOrder: 1.5,
                    run: function(ed) {
                        var p = ed.getPosition(); var m = ed.getModel(); var w = m.getWordAtPosition(p);
                        if(w) {
                            var charBefore = w.startColumn > 1 ? m.getLineContent(p.lineNumber).charAt(w.startColumn - 2) : '';
                            var prefix = (charBefore === '#' || charBefore === '$' || charBefore === '@') ? charBefore : '';
                            window.chrome.webview.postMessage('GLOBAL_SEARCH:' + prefix + w.word);
                        }
                    }
                });";
            await Editor.ExecuteScriptAsync(script);
        }

        private void OnEditorMessageReceived(object? sender, WebViewMessageReceivedEventArgs e)
        {
            if (e.Message == "HIDE_PREVIEW") { MessagePreviewContainer.IsVisible = false; return; }
            if (e.Message.StartsWith("PREVIEW:")) { var p = e.Message.Substring(8).Split('%'); if (p.Length == 2) ShowMessagePreview(p[0].Trim(), p[1].Trim()); return; }
            if (e.Message.StartsWith("GLOBAL_SEARCH:"))
            {
                TogglePanel(SearchPanel);
                SearchBox.Text = e.Message.Substring(e.Message.IndexOf(':') + 1).Trim();
                return;
            }
            if (e.Message.StartsWith("CONTENT_UPDATE:")) _currentScriptContent = e.Message.Substring(15);
        }

        // --- File & Preview & UI ---

        public async void BtnLoad_Click(object? sender, RoutedEventArgs e)
        {
            var top = TopLevel.GetTopLevel(this);
            var folders = await top!.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions { AllowMultiple = false, Title = "Select Dump Folder" });
            if (folders.Count == 0) return;

            StatusText.Text = "Scanning...";
            var root = folders[0].Path.LocalPath;
            _workingDirectory = root;

            string? evPath = FindFile(root, "romfs", "data", "StreamingAssets", "AssetAssistant", "Dpr", "ev_script");
            string? msgPath = FindFile(root, "romfs", "data", "StreamingAssets", "AssetAssistant", "Message", "common_msbt");
            string? engPath = FindFile(root, "romfs", "data", "StreamingAssets", "AssetAssistant", "Message", "english");

            if (string.IsNullOrEmpty(evPath)) { StatusText.Text = "Error: 'ev_script' not found."; return; }

            // Initialize data if needed
            string? jsonDir = FindJsonFolder();
            if (_service.InitSummary.Contains("Cmds: 0") && !string.IsNullOrEmpty(jsonDir)) _service.Initialize(jsonDir);

            if (!string.IsNullOrEmpty(msgPath)) { await Task.Run(() => _service.LoadGameData(msgPath)); await GenerateAndInjectSyntax(); }

            var scripts = await Task.Run(() => _service.LoadAndDecompile(evPath));
            if (!string.IsNullOrEmpty(engPath)) _loadedMessages = await Task.Run(() => _service.LoadMessageFiles(engPath));

            ScriptTree.ItemsSource = scripts.OrderBy(x => x.Name).ToList();
            StatusText.Text = $"Loaded {scripts.Count} scripts.";
            RefreshAllTrackers();
        }

        private string? FindFile(string root, params string[] segments)
        {
            string full = Path.Combine(root, Path.Combine(segments));
            if (File.Exists(full)) return full;
            // Simplified fallback search
            try { return Directory.EnumerateFiles(root, segments.Last(), SearchOption.AllDirectories).FirstOrDefault(); } catch { return null; }
        }

        public void BtnPrevPage_Click(object? sender, RoutedEventArgs e)
        {
            if (_currentPageIndex > 0)
            {
                _currentPageIndex--;
                RenderCurrentPage();
            }
        }

        public void BtnNextPage_Click(object? sender, RoutedEventArgs e)
        {
            if (_currentPageIndex < _currentMessagePages.Count - 1)
            {
                _currentPageIndex++;
                RenderCurrentPage();
            }
        }

        private void ShowMessagePreview(string file, string label)
        {
            TryInitMessageRenderer();
            if (_messageRenderer == null) return;
            var target = _loadedMessages.FirstOrDefault(f => f.Name.Equals(file, StringComparison.OrdinalIgnoreCase))
                                       ?.Scripts.FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase));
            if (target != null)
            {
                _currentMessagePages = _messageRenderer.SplitIntoPages(target.Content);
                _currentPageIndex = 0;
                MessagePreviewContainer.IsVisible = true;
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

        // --- Terminal ---

        public void BtnTerminal_Click(object? sender, RoutedEventArgs e) { TogglePanel(TerminalPanel); if (TerminalPanel.IsVisible) TerminalInput.Focus(); }

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
                    string o = p.StandardOutput.ReadToEnd();
                    string err = p.StandardError.ReadToEnd();
                    p.WaitForExit();
                    Dispatcher.UIThread.Post(() => TerminalOutput.Text += $"{o}{err}\n");
                }
                catch (Exception ex) { Dispatcher.UIThread.Post(() => TerminalOutput.Text += $"Error: {ex.Message}\n"); }
            });
        }

        // --- Helpers ---

        private void TogglePanel(Control panel)
        {
            bool wasVisible = panel.IsVisible;
            SearchPanel.IsVisible = FlagTrackerPanel.IsVisible = ScriptTrackerPanel.IsVisible = ThemePanel.IsVisible = TerminalPanel.IsVisible = false;
            panel.IsVisible = !wasVisible;
        }

        public void BtnFlags_Click(object? sender, RoutedEventArgs e) => TogglePanel(FlagTrackerPanel);
        public void BtnScripts_Click(object? sender, RoutedEventArgs e) => TogglePanel(ScriptTrackerPanel);
        public void ScriptTree_SelectionChanged(object? sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode s) SetEditorText(s.Content);
            else if (ScriptTree.SelectedItem is FileNode f) SetEditorText(string.Join(Environment.NewLine, f.Scripts.Select(x => x.Content)));
        }

        public async void JumpToLocation_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Control c && c.Tag is FlagLocation loc)
            {
                if (loc.NodeObject != null) ScriptTree.SelectedItem = loc.NodeObject;
                await Task.Delay(150);
                if (_isEditorReady) await Editor.ExecuteScriptAsync($"editor.revealLineInCenter({loc.LineNumber}); editor.setPosition({{lineNumber: {loc.LineNumber}, column: 1}}); editor.focus();");
            }
        }

        public void OnTabChanged(object? sender, RoutedEventArgs e) { Editor.IsVisible = TabCode.IsChecked == true; BlockEditor.IsVisible = !Editor.IsVisible; SetEditorText(_currentScriptContent); }
        private async void SetEditorText(string content)
        {
            _currentScriptContent = content;
            string safe = JsonConvert.ToString(content);
            if (_isEditorReady) await Editor.ExecuteScriptAsync($"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe}); editor.updateOptions({{readOnly: false}});");
            if (_isBlocklyReady && BlockEditor.IsVisible) await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
        }
        private void TryInitMessageRenderer() { if (_messageRenderer == null && !string.IsNullOrEmpty(FindJsonFolder())) _messageRenderer = new MessageRenderer(Path.GetFullPath(Path.Combine(FindJsonFolder()!, "..", "Assets"))); }
        private void InitializeBlockly()
        {
            string p = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Assets", "Blockly", "index.html");
            if (!File.Exists(p)) p = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Blockly", "index.html");
            if (File.Exists(p)) { BlockEditor.Url = new Uri($"file:///{p.Replace("\\", "/")}"); BlockEditor.NavigationCompleted += (s, e) => { if (e.IsSuccess) _isBlocklyReady = true; }; BlockEditor.WebMessageReceived += (s, e) => _currentScriptContent = e.Message ?? ""; }
        }
        private async Task GenerateAndInjectSyntax()
        {
            string? jd = FindJsonFolder();
            if (string.IsNullOrEmpty(jd)) return;
            await Task.Run(() => {
                string cmds = File.Exists(Path.Combine(jd, "commands.json")) ? File.ReadAllText(Path.Combine(jd, "commands.json")) : "[]";
                // Simplified for brevity - in real app, reload all JSONs
                string js = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: [], sysflags: [], works: [], pokes: {JsonConvert.SerializeObject(_service.PokemonMap)}, items: {JsonConvert.SerializeObject(_service.ItemMap)} }}; window.RELUMI_DATA_LOADED = true;";
                File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "syntax_data.js"), js, Encoding.UTF8);
            });
            if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");
        }
        private string? FindJsonFolder()
        {
            string b = AppDomain.CurrentDomain.BaseDirectory;
            if (Directory.Exists(Path.Combine(b, "JSON"))) return Path.Combine(b, "JSON");
            if (Directory.Exists(Path.Combine(b, "..", "..", "..", "JSON"))) return Path.GetFullPath(Path.Combine(b, "..", "..", "..", "JSON"));
            return null;
        }
    }
}