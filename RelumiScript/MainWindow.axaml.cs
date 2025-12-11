using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

namespace RelumiScript
{
    // Helper class for search results
    public class SearchResult : System.ComponentModel.INotifyPropertyChanged
    {
        public string Type { get; set; } = "UNK"; // PKM, ITM, FLG, CMD, WRK
        public string Color { get; set; } = "White";
        public int Id { get; set; } // 0 if not applicable
        public string Name { get; set; } = "";

        public ObservableCollection<FlagLocation> Locations { get; set; } = new ObservableCollection<FlagLocation>();

        private bool _isExpanded;
        public bool IsExpanded
        {
            get => _isExpanded;
            set { _isExpanded = value; PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(nameof(IsExpanded))); }
        }

        public event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
    }

    public class FlagUsageInfo : System.ComponentModel.INotifyPropertyChanged
    {
        public string FlagName { get; set; } = "";
        public string CountString => $"({Locations.Count})";
        public List<FlagLocation> Locations { get; set; } = new List<FlagLocation>();

        private bool _isExpanded;
        public bool IsExpanded
        {
            get => _isExpanded;
            set { _isExpanded = value; PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(nameof(IsExpanded))); }
        }

        public event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
    }

    public class FlagLocation
    {
        public int LineNumber { get; set; }
        public string Command { get; set; } = "";
        public string Content { get; set; } = "";
        public string FileName { get; set; } = "";
        public object? NodeObject { get; set; }
    }

    public partial class MainWindow : Avalonia.Controls.Window
    {
        private AssetBundleService _service;
        private MessageRenderer? _messageRenderer;

        private bool _isEditorReady = false;
        private bool _isBlocklyReady = false;

        private string _currentScriptContent = "";
        private List<FileNode> _loadedMessages = new List<FileNode>();

        // Message preview pagination state
        private List<string> _currentMessagePages = new List<string>();
        private int _currentPageIndex = 0;
        private string _currentMessageLabel = "";

        // Caches for search
        private List<FlagUsageInfo> _allFlagUsages = new List<FlagUsageInfo>();
        private List<CommandUsageInfo> _allCommandUsages = new List<CommandUsageInfo>();
        private List<FlagUsageInfo> _allWorkUsages = new List<FlagUsageInfo>();

        // ID Map for Works (populated from work.json)
        private Dictionary<int, string> _workIdMap = new Dictionary<int, string>();

        private ThemeEditorViewModel _themeVm = new ThemeEditorViewModel();

        public class CommandUsageInfo : System.ComponentModel.INotifyPropertyChanged
        {
            public string CommandName { get; set; } = "";
            public string CountString => $"({Locations.Count} uses)";
            public List<FlagLocation> Locations { get; set; } = new List<FlagLocation>();

            private bool _isExpanded;
            public bool IsExpanded
            {
                get => _isExpanded;
                set { _isExpanded = value; PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(nameof(IsExpanded))); }
            }

            public event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
        }

        public MainWindow()
        {
            InitializeComponent();
            _service = new AssetBundleService();
            InitializeEditor();
            InitializeBlockly();
            TryInitMessageRenderer();

            ThemePanel.DataContext = _themeVm;
        }

        // --- Core Logic ---

        private async void RefreshAllTrackers()
        {
            // Run indexing in background
            await RefreshFlagsAndWorks();
            await RefreshCommands();
        }

        private async Task RefreshCommands()
        {
            List<object> nodesToScan = new List<object>();
            if (ScriptTree.ItemsSource is System.Collections.IEnumerable items)
            {
                foreach (var item in items) nodesToScan.Add(item);
            }

            await Task.Run(() =>
            {
                try
                {
                    var combinedResults = new Dictionary<string, CommandUsageInfo>(StringComparer.OrdinalIgnoreCase);

                    foreach (var node in nodesToScan)
                    {
                        if (node is FileNode fNode)
                        {
                            int offset = 0;
                            foreach (var s in fNode.Scripts)
                            {
                                ScanForCommands(s.Content, fNode.Name, fNode, combinedResults, offset);
                                var lines = s.Content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
                                offset += lines.Length;
                            }
                        }
                        else if (node is ScriptNode sNode)
                        {
                            ScanForCommands(sNode.Content, "Root", sNode, combinedResults, 0);
                        }
                    }

                    Dispatcher.UIThread.Post(() =>
                    {
                        _allCommandUsages = combinedResults.Values
                            .OrderByDescending(c => c.Locations.Count > 0)
                            .ThenBy(c => c.CommandName)
                            .ToList();

                        if (ScriptTrackerPanel.IsVisible)
                            FilterCommands(ScriptSearchBox.Text ?? "");
                    });
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"[Tracker] Command Scan Error: {ex}");
                }
            });
        }

        private void ScanForCommands(string content, string fileName, object nodeObj, Dictionary<string, CommandUsageInfo> results, int lineOffset)
        {
            var lines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith("//") || line.TrimStart().StartsWith(";")) continue;

                var match = System.Text.RegularExpressions.Regex.Match(line.Trim(), @"^([A-Za-z0-9_]+)");
                if (match.Success)
                {
                    string cmd = match.Groups[1].Value;
                    if (line.Trim().StartsWith(cmd + ":")) continue;

                    if (!results.ContainsKey(cmd)) results[cmd] = new CommandUsageInfo { CommandName = cmd };

                    results[cmd].Locations.Add(new FlagLocation
                    {
                        LineNumber = i + 1 + lineOffset,
                        Command = cmd,
                        Content = line.Trim(),
                        FileName = fileName,
                        NodeObject = nodeObj
                    });
                }
            }
        }

        private void FilterCommands(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                ScriptList.ItemsSource = _allCommandUsages;
                return;
            }
            var lowerQ = query.ToLower();
            ScriptList.ItemsSource = _allCommandUsages.Where(c => c.CommandName.ToLower().Contains(lowerQ)).ToList();
        }

        private void SelectCommandInList(string commandName)
        {
            if (string.IsNullOrWhiteSpace(commandName) || !ScriptTrackerPanel.IsVisible || _allCommandUsages.Count == 0)
                return;

            var target = _allCommandUsages.FirstOrDefault(f => f.CommandName.Equals(commandName, StringComparison.OrdinalIgnoreCase));
            if (target != null)
            {
                if (ScriptList.Items.Count != _allCommandUsages.Count && !ScriptList.Items.Contains(target))
                {
                    ScriptSearchBox.Text = "";
                }

                Dispatcher.UIThread.Post(() =>
                {
                    target.IsExpanded = true;
                    Dispatcher.UIThread.Post(() =>
                    {
                        try
                        {
                            ScriptList.ScrollIntoView(target);
                            ScriptList.SelectedItem = target;
                        }
                        catch { }
                    }, DispatcherPriority.ApplicationIdle);
                }, DispatcherPriority.Background);
            }
        }

        private void TryInitMessageRenderer()
        {
            if (_messageRenderer != null) return;
            string? jsonDir = FindJsonFolder();
            if (!string.IsNullOrEmpty(jsonDir))
            {
                string assetsDir = Path.GetFullPath(Path.Combine(jsonDir, "..", "Assets"));
                if (Directory.Exists(assetsDir))
                    _messageRenderer = new MessageRenderer(assetsDir);
            }
        }

        private void InitializeEditor()
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string monacoPath = Path.Combine(appDir, "Monaco", "index.html");

            if (File.Exists(monacoPath))
            {
                Editor.Url = new Uri($"file:///{monacoPath.Replace("\\", "/")}");
                Editor.WebMessageReceived += OnEditorMessageReceived;

                Editor.NavigationCompleted += async (sender, args) =>
                {
                    if (args.IsSuccess)
                    {
                        _isEditorReady = true;
                        await GenerateAndInjectSyntax();
                        await InjectMonacoListeners();
                        await InjectTheme();
                    }
                };
            }
            else StatusText.Text = $"Error: Monaco not found at {monacoPath}";
        }

        private async Task InjectMonacoListeners()
        {
            if (!_isEditorReady || Editor == null) return;
            string script = @"
                editor.onDidChangeCursorPosition((e) => {
                    var model = editor.getModel();
                    var lineContent = model.getLineContent(e.position.lineNumber);
                    var match = lineContent.match(/(?:_TALKMSG|_TALK_KEYWAIT|_EASY_OBJ_MSG|_EASY_BOARD_MSG)\s*\(\s*[@""]([^%]+)%([^)""]+)[""]?\s*\)/);
                    if (match) { window.chrome.webview.postMessage('PREVIEW:' + match[1] + '%' + match[2]); } 
                    else { window.chrome.webview.postMessage('HIDE_PREVIEW'); }
                });
                
                // UNIFIED LOOKUP ACTION
                // This replaces the individual lookup actions and routes everything to the global search
                var lookupAction = {
                    id: 'relumi-lookup',
                    label: 'Search in Global View',
                    contextMenuGroupId: 'navigation',
                    contextMenuOrder: 1.5,
                    run: function(ed) {
                        var pos = ed.getPosition();
                        var model = ed.getModel();
                        var wordInfo = model.getWordAtPosition(pos);
                        if (wordInfo) {
                           var word = wordInfo.word;
                           var lineContent = model.getLineContent(pos.lineNumber);
                           var charBefore = '';
                           if (wordInfo.startColumn > 1) { charBefore = lineContent.charAt(wordInfo.startColumn - 2); }
                           
                           // Check for prefix
                           var prefix = '';
                           if (charBefore === '#' || charBefore === '$' || charBefore === '@') {
                               prefix = charBefore;
                           }
                           
                           // Send GLOBAL_SEARCH with the prefix + word
                           window.chrome.webview.postMessage('GLOBAL_SEARCH:' + prefix + word);
                        }
                    }
                };
                editor.addAction(lookupAction);
            ";
            await Editor.ExecuteScriptAsync(script);
        }

        private void OnEditorMessageReceived(object? sender, WebViewMessageReceivedEventArgs e)
        {
            string? msg = e.Message;
            if (string.IsNullOrEmpty(msg)) return;

            if (msg == "HIDE_PREVIEW")
            {
                if (MessagePreviewContainer.IsVisible)
                {
                    MessagePreviewContainer.IsVisible = false;
                    if (MainContentGrid.RowDefinitions.Count > 3)
                        MainContentGrid.RowDefinitions[3].Height = GridLength.Auto;
                }
                return;
            }

            if (msg.StartsWith("PREVIEW:"))
            {
                var parts = msg.Substring(8).Split('%');
                if (parts.Length == 2) ShowMessagePreview(parts[0].Trim(), parts[1].Trim());
                return;
            }

            // UNIFIED SEARCH ROUTER
            // Routes all lookup commands to the Global Search Panel
            if (msg.StartsWith("GLOBAL_SEARCH:") || msg.StartsWith("LOOKUP_FLAG:") || msg.StartsWith("LOOKUP_CMD:"))
            {
                string searchTerm = msg.Substring(msg.IndexOf(':') + 1).Trim();

                // Hide other panels
                FlagTrackerPanel.IsVisible = false;
                ScriptTrackerPanel.IsVisible = false;
                ThemePanel.IsVisible = false;

                // Show Search Panel
                SearchPanel.IsVisible = true;

                // Execute Search
                SearchBox.Text = searchTerm;
                SearchBox.Focus();
                return;
            }

            if (msg.StartsWith("CONTENT_UPDATE:"))
            {
                string content = msg.Substring(15);
                _currentScriptContent = content;
                return;
            }
        }

        private void SelectFlagInList(string flagName)
        {
            // Legacy method kept for safety, but primary path is now GLOBAL_SEARCH
            if (string.IsNullOrWhiteSpace(flagName) || !FlagTrackerPanel.IsVisible || _allFlagUsages.Count == 0)
                return;

            var target = _allFlagUsages.FirstOrDefault(f => f.FlagName.Equals(flagName, StringComparison.OrdinalIgnoreCase));
            if (target != null)
            {
                if (FlagList.Items.Count != _allFlagUsages.Count && !FlagList.Items.Contains(target))
                {
                    FlagSearchBox.Text = "";
                }

                Dispatcher.UIThread.Post(() =>
                {
                    target.IsExpanded = true;
                    Dispatcher.UIThread.Post(() =>
                    {
                        try
                        {
                            FlagList.ScrollIntoView(target);
                            FlagList.SelectedItem = target;
                        }
                        catch { }
                    }, DispatcherPriority.ApplicationIdle);
                }, DispatcherPriority.Background);
            }
        }

        private void ShowMessagePreview(string fileName, string label)
        {
            TryInitMessageRenderer();
            if (_messageRenderer == null) return;

            var targetFile = _loadedMessages.FirstOrDefault(f => f.Name.Equals(fileName, StringComparison.OrdinalIgnoreCase));
            if (targetFile != null)
            {
                var targetScript = targetFile.Scripts.FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase));
                if (targetScript != null)
                {
                    _currentMessagePages = _messageRenderer.SplitIntoPages(targetScript.Content);
                    _currentPageIndex = 0;
                    _currentMessageLabel = label;

                    MessagePreviewContainer.IsVisible = true;
                    if (MainContentGrid.RowDefinitions.Count > 3)
                        MainContentGrid.RowDefinitions[3].Height = GridLength.Auto;

                    RenderCurrentPage();
                    StatusText.Text = $"Previewing: {label} ({_currentMessagePages.Count} pages)";
                }
            }
        }

        private void RenderCurrentPage()
        {
            if (_messageRenderer == null || _currentMessagePages.Count == 0) return;

            if (_currentPageIndex < 0) _currentPageIndex = 0;
            if (_currentPageIndex >= _currentMessagePages.Count) _currentPageIndex = _currentMessagePages.Count - 1;

            string pageText = _currentMessagePages[_currentPageIndex];
            MessagePreviewContent.Content = _messageRenderer.RenderPage(pageText, _currentPageIndex + 1, _currentMessagePages.Count);

            bool hasMultiplePages = _currentMessagePages.Count > 1;
            BtnPrevPage.IsVisible = hasMultiplePages;
            BtnNextPage.IsVisible = hasMultiplePages;
            PageIndicator.IsVisible = hasMultiplePages;

            if (hasMultiplePages)
            {
                PageIndicator.Text = $"{_currentPageIndex + 1} / {_currentMessagePages.Count}";
                BtnPrevPage.IsEnabled = _currentPageIndex > 0;
                BtnNextPage.IsEnabled = _currentPageIndex < _currentMessagePages.Count - 1;
            }
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

        // --- Search Logic ---

        public void BtnSearch_Click(object? sender, RoutedEventArgs e)
        {
            SearchPanel.IsVisible = !SearchPanel.IsVisible;
            if (SearchPanel.IsVisible)
            {
                FlagTrackerPanel.IsVisible = false;
                ThemePanel.IsVisible = false;
                ScriptTrackerPanel.IsVisible = false;
                SearchBox.Focus();
                PerformSearch(SearchBox.Text);
            }
        }

        public void SearchBox_TextChanged(object? sender, TextChangedEventArgs e)
        {
            PerformSearch(SearchBox.Text);
        }

        private void PerformSearch(string? query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                SearchResultsList.ItemsSource = null;
                return;
            }

            var results = new List<SearchResult>();
            query = query.Trim();
            bool isIdSearch = int.TryParse(query, out int searchId);

            // 1. Search Pokemon
            if (isIdSearch && _service.PokemonMap.TryGetValue(searchId, out string? pName))
                results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = searchId, Name = pName });

            var pMatches = _service.PokemonMap
                .Where(kvp => kvp.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && kvp.Key != searchId)
                .Take(20);
            foreach (var kvp in pMatches)
                results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = kvp.Key, Name = kvp.Value });

            // 2. Search Items
            if (isIdSearch && _service.ItemMap.TryGetValue(searchId, out string? iName))
                results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = searchId, Name = iName });

            var iMatches = _service.ItemMap
                .Where(kvp => kvp.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && kvp.Key != searchId)
                .Take(20);
            foreach (var kvp in iMatches)
                results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = kvp.Key, Name = kvp.Value });

            // 3. Search Works (ID & Name)
            // ID Search
            if (isIdSearch && _workIdMap.TryGetValue(searchId, out string? wName))
            {
                // Try to find usages for this work name (with or without @ prefix)
                var usage = _allWorkUsages.FirstOrDefault(u =>
                    u.FlagName.Equals("@" + wName, StringComparison.OrdinalIgnoreCase) ||
                    u.FlagName.Equals(wName, StringComparison.OrdinalIgnoreCase));

                results.Add(new SearchResult
                {
                    Type = "WRK",
                    Color = "#FFD700",
                    Id = searchId,
                    Name = wName,
                    Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new ObservableCollection<FlagLocation>()
                });
            }

            // Name Search
            var wMatches = _allWorkUsages
                .Where(w => w.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase))
                .Take(20);
            foreach (var w in wMatches)
                results.Add(new SearchResult
                {
                    Type = "WRK",
                    Color = "#FFD700",
                    Name = w.FlagName,
                    Locations = new ObservableCollection<FlagLocation>(w.Locations)
                });

            // 4. Search Flags
            var fMatches = _allFlagUsages
                .Where(f => f.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase))
                .Take(20);
            foreach (var f in fMatches)
                results.Add(new SearchResult
                {
                    Type = "FLG",
                    Color = "#50FA7B",
                    Name = f.FlagName,
                    Locations = new ObservableCollection<FlagLocation>(f.Locations)
                });

            // 5. Search Commands
            var cMatches = _allCommandUsages
                .Where(c => c.CommandName.Contains(query, StringComparison.OrdinalIgnoreCase))
                .Take(20);
            foreach (var c in cMatches)
                results.Add(new SearchResult
                {
                    Type = "CMD",
                    Color = "#BD93F9",
                    Name = c.CommandName,
                    Locations = new ObservableCollection<FlagLocation>(c.Locations)
                });

            SearchResultsList.ItemsSource = results;
        }

        // --- Theme Logic ---

        public void BtnTheme_Click(object? sender, RoutedEventArgs e)
        {
            ThemePanel.IsVisible = !ThemePanel.IsVisible;
            if (ThemePanel.IsVisible)
            {
                SearchPanel.IsVisible = false;
                FlagTrackerPanel.IsVisible = false;
                ScriptTrackerPanel.IsVisible = false;
            }
        }

        public async void SaveTheme_Click(object? sender, RoutedEventArgs e)
        {
            var settings = _themeVm.ToSettings();

            string? jsonDir = FindJsonFolder();
            if (string.IsNullOrEmpty(jsonDir))
            {
                StatusText.Text = "Error: JSON folder not found. Cannot save.";
                return;
            }

            string themePath = Path.Combine(jsonDir, "theme.json");

            try
            {
                string json = JsonConvert.SerializeObject(settings, Formatting.Indented);
                File.WriteAllText(themePath, json);

                await InjectTheme(settings);

                StatusText.Text = $"Theme saved to: {Path.GetFileName(themePath)}";
            }
            catch (Exception ex)
            {
                StatusText.Text = "Error saving theme: " + ex.Message;
                System.Diagnostics.Debug.WriteLine(ex);
            }
        }

        private string? FindJsonFolder()
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;

            string sourcePath = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "JSON"));
            if (Directory.Exists(sourcePath)) return sourcePath;

            string localPath = Path.Combine(baseDir, "JSON");
            if (Directory.Exists(localPath)) return localPath;

            string currentPath = Path.Combine(Directory.GetCurrentDirectory(), "JSON");
            if (Directory.Exists(currentPath)) return currentPath;

            return null;
        }

        private async Task InjectTheme(ThemeSettings? directSettings = null)
        {
            try
            {
                ThemeSettings settings = directSettings ?? new ThemeSettings();

                if (directSettings == null)
                {
                    string? jsonDir = FindJsonFolder();
                    if (!string.IsNullOrEmpty(jsonDir))
                    {
                        string themePath = Path.Combine(jsonDir, "theme.json");
                        if (File.Exists(themePath))
                        {
                            try
                            {
                                string content = File.ReadAllText(themePath);
                                settings = JsonConvert.DeserializeObject<ThemeSettings>(content) ?? new ThemeSettings();
                            }
                            catch { }
                        }
                    }
                }

                _themeVm.LoadFromSettings(settings);

                string safeJson = JsonConvert.SerializeObject(settings);
                if (_isEditorReady && Editor != null)
                {
                    await Editor.ExecuteScriptAsync($"if (window.updateRelumiTheme) window.updateRelumiTheme({safeJson});");
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"[MainWindow] Failed to inject theme: {ex.Message}");
            }
        }

        // --- Tracking / Tracker Logic ---

        public void BtnFlags_Click(object? sender, RoutedEventArgs e)
        {
            FlagTrackerPanel.IsVisible = !FlagTrackerPanel.IsVisible;
            if (FlagTrackerPanel.IsVisible)
            {
                SearchPanel.IsVisible = false;
                ScriptTrackerPanel.IsVisible = false;
                ThemePanel.IsVisible = false;
            }
        }

        public void BtnScripts_Click(object? sender, RoutedEventArgs e)
        {
            ScriptTrackerPanel.IsVisible = !ScriptTrackerPanel.IsVisible;
            if (ScriptTrackerPanel.IsVisible)
            {
                SearchPanel.IsVisible = false;
                FlagTrackerPanel.IsVisible = false;
                ThemePanel.IsVisible = false;
            }
        }

        public void RefreshFlags_Click(object? sender, RoutedEventArgs e)
        {
            RefreshFlagsAndWorks();
        }

        public void RefreshScripts_Click(object? sender, RoutedEventArgs e)
        {
            RefreshCommands();
        }

        public void FlagSearchBox_TextChanged(object? sender, TextChangedEventArgs e)
        {
            FilterFlags(FlagSearchBox.Text ?? "");
        }

        public void ScriptSearchBox_TextChanged(object? sender, TextChangedEventArgs e)
        {
            FilterCommands(ScriptSearchBox.Text ?? "");
        }

        private void FilterFlags(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                FlagList.ItemsSource = _allFlagUsages;
                return;
            }

            var lowerQ = query.ToLower();
            var filtered = _allFlagUsages
                .Where(f => f.FlagName.ToLower().Contains(lowerQ))
                .ToList();

            FlagList.ItemsSource = filtered;
        }

        private async Task RefreshFlagsAndWorks()
        {
            StatusText.Text = "Scanner: Indexing Flags and Works...";
            FlagList.ItemsSource = null;

            List<object> nodesToScan = new List<object>();
            if (ScriptTree.ItemsSource is System.Collections.IEnumerable items)
            {
                foreach (var item in items) nodesToScan.Add(item);
            }

            var knownFlags = _service.FlagMap;
            var knownSysFlags = _service.SysFlagMap;

            // Re-load Works into Class-Level Map for ID search
            _workIdMap.Clear();
            string? jsonDir = FindJsonFolder();
            if (!string.IsNullOrEmpty(jsonDir))
            {
                try
                {
                    string workPath = Path.Combine(jsonDir, "work.json");
                    if (File.Exists(workPath))
                    {
                        var content = File.ReadAllText(workPath);
                        // Robust JSON loading using JArray
                        var jArray = JArray.Parse(content);
                        foreach (var item in jArray)
                        {
                            var idTok = item["Id"] ?? item["id"];
                            var nameTok = item["Name"] ?? item["name"];
                            if (idTok != null && nameTok != null)
                            {
                                int id = idTok.Value<int>();
                                string name = nameTok.Value<string>() ?? "";
                                if (!_workIdMap.ContainsKey(id)) _workIdMap.Add(id, name);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"[Scanner] JSON Load Error: {ex.Message}");
                }
            }

            // Capture map for background thread
            var localWorkMap = new Dictionary<int, string>(_workIdMap);

            await Task.Run(() =>
            {
                try
                {
                    // CRITICAL FIX: Use Case-Insensitive Dictionary to match @SCWK_TEMP0 and @scwk_temp0
                    var combinedFlags = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);
                    var combinedWorks = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);

                    // Pre-populate Flags
                    foreach (var kvp in knownFlags)
                    {
                        string raw = kvp.Value;
                        string f = raw.StartsWith("#") ? raw : $"#{raw}";
                        if (!combinedFlags.ContainsKey(f))
                            combinedFlags[f] = new FlagUsageInfo { FlagName = f };
                    }
                    foreach (var kvp in knownSysFlags)
                    {
                        string raw = kvp.Value;
                        string f = raw.StartsWith("$") ? raw : $"${raw}";
                        if (!combinedFlags.ContainsKey(f))
                            combinedFlags[f] = new FlagUsageInfo { FlagName = f };
                    }

                    // Pre-populate Works
                    foreach (var kvp in localWorkMap)
                    {
                        string raw = kvp.Value;
                        string w = raw.StartsWith("@") ? raw : $"@{raw}";
                        if (!combinedWorks.ContainsKey(w))
                            combinedWorks[w] = new FlagUsageInfo { FlagName = w };
                    }

                    // Scan Scripts
                    foreach (var node in nodesToScan)
                    {
                        if (node is FileNode fNode)
                        {
                            int currentLineOffset = 0;
                            foreach (var s in fNode.Scripts)
                            {
                                ScanScriptForFlagsAndWorks(s.Content, fNode.Name, fNode, combinedFlags, combinedWorks, currentLineOffset);
                                var lines = s.Content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
                                currentLineOffset += lines.Length;
                            }
                        }
                        else if (node is ScriptNode sNode)
                        {
                            ScanScriptForFlagsAndWorks(sNode.Content, "Root", sNode, combinedFlags, combinedWorks, 0);
                        }
                    }

                    Dispatcher.UIThread.Post(() =>
                    {
                        _allFlagUsages = combinedFlags.Values
                            .OrderByDescending(f => f.Locations.Count > 0) // Used first
                            .ThenBy(f => f.FlagName)
                            .ToList();

                        _allWorkUsages = combinedWorks.Values
                            .OrderByDescending(w => w.Locations.Count > 0) // Used first
                            .ThenBy(w => w.FlagName)
                            .ToList();

                        if (FlagTrackerPanel.IsVisible)
                            FilterFlags(FlagSearchBox.Text ?? "");

                        StatusText.Text = $"Scanner: Indexed {_allFlagUsages.Count} flags and {_allWorkUsages.Count} works.";
                    });
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"[Scanner] Error: {ex}");
                }
            });
        }

        private void ScanScriptForFlagsAndWorks(string content, string fileName, object nodeObj, Dictionary<string, FlagUsageInfo> flagResults, Dictionary<string, FlagUsageInfo> workResults, int lineOffset)
        {
            var lines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith("//") || line.TrimStart().StartsWith(";")) continue;

                var flagMatches = System.Text.RegularExpressions.Regex.Matches(line, @"([#$][A-Za-z0-9_]+)");
                var workMatches = System.Text.RegularExpressions.Regex.Matches(line, @"(@[A-Za-z0-9_]+)");

                string command = "UNK";
                var cmdMatch = System.Text.RegularExpressions.Regex.Match(line.Trim(), @"^([A-Z_][A-Z0-9_]*)");
                if (cmdMatch.Success) command = cmdMatch.Groups[1].Value;

                foreach (System.Text.RegularExpressions.Match m in flagMatches)
                {
                    string fullFlag = m.Value;
                    if (!flagResults.ContainsKey(fullFlag)) flagResults[fullFlag] = new FlagUsageInfo { FlagName = fullFlag };

                    flagResults[fullFlag].Locations.Add(new FlagLocation
                    {
                        LineNumber = i + 1 + lineOffset,
                        Command = command,
                        Content = line.Trim(),
                        FileName = fileName,
                        NodeObject = nodeObj
                    });
                }

                foreach (System.Text.RegularExpressions.Match m in workMatches)
                {
                    string fullWork = m.Value;
                    if (!workResults.ContainsKey(fullWork)) workResults[fullWork] = new FlagUsageInfo { FlagName = fullWork };

                    workResults[fullWork].Locations.Add(new FlagLocation
                    {
                        LineNumber = i + 1 + lineOffset,
                        Command = command,
                        Content = line.Trim(),
                        FileName = fileName,
                        NodeObject = nodeObj
                    });
                }
            }
        }

        private void InitializeBlockly()
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string blocklyPath = Path.Combine(appDir, "Assets", "Blockly", "index.html");
            if (!File.Exists(blocklyPath)) blocklyPath = Path.Combine(appDir, "Blockly", "index.html");

            if (File.Exists(blocklyPath))
            {
                BlockEditor.Url = new Uri($"file:///{blocklyPath.Replace("\\", "/")}");
                BlockEditor.NavigationCompleted += (sender, args) => { if (args.IsSuccess) _isBlocklyReady = true; };
                BlockEditor.WebMessageReceived += (s, e) => { _currentScriptContent = e.Message ?? ""; };
            }
        }

        private string LoadCleanJson(string path)
        {
            if (!File.Exists(path))
            {
                System.Diagnostics.Debug.WriteLine($"[MainWindow] JSON file not found: {path}");
                return "[]";
            }
            try
            {
                var content = File.ReadAllText(path);
                var deserialized = JsonConvert.DeserializeObject(content);
                return JsonConvert.SerializeObject(deserialized, Formatting.None);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"[MainWindow] Failed to load JSON from {path}: {ex.Message}");
                return "[]";
            }
        }

        private async Task GenerateAndInjectSyntax()
        {
            try
            {
                string? jsonDir = FindJsonFolder();
                if (string.IsNullOrEmpty(jsonDir))
                {
                    System.Diagnostics.Debug.WriteLine("[MainWindow] JSON folder not found");
                    return;
                }

                if (_service.InitSummary.Contains("Cmds: 0"))
                {
                    _service.Initialize(jsonDir);
                    TryInitMessageRenderer();
                }

                await Task.Run(() =>
                {
                    string cmds = LoadCleanJson(Path.Combine(jsonDir, "commands.json"));
                    string flags = LoadCleanJson(Path.Combine(jsonDir, "flags.json"));
                    string sys = LoadCleanJson(Path.Combine(jsonDir, "sys_flags.json"));
                    string work = LoadCleanJson(Path.Combine(jsonDir, "work.json"));
                    string pokes = JsonConvert.SerializeObject(_service.PokemonMap, Formatting.None);
                    string items = JsonConvert.SerializeObject(_service.ItemMap, Formatting.None);

                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string monacoPath = Path.Combine(appDir, "Monaco", "syntax_data.js");
                    string content = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: {flags}, sysflags: {sys}, works: {work}, pokes: {pokes}, items: {items} }}; window.RELUMI_DATA_LOADED = true;";
                    File.WriteAllText(monacoPath, content, Encoding.UTF8);
                });

                if (_isEditorReady && Editor != null)
                {
                    try
                    {
                        await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");
                    }
                    catch (Exception ex)
                    {
                        System.Diagnostics.Debug.WriteLine($"[MainWindow] Failed to inject syntax: {ex.Message}");
                    }
                }

                if (!_service.InitSummary.Contains("Cmds: 0"))
                    Dispatcher.UIThread.Post(() => { StatusText.Text = $"Ready. Backend: {_service.InitSummary}"; });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"[MainWindow] GenerateAndInjectSyntax error: {ex.Message}");
                Dispatcher.UIThread.Post(() => { StatusText.Text = "Init Error: " + ex.Message; });
            }
        }

        public void OnTabChanged(object? sender, RoutedEventArgs e)
        {
            bool codeMode = TabCode.IsChecked == true;
            Editor.IsVisible = codeMode;
            BlockEditor.IsVisible = !codeMode;
            SetEditorText(_currentScriptContent);
        }

        private async void SetEditorText(string content)
        {
            _currentScriptContent = content ?? string.Empty;
            if (FlagTrackerPanel.IsVisible) UpdateFlagUi(_currentScriptContent);

            string safe = JsonConvert.ToString(_currentScriptContent);
            if (_isEditorReady && Editor != null)
            {
                try
                {
                    string jsCommand = $"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe});";
                    await Editor.ExecuteScriptAsync(jsCommand);
                    await Editor.ExecuteScriptAsync("editor.updateOptions({readOnly: false});");
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"[MainWindow] Failed to set editor text: {ex.Message}");
                }
            }
            if (_isBlocklyReady && BlockEditor.IsVisible && BlockEditor != null)
            {
                try
                {
                    await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"[MainWindow] Failed to set Blockly text: {ex.Message}");
                }
            }
        }

        private void UpdateFlagUi(string content)
        {
        }

        private string? FindFileInStructure(string root, string[] segments)
        {
            string full = Path.Combine(root, Path.Combine(segments));
            if (File.Exists(full)) return full;
            for (int i = 1; i < segments.Length; i++)
            {
                string partial = Path.Combine(root, Path.Combine(segments.Skip(i).ToArray()));
                if (File.Exists(partial)) return partial;
            }
            try { return Directory.EnumerateFiles(root, segments.Last(), SearchOption.AllDirectories).FirstOrDefault(); } catch { return null; }
        }

        public async void BtnLoad_Click(object? sender, RoutedEventArgs e)
        {
            var topLevel = Avalonia.Controls.TopLevel.GetTopLevel(this);
            if (topLevel == null) return;
            var folders = await topLevel.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions { AllowMultiple = false, Title = "Select Dump Folder" });
            if (folders.Count == 0) return;

            StatusText.Text = "Scanning...";
            var rootPath = folders[0].Path.LocalPath;

            string? evScriptPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Dpr", "ev_script" });
            string? pokemonMsgPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Message", "common_msbt" });
            string? scriptMsgPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Message", "english" });

            if (string.IsNullOrEmpty(evScriptPath)) { StatusText.Text = "Error: 'ev_script' not found."; return; }

            if (_service.InitSummary.Contains("Cmds: 0"))
            {
                string? jsonDir = FindJsonFolder();
                if (!string.IsNullOrEmpty(jsonDir)) _service.Initialize(jsonDir);
            }

            if (!string.IsNullOrEmpty(pokemonMsgPath))
            {
                await Task.Run(() => _service.LoadGameData(pokemonMsgPath));
                await GenerateAndInjectSyntax();
            }

            var loadedScripts = await Task.Run(() => _service.LoadAndDecompile(evScriptPath));

            if (!string.IsNullOrEmpty(scriptMsgPath))
            {
                _loadedMessages = await Task.Run(() => _service.LoadMessageFiles(scriptMsgPath));
            }

            ScriptTree.ItemsSource = loadedScripts.OrderBy(x => x.Name).ToList();
            StatusText.Text = $"Loaded {loadedScripts.Count} scripts. ({_loadedMessages.Count} message files ready)";

            // Trigger Indexing
            RefreshAllTrackers();
        }

        public void ScriptTree_SelectionChanged(object? sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode s)
            {
                SetEditorText(s.Content);
            }
            else if (ScriptTree.SelectedItem is FileNode f)
            {
                StringBuilder sb = new StringBuilder();
                foreach (var script in f.Scripts) { sb.AppendLine(script.Content); }
                SetEditorText(sb.ToString());
            }
        }

        public async void JumpToLocation_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Control c && c.Tag is FlagLocation loc)
            {
                if (loc.NodeObject != null)
                {
                    ScriptTree.SelectedItem = loc.NodeObject;
                }

                await Task.Delay(150);
                if (_isEditorReady && Editor != null)
                {
                    string script = $"editor.revealLineInCenter({loc.LineNumber}); editor.setPosition({{lineNumber: {loc.LineNumber}, column: 1}}); editor.focus();";
                    try
                    {
                        await Editor.ExecuteScriptAsync(script);
                    }
                    catch (Exception ex)
                    {
                        System.Diagnostics.Debug.WriteLine($"[MainWindow] Failed to jump to line: {ex.Message}");
                    }
                }
            }
        }

        // --- Helper Classes for JSON Serialization ---

        public class ThemeSettings
        {
            public ThemeColors Colors { get; set; } = new ThemeColors();
            public SyntaxTheme Syntax { get; set; } = new SyntaxTheme();
        }

        public class ThemeColors
        {
            public string Background { get; set; } = "#FF282A36";
            public string Foreground { get; set; } = "#FFF8F8F2";
        }

        public class SyntaxTheme
        {
            public TokenStyle ScriptLabel { get; set; } = new TokenStyle { Color = "#FF569CD6", Style = "bold" };
            public TokenStyle WorkVar { get; set; } = new TokenStyle { Color = "#FFFFD700" };
            public TokenStyle Flag { get; set; } = new TokenStyle { Color = "#FF50FA7B" };
            public TokenStyle SysFlag { get; set; } = new TokenStyle { Color = "#FF8BE9FD", Style = "italic" };
            public TokenStyle Command { get; set; } = new TokenStyle { Color = "#FFBD93F9", Style = "bold" };
            public TokenStyle Number { get; set; } = new TokenStyle { Color = "#FFFFB86C" };
            public TokenStyle String { get; set; } = new TokenStyle { Color = "#FFF1FA8C" };
            public TokenStyle Comment { get; set; } = new TokenStyle { Color = "#FF6272A4" };
        }

        public class TokenStyle
        {
            public string Color { get; set; } = "";
            public string Style { get; set; } = "";
        }

        // --- View Model for Avalonia Bindings ---

        public class ThemeEditorViewModel : System.ComponentModel.INotifyPropertyChanged
        {
            public ThemeColorsVM Colors { get; set; } = new ThemeColorsVM();
            public SyntaxThemeVM Syntax { get; set; } = new SyntaxThemeVM();

            public event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;

            public void LoadFromSettings(ThemeSettings s)
            {
                if (Color.TryParse(s.Colors.Background, out var bg)) Colors.BackgroundColor = bg;
                if (Color.TryParse(s.Colors.Foreground, out var fg)) Colors.ForegroundColor = fg;

                Syntax.ScriptLabel.Load(s.Syntax.ScriptLabel);
                Syntax.WorkVar.Load(s.Syntax.WorkVar);
                Syntax.Flag.Load(s.Syntax.Flag);
                Syntax.SysFlag.Load(s.Syntax.SysFlag);
                Syntax.Command.Load(s.Syntax.Command);
                Syntax.Number.Load(s.Syntax.Number);
                Syntax.String.Load(s.Syntax.String);
                Syntax.Comment.Load(s.Syntax.Comment);
            }

            public ThemeSettings ToSettings()
            {
                return new ThemeSettings
                {
                    Colors = new ThemeColors
                    {
                        Background = ThemeColorsVM.ToHex(Colors.BackgroundColor),
                        Foreground = ThemeColorsVM.ToHex(Colors.ForegroundColor)
                    },
                    Syntax = new SyntaxTheme
                    {
                        ScriptLabel = Syntax.ScriptLabel.ToModel(),
                        WorkVar = Syntax.WorkVar.ToModel(),
                        Flag = Syntax.Flag.ToModel(),
                        SysFlag = Syntax.SysFlag.ToModel(),
                        Command = Syntax.Command.ToModel(),
                        Number = Syntax.Number.ToModel(),
                        String = Syntax.String.ToModel(),
                        Comment = Syntax.Comment.ToModel()
                    }
                };
            }
        }

        public class ThemeColorsVM : System.ComponentModel.INotifyPropertyChanged
        {
            private Color _bg = Color.Parse("#FF282A36");
            public Color BackgroundColor
            {
                get => _bg;
                set { _bg = value; OnPropertyChanged(nameof(BackgroundColor)); }
            }

            private Color _fg = Color.Parse("#FFF8F8F2");
            public Color ForegroundColor
            {
                get => _fg;
                set { _fg = value; OnPropertyChanged(nameof(ForegroundColor)); }
            }

            // Helper to get formatted hex string
            public static string ToHex(Color c)
            {
                if (c.A == 255)
                    return $"#{c.R:X2}{c.G:X2}{c.B:X2}";
                return $"#{c.A:X2}{c.R:X2}{c.G:X2}{c.B:X2}";
            }

            public event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
            protected void OnPropertyChanged(string name) => PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(name));
        }

        public class SyntaxThemeVM
        {
            public TokenStyleVM ScriptLabel { get; set; } = new TokenStyleVM();
            public TokenStyleVM WorkVar { get; set; } = new TokenStyleVM();
            public TokenStyleVM Flag { get; set; } = new TokenStyleVM();
            public TokenStyleVM SysFlag { get; set; } = new TokenStyleVM();
            public TokenStyleVM Command { get; set; } = new TokenStyleVM();
            public TokenStyleVM Number { get; set; } = new TokenStyleVM();
            public TokenStyleVM String { get; set; } = new TokenStyleVM();
            public TokenStyleVM Comment { get; set; } = new TokenStyleVM();
        }

        public class TokenStyleVM : System.ComponentModel.INotifyPropertyChanged
        {
            private Color _color = Avalonia.Media.Colors.White;
            public Color Color
            {
                get => _color;
                set
                {
                    _color = value;
                    OnPropertyChanged(nameof(Color));
                    OnPropertyChanged(nameof(Brush));
                }
            }

            public ISolidColorBrush Brush => new SolidColorBrush(Color);

            private bool _bold;
            public bool IsBold { get => _bold; set { _bold = value; NotifyStyle(); } }

            private bool _italic;
            public bool IsItalic { get => _italic; set { _italic = value; NotifyStyle(); } }

            public Avalonia.Media.FontWeight Weight => IsBold ? Avalonia.Media.FontWeight.Bold : Avalonia.Media.FontWeight.Normal;
            public Avalonia.Media.FontStyle FontStyle => IsItalic ? Avalonia.Media.FontStyle.Italic : Avalonia.Media.FontStyle.Normal;

            private void NotifyStyle()
            {
                OnPropertyChanged(nameof(IsBold));
                OnPropertyChanged(nameof(IsItalic));
                OnPropertyChanged(nameof(Weight));
                OnPropertyChanged(nameof(FontStyle));
            }

            public void Load(TokenStyle s)
            {
                if (!string.IsNullOrEmpty(s.Color) && Color.TryParse(s.Color, out var c)) Color = c;

                string st = s.Style ?? "";
                IsBold = st.Contains("bold");
                IsItalic = st.Contains("italic");
            }

            public TokenStyle ToModel()
            {
                var parts = new List<string>();
                if (IsBold) parts.Add("bold");
                if (IsItalic) parts.Add("italic");

                return new TokenStyle
                {
                    Color = ThemeColorsVM.ToHex(Color),
                    Style = string.Join(" ", parts)
                };
            }

            public event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
            protected void OnPropertyChanged(string name) => PropertyChanged?.Invoke(this, new System.ComponentModel.PropertyChangedEventArgs(name));
        }
    }
}