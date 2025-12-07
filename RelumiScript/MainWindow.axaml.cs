using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Platform.Storage;
using AvaloniaWebView;
using Newtonsoft.Json;
using WebViewCore.Events;

namespace RelumiScript
{
    public class SearchResult
    {
        public string Type { get; set; } = "UNK"; // PKM, ITM
        public string Color { get; set; } = "White";
        public int Id { get; set; }
        public string Name { get; set; } = "";
    }

    public partial class MainWindow : Avalonia.Controls.Window
    {
        private AssetBundleService _service;
        private MessageRenderer? _messageRenderer;
        private bool _isEditorReady = false;
        private bool _isBlocklyReady = false;
        private string _currentScriptContent = "";

        private List<FileNode> _loadedMessages = new List<FileNode>();

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
            string script = @"
                editor.onDidChangeCursorPosition((e) => {
                    var model = editor.getModel();
                    var lineContent = model.getLineContent(e.position.lineNumber);
                    var match = lineContent.match(/_TALKMSG\s*\(\s*@([^%]+)%([^)]+)\s*\)/);
                    if (match) {
                        window.chrome.webview.postMessage('PREVIEW:' + match[1] + '%' + match[2]);
                    } else {
                        window.chrome.webview.postMessage('HIDE_PREVIEW');
                    }
                });
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

        // --- Search Logic ---

        private void BtnSearch_Click(object? sender, RoutedEventArgs e)
        {
            SearchPanel.IsVisible = !SearchPanel.IsVisible;
            if (SearchPanel.IsVisible)
            {
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
                    // Embed both maps for JS autocomplete if needed
                    string pokes = JsonConvert.SerializeObject(_service.PokemonMap, Formatting.None);
                    string items = JsonConvert.SerializeObject(_service.ItemMap, Formatting.None);

                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string monacoPath = Path.Combine(appDir, "Monaco", "syntax_data.js");
                    string content = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: {flags}, sysflags: {sys}, works: {work}, pokes: {pokes}, items: {items} }}; window.RELUMI_DATA_LOADED = true;";
                    File.WriteAllText(monacoPath, content, Encoding.UTF8);
                });

                if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");

                if (!_service.InitSummary.Contains("Cmds: 0"))
                    Avalonia.Threading.Dispatcher.UIThread.Post(() => { StatusText.Text = $"Ready. Backend: {_service.InitSummary}"; });
            }
            catch (Exception ex) { Avalonia.Threading.Dispatcher.UIThread.Post(() => { StatusText.Text = "Init Error: " + ex.Message; }); }
        }

        private void OnTabChanged(object? sender, RoutedEventArgs e)
        {
            bool codeMode = TabCode.IsChecked == true;
            Editor.IsVisible = codeMode;
            BlockEditor.IsVisible = !codeMode;
            SetEditorText(_currentScriptContent);
        }

        private async void SetEditorText(string content)
        {
            _currentScriptContent = content;
            string safe = JsonConvert.ToString(content);
            if (_isEditorReady)
            {
                string jsCommand = $"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe});";
                await Editor.ExecuteScriptAsync(jsCommand);
                await Editor.ExecuteScriptAsync("editor.updateOptions({readOnly: false});");
            }
            if (_isBlocklyReady && BlockEditor.IsVisible) await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
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
                // Changed from LoadPokemonData to LoadGameData
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