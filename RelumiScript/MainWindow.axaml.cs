using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Platform.Storage;
using AvaloniaWebView;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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
                Editor.Url = new Uri($"file:///{monacoPath.Replace("\\", "/")}");
                Editor.NavigationCompleted += async (sender, args) =>
                {
                    if (args.IsSuccess)
                    {
                        _isEditorReady = true;
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

        // [FIX] Clean load: Deserialize -> Serialize removes whitespace/BOM/errors
        private string LoadCleanJson(string path)
        {
            if (!File.Exists(path)) return "[]";
            try
            {
                string content = File.ReadAllText(path);
                var obj = JsonConvert.DeserializeObject(content);
                return JsonConvert.SerializeObject(obj, Formatting.None); // Minified valid JSON
            }
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

                _service.Initialize(jsonDir);

                await Task.Run(() =>
                {
                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string syntaxFilePath = Path.Combine(appDir, "Monaco", "syntax_data.js");

                    // Load from ROOT JSON folder strictly (as per your request)
                    string cmds = LoadCleanJson(Path.Combine(jsonDir, "commands.json"));
                    string flags = LoadCleanJson(Path.Combine(jsonDir, "flags.json"));
                    string sys = LoadCleanJson(Path.Combine(jsonDir, "sys_flags.json"));
                    string work = LoadCleanJson(Path.Combine(jsonDir, "work.json"));

                    bool hasData = cmds.Length > 20;

                    // Generate pure JS file
                    string jsContent = $@"
                        window.RELUMI_DATA = {{
                            commands: {cmds},
                            flags: {flags},
                            sysflags: {sys},
                            works: {work}
                        }};
                        window.RELUMI_DATA_LOADED = {hasData.ToString().ToLower()};
                    ";

                    File.WriteAllText(syntaxFilePath, jsContent, Encoding.UTF8);
                });

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

        // ... [Standard Boilerplate] ...
        private async void SetEditorText(string content)
        {
            if (!_isEditorReady) return;
            string safe = JsonConvert.ToString(content);
            await Editor.ExecuteScriptAsync($"editor.setValue({safe});");
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
                if (_service.InitSummary.StartsWith("Not") || _service.InitSummary.Contains("Cmds: 0"))
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
        }
    }
}