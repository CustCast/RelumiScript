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
                // Assets should be strictly parallel to JSON folder
                string assetsDir = Path.GetFullPath(Path.Combine(jsonDir, "..", "Assets"));

                if (Directory.Exists(assetsDir))
                {
                    try
                    {
                        _messageRenderer = new MessageRenderer(assetsDir);
                        Console.WriteLine($"MessageRenderer initialized from: {assetsDir}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"MessageRenderer Failed: {ex.Message}");
                    }
                }
                else
                {
                    Console.WriteLine($"Assets folder not found at: {assetsDir}");
                }
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
                    }
                });
            ";
            await Editor.ExecuteScriptAsync(script);
        }

        private void OnEditorMessageReceived(object sender, WebViewMessageReceivedEventArgs e)
        {
            string msg = e.Message;
            if (string.IsNullOrEmpty(msg) || !msg.StartsWith("PREVIEW:")) return;

            var parts = msg.Substring(8).Split('%');
            if (parts.Length == 2) ShowMessagePreview(parts[0].Trim(), parts[1].Trim());
        }

        private void ShowMessagePreview(string fileName, string label)
        {
            TryInitMessageRenderer();

            // Check tree data
            var allFiles = ScriptTree.ItemsSource as IEnumerable<FileNode>;
            if (allFiles == null) return;

            var targetFile = allFiles.FirstOrDefault(f => f.Name.Equals(fileName, StringComparison.OrdinalIgnoreCase));
            if (targetFile != null)
            {
                var targetScript = targetFile.Scripts.FirstOrDefault(s => s.Label.Equals(label, StringComparison.OrdinalIgnoreCase));
                if (targetScript != null)
                {
                    MessagePreviewContent.Children.Clear();
                    if (_messageRenderer != null)
                        MessagePreviewContent.Children.Add(_messageRenderer.Render(targetScript.Content));
                    else
                        StatusText.Text = "Preview Error: Renderer not initialized.";
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
                BlockEditor.WebMessageReceived += (s, e) => { _currentScriptContent = e.Message; };
            }
        }

        private string FindJsonFolder()
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

                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string monacoPath = Path.Combine(appDir, "Monaco", "syntax_data.js");
                    string content = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: {flags}, sysflags: {sys}, works: {work}, pokes: {pokes} }}; window.RELUMI_DATA_LOADED = true;";
                    File.WriteAllText(monacoPath, content, Encoding.UTF8);
                });

                if (_isEditorReady) await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={DateTime.Now.Ticks}');");

                // Only update status if we actually did something useful
                if (!_service.InitSummary.Contains("Cmds: 0"))
                    Avalonia.Threading.Dispatcher.UIThread.Post(() => { StatusText.Text = $"Ready. Backend: {_service.InitSummary}"; });
            }
            catch (Exception ex) { Avalonia.Threading.Dispatcher.UIThread.Post(() => { StatusText.Text = "Init Error: " + ex.Message; }); }
        }

        private void OnTabChanged(object sender, RoutedEventArgs e)
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
                    _ = BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
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
            if (_isBlocklyReady && BlockEditor.IsVisible) await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
        }

        // Improved search
        private string FindFileInStructure(string root, string[] segments)
        {
            string full = Path.Combine(root, Path.Combine(segments));
            if (File.Exists(full)) return full;

            for (int i = 1; i < segments.Length; i++)
            {
                string partial = Path.Combine(root, Path.Combine(segments.Skip(i).ToArray()));
                if (File.Exists(partial)) return partial;
            }

            try
            {
                var found = Directory.EnumerateFiles(root, segments.Last(), SearchOption.AllDirectories).FirstOrDefault();
                if (found != null) return found;
            }
            catch { }
            return null;
        }

        private async void BtnLoad_Click(object sender, RoutedEventArgs e)
        {
            var topLevel = TopLevel.GetTopLevel(this);
            var folders = await topLevel.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions { AllowMultiple = false, Title = "Select Dump Folder" });
            if (folders.Count == 0) return;

            StatusText.Text = "Scanning...";
            var rootPath = folders[0].Path.LocalPath;

            // 1. Locate Files
            string evScriptPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Dpr", "ev_script" });
            string pokemonMsgPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Message", "common_msbt" });
            string scriptMsgPath = FindFileInStructure(rootPath, new[] { "romfs", "data", "StreamingAssets", "AssetAssistant", "Message", "english" });

            if (string.IsNullOrEmpty(evScriptPath)) { StatusText.Text = "Error: 'ev_script' not found."; return; }

            // 2. Initialize JSONs
            if (_service.InitSummary.Contains("Cmds: 0"))
            {
                string jsonDir = FindJsonFolder();
                if (!string.IsNullOrEmpty(jsonDir)) _service.Initialize(jsonDir);
            }

            // 3. Load Pokemon Names (from common_msbt)
            if (!string.IsNullOrEmpty(pokemonMsgPath))
            {
                await Task.Run(() => _service.LoadPokemonData(pokemonMsgPath));
            }
            else
            {
                Console.WriteLine("Warning: common_msbt not found, Pokemon names missing.");
            }

            // 4. Update Syntax (Needs Pokemon names)
            await GenerateAndInjectSyntax();

            // 5. Load Main Scripts
            var loadedScripts = await Task.Run(() => _service.LoadAndDecompile(evScriptPath));

            // 6. Load Messages (from english)
            var loadedMessages = new List<FileNode>();
            if (!string.IsNullOrEmpty(scriptMsgPath))
            {
                loadedMessages = await Task.Run(() => _service.LoadMessageFiles(scriptMsgPath));
            }
            else
            {
                Console.WriteLine("Warning: english bundle not found, messages missing.");
            }

            // 7. Populate Tree
            var rootItems = new List<FileNode>();
            rootItems.AddRange(loadedScripts);
            rootItems.AddRange(loadedMessages);

            ScriptTree.ItemsSource = rootItems.OrderBy(x => x.Name).ToList();
            StatusText.Text = $"Loaded {loadedScripts.Count} scripts, {loadedMessages.Count} messages.";
        }

        private void ScriptTree_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode s)
            {
                var allNodes = ScriptTree.ItemsSource as IEnumerable<FileNode>;
                var parent = allNodes?.FirstOrDefault(f => f.Scripts.Contains(s));

                if (parent != null && parent.IsMessage && _messageRenderer != null)
                {
                    // Update Preview
                    MessagePreviewContent.Children.Clear();
                    MessagePreviewContent.Children.Add(_messageRenderer.Render(s.Content));
                }
                else
                {
                    // Show Code
                    SetEditorText(s.Content);
                }
            }
            else if (ScriptTree.SelectedItem is FileNode f)
            {
                if (f.IsMessage) return;
                StringBuilder sb = new StringBuilder();
                foreach (var script in f.Scripts) { sb.AppendLine(script.Content); sb.AppendLine(); }
                SetEditorText(sb.ToString());
            }
        }
    }
}