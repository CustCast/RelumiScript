using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Platform.Storage;
using AvaloniaWebView;
using Newtonsoft.Json;
using System;
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
                // Load the editor. Note: We do NOT inject data here immediately.
                // We wait for the 'NavigationCompleted' event.
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

        // ... [Keep FindJsonFolder helper] ...
        private string FindJsonFolder()
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string[] candidates = { Path.Combine(baseDir, "JSON"), Path.Combine(Directory.GetCurrentDirectory(), "JSON") };
            return candidates.FirstOrDefault(d => Directory.Exists(d) && File.Exists(Path.Combine(d, "commands.json")));
        }

        // Helper to read file safely
        private string ReadJsonContent(string path)
        {
            if (!File.Exists(path)) return "[]";
            return File.ReadAllText(path);
        }

        private async Task GenerateAndInjectSyntax()
        {
            try
            {
                string jsonDir = FindJsonFolder();
                if (string.IsNullOrEmpty(jsonDir)) return;

                _service.Initialize(jsonDir); // Init Backend

                // 1. Generate 'syntax_data.js' in the Monaco folder
                await Task.Run(() =>
                {
                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string syntaxFilePath = Path.Combine(appDir, "Monaco", "syntax_data.js");

                    string GetPath(string f)
                    {
                        string c = Path.Combine(jsonDir, "CustomReference", f);
                        return File.Exists(c) ? c : Path.Combine(jsonDir, f);
                    }

                    string cmds = ReadJsonContent(GetPath("commands.json"));
                    string flags = ReadJsonContent(GetPath("flags.json"));
                    string sys = ReadJsonContent(GetPath("sys_flags.json"));
                    string work = ReadJsonContent(GetPath("work.json"));

                    // Write valid JS file
                    string jsContent = $"window.RELUMI_DATA = {{ commands: {cmds}, flags: {flags}, sysflags: {sys}, works: {work} }};";
                    File.WriteAllText(syntaxFilePath, jsContent);
                });

                // 2. Tell JS to load that file (Bypasses all IPC/CORS limits)
                long timestamp = DateTime.Now.Ticks;
                await Editor.ExecuteScriptAsync($"loadSyntaxFromFile('syntax_data.js?t={timestamp}');");

                Avalonia.Threading.Dispatcher.UIThread.Post(() => StatusText.Text = $"Ready. {_service.InitSummary}");
            }
            catch (Exception ex)
            {
                Avalonia.Threading.Dispatcher.UIThread.Post(() => StatusText.Text = "Init Error: " + ex.Message);
            }
        }

        // ... [Keep SetEditorText, BtnLoad_Click, ScriptTree_SelectionChanged] ...
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
                if (_service.InitSummary.StartsWith("Not")) _service.Initialize(FindJsonFolder());
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