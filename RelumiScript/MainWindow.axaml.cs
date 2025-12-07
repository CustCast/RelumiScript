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
    public partial class MainWindow : Window
    {
        private AssetBundleService _service;
        private MessageRenderer _messageRenderer;
        private bool _isEditorReady = false;
        private bool _isBlocklyReady = false;
        private string _currentScriptContent = "";

        // Track if we are currently forcing the preview pane open
        private bool _isPreviewActive = false;

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
            string jsonDir = FindJsonFolder();
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

                // 1. Listen for messages from Monaco
                Editor.WebMessageReceived += OnEditorMessageReceived;

                Editor.NavigationCompleted += async (sender, args) =>
                {
                    if (args.IsSuccess)
                    {
                        _isEditorReady = true;
                        await GenerateAndInjectSyntax();
                        // 2. Inject the click listener
                        await InjectMonacoListeners();
                    }
                };
            }
            else StatusText.Text = $"Error: Monaco not found at {monacoPath}";
        }

        // --- NEW: Inject JS Listener ---
        private async Task InjectMonacoListeners()
        {
            string script = @"
                editor.onDidChangeCursorPosition((e) => {
                    var model = editor.getModel();
                    var lineContent = model.getLineContent(e.position.lineNumber);
                    // Match pattern: _TALKMSG(@filename%labelname)
                    var match = lineContent.match(/_TALKMSG\s*\(\s*@([^%]+)%([^)]+)\s*\)/);
                    if (match) {
                        // Send 'PREVIEW:filename%labelname' to C#
                        window.chrome.webview.postMessage('PREVIEW:' + match[1] + '%' + match[2]);
                    } else {
                        // Send 'HIDE' to close preview if not on a message line
                        window.chrome.webview.postMessage('HIDE_PREVIEW');
                    }
                });
            ";
            await Editor.ExecuteScriptAsync(script);
        }

        // --- NEW: Handle Message from Monaco ---
        private void OnEditorMessageReceived(object sender, WebViewMessageReceivedEventArgs e)
        {
            string msg = e.Message;
            if (string.IsNullOrEmpty(msg)) return;

            if (msg == "HIDE_PREVIEW")
            {
                if (_isPreviewActive)
                {
                    _isPreviewActive = false;
                    MessagePreviewScroller.IsVisible = false;
                }
                return;
            }

            if (msg.StartsWith("PREVIEW:"))
            {
                // Format: PREVIEW:dp_poffin_main%DP_poffin_main_178
                var parts = msg.Substring(8).Split('%');
                if (parts.Length != 2) return;

                string fileName = parts[0].Trim();
                string label = parts[1].Trim();

                ShowMessagePreview(fileName, label);
            }
        }

        private void ShowMessagePreview(string fileName, string label)
        {
            if (_messageRenderer == null) return;

            // Look up the text in our already loaded TreeView data
            // (Assuming you have loaded the message bundle)
            var allFiles = ScriptTree.ItemsSource as IEnumerable<FileNode>;
            if (allFiles == null) return;

            var targetFile = allFiles.FirstOrDefault(f => f.Name.Equals(fileName, StringComparison.OrdinalIgnoreCase));
            if (targetFile != null)
            {
                var targetScript = targetFile.Scripts.FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase));
                if (targetScript != null)
                {
                    // Render and Show
                    _isPreviewActive = true;
                    MessagePreviewScroller.IsVisible = true;
                    MessagePreviewContent.Children.Clear();
                    MessagePreviewContent.Children.Add(_messageRenderer.Render(targetScript.Content));
                }
            }
        }

        // ... [Rest of the file remains unchanged: InitializeBlockly, BtnLoad_Click, etc.] ...

        private void InitializeBlockly()
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string blocklyPath = Path.Combine(appDir, "Assets", "Blockly", "index.html");
            if (!File.Exists(blocklyPath)) blocklyPath = Path.Combine(appDir, "Blockly", "index.html");

            if (File.Exists(blocklyPath))
            {
                BlockEditor.Url = new Uri($"file:///{blocklyPath.Replace("\\", "/")}");
                BlockEditor.NavigationCompleted += (sender, args) =>
                {
                    if (args.IsSuccess) _isBlocklyReady = true;
                };
                BlockEditor.WebMessageReceived += (s, e) =>
                {
                    _currentScriptContent = e.Message;
                };
            }
        }

        private string FindJsonFolder()
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string[] candidates = {
                Path.Combine(baseDir, "JSON"),
                Path.Combine(baseDir, "..", "..", "..", "JSON"),
                Path.Combine(Directory.GetCurrentDirectory(), "JSON")
            };

            foreach (var path in candidates)
            {
                if (Directory.Exists(path) && File.Exists(Path.Combine(path, "commands.json")))
                    return Path.GetFullPath(path);
            }
            return null;
        }

        private string LoadCleanJson(string path)
        {
            if (!File.Exists(path)) return "[]";
            try
            {
                string content = File.ReadAllText(path);
                var obj = JsonConvert.DeserializeObject(content);
                return JsonConvert.SerializeObject(obj, Formatting.None);
            }
            catch { return "[]"; }
        }

        private async Task GenerateAndInjectSyntax()
        {
            try
            {
                string jsonDir = FindJsonFolder();
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
                    bool hasData = cmds.Length > 20;

                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string monacoPath = Path.Combine(appDir, "Monaco", "syntax_data.js");

                    string monacoContent = $@"
                        window.RELUMI_DATA = {{
                            commands: {cmds},
                            flags: {flags},
                            sysflags: {sys},
                            works: {work},
                            pokes: {pokes}
                        }};
                        window.RELUMI_DATA_LOADED = {hasData.ToString().ToLower()};
                    ";
                    File.WriteAllText(monacoPath, monacoContent, Encoding.UTF8);
                });

                long timestamp = DateTime.Now.Ticks;
                if (_isEditorReady)
                {
                    await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={timestamp}');");
                }

                Avalonia.Threading.Dispatcher.UIThread.Post(() => {
                    StatusText.Text = $"Ready. Backend: {_service.InitSummary}";
                });
            }
            catch (Exception ex)
            {
                Avalonia.Threading.Dispatcher.UIThread.Post(() => {
                    StatusText.Text = "Init Error: " + ex.Message;
                });
            }
        }

        private async void OnTabChanged(object sender, RoutedEventArgs e)
        {
            if (TabCode.IsChecked == true)
            {
                Editor.IsVisible = true;
                BlockEditor.IsVisible = false;
                SetEditorText(_currentScriptContent);
            }
            else
            {
                Editor.IsVisible = false;
                BlockEditor.IsVisible = true;
                if (_isBlocklyReady && !string.IsNullOrEmpty(_currentScriptContent))
                {
                    string safe = JsonConvert.ToString(_currentScriptContent);
                    await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
                }
            }
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

            if (_isBlocklyReady && BlockEditor.IsVisible)
            {
                await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
            }
        }

        private string FindFileInStructure(string root, string[] segments)
        {
            string full = Path.Combine(root, Path.Combine(segments));
            if (File.Exists(full)) return full;

            for (int i = 1; i < segments.Length; i++)
            {
                string partial = Path.Combine(root, Path.Combine(segments.Skip(i).ToArray()));
                if (File.Exists(partial)) return partial;
            }

            var fileName = segments.Last();
            try
            {
                var found = Directory.EnumerateFiles(root, fileName, SearchOption.AllDirectories).FirstOrDefault();
                if (found != null) return found;
            }
            catch { }

            return null;
        }

        private async void BtnLoad_Click(object sender, RoutedEventArgs e)
        {
            var topLevel = TopLevel.GetTopLevel(this);
            var folders = await topLevel.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions
            {
                AllowMultiple = false,
                Title = "Select Dump Folder"
            });

            if (folders.Count > 0)
            {
                StatusText.Text = "Processing...";
                var rootPath = folders[0].Path.LocalPath;

                string evScriptPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Dpr", "ev_script" });
                string msgPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Message", "common_msbt" });

                if (string.IsNullOrEmpty(evScriptPath))
                {
                    StatusText.Text = $"Error: 'ev_script' not found in: {rootPath}";
                    return;
                }

                if (_service.InitSummary.Contains("Cmds: 0"))
                {
                    string jsonDir = FindJsonFolder();
                    if (!string.IsNullOrEmpty(jsonDir)) _service.Initialize(jsonDir);
                }

                if (!string.IsNullOrEmpty(msgPath))
                {
                    StatusText.Text = "Loading Message Data...";
                    await Task.Run(() => _service.LoadPokemonData(msgPath));
                    await GenerateAndInjectSyntax();
                }

                var loadedScripts = await Task.Run(() => _service.LoadAndDecompile(evScriptPath));
                var loadedMessages = !string.IsNullOrEmpty(msgPath)
                    ? await Task.Run(() => _service.LoadMessageFiles(msgPath))
                    : new List<FileNode>();

                var rootItems = new List<FileNode>();
                rootItems.AddRange(loadedScripts);
                rootItems.AddRange(loadedMessages);

                ScriptTree.ItemsSource = rootItems.OrderBy(x => x.Name).ToList();
                StatusText.Text = $"Loaded {loadedScripts.Count} scripts, {loadedMessages.Count} messages.";
            }
        }

        private void ScriptTree_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode s)
            {
                var allNodes = ScriptTree.ItemsSource as IEnumerable<FileNode>;
                var parent = allNodes?.FirstOrDefault(f => f.Scripts.Contains(s));

                if (parent != null && parent.IsMessage && _messageRenderer != null)
                {
                    // Show full message preview (already handled by OnEditorMessageReceived logic, but good for clicking tree too)
                    MessagePreviewScroller.IsVisible = true;
                    MessagePreviewContent.Children.Clear();
                    MessagePreviewContent.Children.Add(_messageRenderer.Render(s.Content));
                }
                else
                {
                    // Regular script view
                    MessagePreviewScroller.IsVisible = false; // Ensure hidden
                    if (TabCode.IsChecked == true) Editor.IsVisible = true;
                    else BlockEditor.IsVisible = true;

                    SetEditorText(s.Content);
                }
            }
            else if (ScriptTree.SelectedItem is FileNode f)
            {
                if (f.IsMessage) return;

                MessagePreviewScroller.IsVisible = false;
                if (TabCode.IsChecked == true) Editor.IsVisible = true;

                StringBuilder sb = new StringBuilder();
                foreach (var script in f.Scripts)
                {
                    sb.AppendLine(script.Content);
                    sb.AppendLine();
                }
                SetEditorText(sb.ToString());
            }
        }
    }
}