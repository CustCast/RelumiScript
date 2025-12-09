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
using WebViewCore.Events;

namespace RelumiScript
{
    // Helper class for search results
    public class SearchResult
    {
        public string Type { get; set; } = "UNK"; // PKM, ITM
        public string Color { get; set; } = "White";
        public int Id { get; set; }
        public string Name { get; set; } = "";
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
        public string FileName { get; set; } = "";     // For display/logic
        public object NodeObject { get; set; }         // For navigation (FileNode or ScriptNode)
    }

    // FIX: Explicitly inherit from Avalonia.Controls.Window to avoid GTK conflict
    public partial class MainWindow : Avalonia.Controls.Window
    {
        private AssetBundleService _service;
        private MessageRenderer? _messageRenderer;
        
        private bool _isEditorReady = false;
        private bool _isBlocklyReady = false;
        
        private string _currentScriptContent = "";
        private List<FileNode> _loadedMessages = new List<FileNode>();
        
        // Caches for search
        private List<FlagUsageInfo> _allFlagUsages = new List<FlagUsageInfo>();
        private List<CommandUsageInfo> _allCommandUsages = new List<CommandUsageInfo>();

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

// ... [Constructor and other methods unchanged] ...

        private async void RefreshCommands()
        {
            StatusText.Text = "Command Tracker: Scanning...";
            // Note: UI List name will change later
            // ScriptList.ItemsSource = null; 

            List<object> nodesToScan = new List<object>();
            if (ScriptTree.ItemsSource is System.Collections.IEnumerable items)
            {
                foreach (var item in items) nodesToScan.Add(item);
            }

            await Task.Run(() =>
            {
                var combinedResults = new Dictionary<string, CommandUsageInfo>();

                foreach (var node in nodesToScan)
                {
                    if (node is FileNode fNode)
                    {
                        int offset = 0;
                        foreach (var s in fNode.Scripts)
                        {
                            ScanForCommands(s.Content, fNode.Name, fNode, combinedResults, offset);
                            var lines = s.Content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
                            offset += lines.Length + 1;
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
                        .OrderBy(c => c.CommandName)
                        .ToList();

                    FilterCommands(ScriptSearchBox.Text); // Reusing search box binding for now
                    StatusText.Text = $"Command Tracker: Found {_allCommandUsages.Count} unique commands.";
                });
            });
        }

        private void ScanForCommands(string content, string fileName, object nodeObj, Dictionary<string, CommandUsageInfo> results, int lineOffset)
        {
            var lines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith("//") || line.TrimStart().StartsWith(";")) continue;
                
                // Identify Command: First word of the line
                var match = System.Text.RegularExpressions.Regex.Match(line.Trim(), @"^([A-Za-z0-9_]+)");
                if (match.Success)
                {
                    string cmd = match.Groups[1].Value;
                    
                    // Filter out likely labels (definitions often end in :)
                    // But here we are just looking for the first word. Labels ARE parsed as first word.
                    // If it ends with ':', it's a label def.
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
                ScriptList.ItemsSource = _allCommandUsages; // Reusing List
                return;
            }
            var lowerQ = query.ToLower();
            ScriptList.ItemsSource = _allCommandUsages.Where(c => c.CommandName.ToLower().Contains(lowerQ)).ToList();
        }

        private void SelectCommandInList(string commandName)
        {
             if (!ScriptTrackerPanel.IsVisible || _allCommandUsages.Count == 0) return;

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

        public MainWindow()
        {
            InitializeComponent();
            _service = new AssetBundleService();
            InitializeEditor();
            InitializeBlockly();
            TryInitMessageRenderer();
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
                    }
                };
            }
            else StatusText.Text = $"Error: Monaco not found at {monacoPath}";
        }

        private async Task InjectMonacoListeners()
        {
            // FIX: Removed cursor movement listener
            // ADDED: Context menu "Look Up"
            string script = @"
                // 1. Message Preview (Keep this one? Or remove if unnecessary? Let's keep it for now but maybe context menu it too?)
                // Actually user said 'Also the peek functionality... For both of them, can we add a right click Look Up'.
                // So auto-peek might be annoying if it pops up everywhere. But let's keep it for now unless requested.

                // 2. Context Menu Action: Look Up
                var lookupAction = {
                    id: 'relumi-lookup',
                    label: 'Look Up',
                    contextMenuGroupId: 'navigation',
                    contextMenuOrder: 1.5,
                    run: function(ed) {
                        var pos = ed.getPosition();
                        var model = ed.getModel();
                        var wordInfo = model.getWordAtPosition(pos);
                        
                        if (wordInfo) {
                           var word = wordInfo.word;
                           // Check for Flag prefix
                           var lineContent = model.getLineContent(pos.lineNumber);
                           // var charBefore = lineContent.charAt(wordInfo.startColumn - 2); // 1-based minus 2? 
                           // Word start column is 1-based.
                           // If word starts at 5. Char at index 4 is the first char of word. Char at index 3 is charBefore.
                           
                           var charBefore = '';
                           if (wordInfo.startColumn > 1) {
                               charBefore = lineContent.charAt(wordInfo.startColumn - 2);
                           }

                           if (charBefore === '#' || charBefore === '$') {
                               window.chrome.webview.postMessage('LOOKUP_FLAG:' + charBefore + word);
                           } else {
                               // Assuming Command or Label
                               window.chrome.webview.postMessage('LOOKUP_CMD:' + word);
                           }
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

            if (msg.StartsWith("FLAG_SELECTED:") || msg.StartsWith("LOOKUP_FLAG:"))
            {
                string flagName = msg.Substring(msg.IndexOf(':') + 1).Trim();
                FlagTrackerPanel.IsVisible = true;
                SearchPanel.IsVisible = false;
                ScriptTrackerPanel.IsVisible = false;
                SelectFlagInList(flagName);
                return;
            }

            if (msg.StartsWith("LOOKUP_CMD:"))
            {
                string cmdName = msg.Substring(11).Trim();
                ScriptTrackerPanel.IsVisible = true;
                SearchPanel.IsVisible = false;
                FlagTrackerPanel.IsVisible = false;
                SelectCommandInList(cmdName);
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
             if (!FlagTrackerPanel.IsVisible || _allFlagUsages.Count == 0)
            {
                 if (!FlagTrackerPanel.IsVisible) return;
            }

            // Fuzzy match (ignore case)
            var target = _allFlagUsages.FirstOrDefault(f => f.FlagName.Equals(flagName, StringComparison.OrdinalIgnoreCase));
            if (target != null)
            {
                // Unfilter if hidden by filter
                if (FlagList.Items.Count != _allFlagUsages.Count && !FlagList.Items.Contains(target))
                {
                     FlagSearchBox.Text = ""; // clear filter to show all
                }

                // Defer logic to allow UI to update
                Dispatcher.UIThread.Post(() => 
                {
                    target.IsExpanded = true;
                    
                    // Defer Scroll again to ensure Layout updated
                    // Use ApplicationIdle to wait for all rendering/layout passes
                    Dispatcher.UIThread.Post(() =>
                    {
                        try
                        {
                            FlagList.ScrollIntoView(target);
                            FlagList.SelectedItem = target;
                        }
                        catch { /* Ignore scroll errors */ }
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
                    MessagePreviewContainer.IsVisible = true;
                    if (MainContentGrid.RowDefinitions.Count > 3)
                        MainContentGrid.RowDefinitions[3].Height = GridLength.Auto;

                    MessagePreviewContent.Content = _messageRenderer.Render(targetScript.Content);
                    StatusText.Text = $"Previewing: {label}";
                }
            }
        }

        // --- Flag Tracker Logic ---

        private void BtnFlags_Click(object? sender, RoutedEventArgs e)
        {
            FlagTrackerPanel.IsVisible = !FlagTrackerPanel.IsVisible;
            if (FlagTrackerPanel.IsVisible)
            {
                SearchPanel.IsVisible = false;
                ScriptTrackerPanel.IsVisible = false;
                RefreshFlags();
            }
        }

        private void BtnScripts_Click(object? sender, RoutedEventArgs e)
        {
            ScriptTrackerPanel.IsVisible = !ScriptTrackerPanel.IsVisible;
            if (ScriptTrackerPanel.IsVisible)
            {
                 SearchPanel.IsVisible = false;
                 FlagTrackerPanel.IsVisible = false;
                 RefreshCommands(); // Renamed
            }
        }

        private void RefreshFlags_Click(object? sender, RoutedEventArgs e)
        {
            RefreshFlags();
        }

        private void RefreshScripts_Click(object? sender, RoutedEventArgs e)
        {
            RefreshCommands(); // Renamed
        }

        private void FlagSearchBox_TextChanged(object? sender, TextChangedEventArgs e)
        {
            FilterFlags(FlagSearchBox.Text);
        }

        private void ScriptSearchBox_TextChanged(object? sender, TextChangedEventArgs e)
        {
            FilterCommands(ScriptSearchBox.Text); // Renamed
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

        private async void RefreshFlags()
        {
            StatusText.Text = "Flag Tracker: Scanning...";
            FlagList.ItemsSource = null;

            // Capture data on UI thread to avoid cross-thread exception
            List<object> nodesToScan = new List<object>();

            if (ScriptTree.ItemsSource is System.Collections.IEnumerable items)
            {
                foreach (var item in items)
                {
                    nodesToScan.Add(item);
                }
            }

            // Capture Maps for pre-population
            var knownFlags = _service.FlagMap;
            var knownSysFlags = _service.SysFlagMap;

            await Task.Run(() => 
            {
                var combinedResults = new Dictionary<string, FlagUsageInfo>();

                // 1. Pre-populate with all known flags
                foreach (var kvp in knownFlags) 
                {
                    // FIX: Ensure no double ## if the value already has one
                    string raw = kvp.Value;
                    string f = raw.StartsWith("#") ? raw : $"#{raw}";
                    combinedResults[f] = new FlagUsageInfo { FlagName = f };
                }
                foreach (var kvp in knownSysFlags) 
                {
                    string raw = kvp.Value;
                    string f = raw.StartsWith("$") ? raw : $"${raw}";
                    combinedResults[f] = new FlagUsageInfo { FlagName = f };
                }
                
                // 2. Scan Scripts
                foreach (var node in nodesToScan)
                {
                    if (node is FileNode fNode) // Folder/File containing scripts
                    {
                        int currentLineOffset = 0;
                        foreach (var s in fNode.Scripts) 
                        {
                            // Pass the current offset to ScanScript
                            ScanScript(s.Content, fNode.Name, fNode, combinedResults, currentLineOffset);
                            
                            // Calculate new offset: content lines + 1 blank line (as per SelectionChanged logic)
                            var lines = s.Content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
                            currentLineOffset += lines.Length + 1; 
                        }
                    }
                    else if (node is ScriptNode sNode) // Root level script?
                    {
                         ScanScript(sNode.Content, "Root", sNode, combinedResults, 0);
                    }
                }
                 
                // Update UI on main thread
                Dispatcher.UIThread.Post(() => 
                {
                    // Sort: Unused (Count=0) first, then Alphabetical
                    _allFlagUsages = combinedResults.Values
                        .OrderBy(f => f.Locations.Count > 0) // False (Unused) comes before True (Used)
                        .ThenBy(f => f.FlagName)
                        .ToList();

                    FilterFlags(FlagSearchBox.Text);
                    
                    int usedCount = _allFlagUsages.Count(f => f.Locations.Count > 0);
                    StatusText.Text = $"Flag Tracker: Found {usedCount} used / {_allFlagUsages.Count} total.";
                });
            });
        }

        private void ScanScript(string content, string fileName, object nodeObj, Dictionary<string, FlagUsageInfo> results, int lineOffset)
        {
            var lines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith("//") || line.TrimStart().StartsWith(";")) continue;

                var flagMatches = System.Text.RegularExpressions.Regex.Matches(line, @"([#$][A-Za-z0-9_]+)");
                if (flagMatches.Count == 0) continue;

                string command = "UNK";
                var cmdMatch = System.Text.RegularExpressions.Regex.Match(line.Trim(), @"^([A-Z_][A-Z0-9_]*)");
                if (cmdMatch.Success) command = cmdMatch.Groups[1].Value;

                foreach (System.Text.RegularExpressions.Match m in flagMatches)
                {
                    string fullFlag = m.Value; // Regex ensures it starts with # or $
                    if (!results.ContainsKey(fullFlag)) results[fullFlag] = new FlagUsageInfo { FlagName = fullFlag };
                    
                    results[fullFlag].Locations.Add(new FlagLocation
                    {
                        LineNumber = i + 1 + lineOffset, // Apply offset
                        Command = command,
                        Content = line.Trim(),
                        FileName = fileName,
                        NodeObject = nodeObj
                    });
                }
            }
        }

        private async void RefreshScripts()
        {
            StatusText.Text = "Script Tracker: Scanning...";
            ScriptList.ItemsSource = null;

            List<object> nodesToScan = new List<object>();

        }








        private async void JumpToLocation_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Control c && c.Tag is FlagLocation loc)
            {
                // 1. Switch to the file
                if (loc.NodeObject != null)
                {
                    // Manually select it in the tree
                    ScriptTree.SelectedItem = loc.NodeObject;
                    
                    // Force Editor update immediately if possible, but SelectionChanged should handle it
                    // Give it a moment to render
                }
                
                // 2. Jump to line
                await Task.Delay(150); // Small delay for WebView to load new content
                if (_isEditorReady)
                {
                    string script = $"editor.revealLineInCenter({loc.LineNumber}); editor.setPosition({{lineNumber: {loc.LineNumber}, column: 1}}); editor.focus();";
                    await Editor.ExecuteScriptAsync(script);
                }
            }
        }

        // --- Search Logic ---

        private void BtnSearch_Click(object? sender, RoutedEventArgs e)
        {
            SearchPanel.IsVisible = !SearchPanel.IsVisible;
            if (SearchPanel.IsVisible)
            {
                FlagTrackerPanel.IsVisible = false;
                SearchBox.Focus();
                PerformSearch(SearchBox.Text);
            }
        }

        private void SearchBox_TextChanged(object? sender, TextChangedEventArgs e)
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

            SearchResultsList.ItemsSource = results;
        }

        // --- Standard Logic ---

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

        private string? FindJsonFolder()
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string[] candidates = { Path.Combine(baseDir, "JSON"), Path.Combine(baseDir, "..", "..", "..", "JSON"), Path.Combine(Directory.GetCurrentDirectory(), "JSON") };
            foreach (var path in candidates) { if (Directory.Exists(path) && File.Exists(Path.Combine(path, "commands.json"))) return Path.GetFullPath(path); }
            return null;
        }

        private string LoadCleanJson(string path)
        {
            if (!File.Exists(path)) return "[]";
            try { return JsonConvert.SerializeObject(JsonConvert.DeserializeObject(File.ReadAllText(path)), Formatting.None); } catch { return "[]"; }
        }

        private async Task GenerateAndInjectSyntax()
        {
            try
            {
                string? jsonDir = FindJsonFolder();
                if (string.IsNullOrEmpty(jsonDir)) return;

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

                if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");

                if (!_service.InitSummary.Contains("Cmds: 0"))
                    Dispatcher.UIThread.Post(() => { StatusText.Text = $"Ready. Backend: {_service.InitSummary}"; });
            }
            catch (Exception ex) { Dispatcher.UIThread.Post(() => { StatusText.Text = "Init Error: " + ex.Message; }); }
        }

        private void OnTabChanged(object? sender, RoutedEventArgs e)
        {
            bool codeMode = TabCode.IsChecked == true;
            Editor.IsVisible = codeMode;
            BlockEditor.IsVisible = !codeMode;
            SetEditorText(_currentScriptContent);
            
            // Refresh flags if panel is open
            if (FlagTrackerPanel.IsVisible) RefreshFlags();
        }

        private async void SetEditorText(string content)
        {
            _currentScriptContent = content;
            if (FlagTrackerPanel.IsVisible) UpdateFlagUi(content); // Direct update since we have source of truth
            
            string safe = JsonConvert.ToString(content);
            if (_isEditorReady)
            {
                string jsCommand = $"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe});";
                await Editor.ExecuteScriptAsync(jsCommand);
                await Editor.ExecuteScriptAsync("editor.updateOptions({readOnly: false});");
            }
            if (_isBlocklyReady && BlockEditor.IsVisible) await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
        }

        private void UpdateFlagUi(string content)
        {
             // Optional logic to update flags in real-time for CURRENT file only
             // But we are focusing on global search, so we might skip this or implement partial update
             // For now, let's just leave it empty or minimal to avoid conflicting with global search logic
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

        private async void BtnLoad_Click(object? sender, RoutedEventArgs e)
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
        }

        private void ScriptTree_SelectionChanged(object? sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode s)
            {
                SetEditorText(s.Content);
            }
            else if (ScriptTree.SelectedItem is FileNode f)
            {
                StringBuilder sb = new StringBuilder();
                foreach (var script in f.Scripts) { sb.AppendLine(script.Content); sb.AppendLine(); }
                SetEditorText(sb.ToString());
            }
        }
    }
}
