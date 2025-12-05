using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Platform.Storage;
using AvaloniaWebView;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RelumiScript
{
    public partial class MainWindow : Window
    {
        private AssetBundleService _service;
        private bool _isEditorReady = false;

        public MainWindow()
        {
            InitializeComponent();
            _service = new AssetBundleService();
            InitializeEditor();
        }

        private void InitializeEditor()
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string monacoPath = Path.Combine(appDir, "Monaco", "index.html");

            if (File.Exists(monacoPath))
            {
                // Use file:/// to ensure local access permissions
                Editor.Url = new Uri($"file:///{monacoPath.Replace("\\", "/")}");
                Editor.NavigationCompleted += async (sender, args) =>
                {
                    if (args.IsSuccess)
                    {
                        _isEditorReady = true;
                        // Trigger the file-based data loading strategy
                        await GenerateAndInjectSyntax();
                    }
                };
            }
            else StatusText.Text = $"Error: Monaco not found at {monacoPath}";
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

        // Helper to read JSON content safely
        private string ReadJsonContent(string path)
        {
            if (!File.Exists(path)) return "[]";
            try { return File.ReadAllText(path); }
            catch { return "[]"; }
        }

        private async Task GenerateAndInjectSyntax()
        {
            try
            {
                string jsonDir = FindJsonFolder();
                if (string.IsNullOrEmpty(jsonDir))
                {
                    StatusText.Text = "Critical Error: 'JSON' folder not found.";
                    return;
                }

                // 1. Initialize Backend (Ensures decompilation uses correct names)
                _service.Initialize(jsonDir);

                // 2. Generate 'syntax_data.js' directly in the Monaco folder.
                // This bypasses WebView2 IPC limits and CORS issues.
                await Task.Run(() =>
                {
                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string monacoDir = Path.Combine(appDir, "Monaco");
                    string syntaxFilePath = Path.Combine(monacoDir, "syntax_data.js");

                    // Helper to check for CustomReference files
                    string GetPath(string f)
                    {
                        string c = Path.Combine(jsonDir, "CustomReference", f);
                        return File.Exists(c) ? c : Path.Combine(jsonDir, f);
                    }

                    string cmds = ReadJsonContent(GetPath("commands.json"));
                    string flags = ReadJsonContent(GetPath("flags.json"));
                    string sys = ReadJsonContent(GetPath("sys_flags.json"));
                    string work = ReadJsonContent(GetPath("work.json"));

                    // Write a valid JS file that assigns data to a global object
                    string jsContent = $@"
                        window.RELUMI_DATA = {{
                            commands: {cmds},
                            flags: {flags},
                            sysflags: {sys},
                            works: {work}
                        }};
                    ";

                    File.WriteAllText(syntaxFilePath, jsContent);
                });

                // 3. Tell Monaco to load this local script
                // Adding a timestamp (?t=...) forces the browser to reload the file and ignore cache
                long timestamp = DateTime.Now.Ticks;
                await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={timestamp}');");

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

        private async void SetEditorText(string content)
        {
            if (!_isEditorReady) return;
            string safeContent = JsonConvert.ToString(content);
            await Editor.ExecuteScriptAsync($"editor.setValue({safeContent});");
            await Editor.ExecuteScriptAsync("editor.updateOptions({readOnly: false});");
        }

        private async void BtnLoad_Click(object sender, RoutedEventArgs e)
        {
            var topLevel = TopLevel.GetTopLevel(this);
            var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions { AllowMultiple = false });

            if (files.Count > 0)
            {
                StatusText.Text = "Processing...";
                var path = files[0].Path.LocalPath;

                // Re-init backend if needed
                if (_service.InitSummary.StartsWith("Not"))
                {
                    string jsonDir = FindJsonFolder();
                    if (!string.IsNullOrEmpty(jsonDir)) _service.Initialize(jsonDir);
                }

                var loadedFiles = await Task.Run(() => _service.LoadAndDecompile(path));
                var sortedFiles = loadedFiles.OrderBy(f => f.Name).ToList();

                ScriptTree.ItemsSource = sortedFiles;
                StatusText.Text = $"Loaded {sortedFiles.Count} files. ({_service.InitSummary})";
            }
        }

        private void ScriptTree_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode s) SetEditorText(s.Content);
            else if (ScriptTree.SelectedItem is FileNode) SetEditorText("// Select a script label.");
        }
    }
}