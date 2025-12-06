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
        private bool _isBlocklyReady = false;
        private string _currentScriptContent = ""; // Stores text for tab switching

        public MainWindow()
        {
            InitializeComponent();
            _service = new AssetBundleService();
            InitializeEditor();
            InitializeBlockly();
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

        private void InitializeBlockly()
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string blocklyPath = Path.Combine(appDir, "Assets", "Blockly", "index.html");

            // Fallback check if Assets folder isn't used
            if (!File.Exists(blocklyPath))
                blocklyPath = Path.Combine(appDir, "Blockly", "index.html");

            if (File.Exists(blocklyPath))
            {
                BlockEditor.Url = new Uri($"file:///{blocklyPath.Replace("\\", "/")}");
                BlockEditor.NavigationCompleted += (sender, args) =>
                {
                    if (args.IsSuccess) _isBlocklyReady = true;
                };

                // Optional: Listen for code coming back from Blocks
                BlockEditor.WebMessageReceived += (s, e) => {
                    // Update our memory store when blocks change
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

                _service.Initialize(jsonDir);

                await Task.Run(() =>
                {
                    string cmds = LoadCleanJson(Path.Combine(jsonDir, "commands.json"));
                    string flags = LoadCleanJson(Path.Combine(jsonDir, "flags.json"));
                    string sys = LoadCleanJson(Path.Combine(jsonDir, "sys_flags.json"));
                    string work = LoadCleanJson(Path.Combine(jsonDir, "work.json"));
                    bool hasData = cmds.Length > 20;

                    string appDir = AppDomain.CurrentDomain.BaseDirectory;
                    string monacoPath = Path.Combine(appDir, "Monaco", "syntax_data.js");

                    string monacoContent = $@"
                        window.RELUMI_DATA = {{
                            commands: {cmds},
                            flags: {flags},
                            sysflags: {sys},
                            works: {work}
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

        // --- NEW: TAB SWITCHING LOGIC ---
        private async void OnTabChanged(object sender, RoutedEventArgs e)
        {
            if (TabCode.IsChecked == true)
            {
                // --- SWITCHING TO TEXT MODE ---
                Editor.IsVisible = true;
                BlockEditor.IsVisible = false;

                // Sync: Push the latest text from memory into Monaco
                SetEditorText(_currentScriptContent);
            }
            else
            {
                // --- SWITCHING TO VISUAL MODE ---
                Editor.IsVisible = false;
                BlockEditor.IsVisible = true;

                // Sync: Push text from memory into Blockly
                if (_isBlocklyReady && !string.IsNullOrEmpty(_currentScriptContent))
                {
                    string safe = JsonConvert.ToString(_currentScriptContent);

                    // We call loadScript explicitly when the tab becomes visible
                    await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
                }
            }
        }

        // --- UPDATED: TEXT SETTER ---
        private async void SetEditorText(string content)
        {
            // 1. Update internal memory (Keeps original format if needed)
            _currentScriptContent = content;

            string safe = JsonConvert.ToString(content);

            // 2. Always update Monaco
            if (_isEditorReady)
            {
                // --- CHANGED LOGIC START ---
                // Instead of setting the value directly, we pass it through the JS formatter.
                // The conditional operator checks if the function exists to prevent crashing if JS isn't fully loaded.
                string jsCommand = $"editor.setValue(window.formatLegacyScript ? window.formatLegacyScript({safe}) : {safe});";
                await Editor.ExecuteScriptAsync(jsCommand);
                // --- CHANGED LOGIC END ---

                await Editor.ExecuteScriptAsync("editor.updateOptions({readOnly: false});");
            }

            // 3. ONLY update Blockly if it is actively being looked at.
            if (_isBlocklyReady && BlockEditor.IsVisible)
            {
                await BlockEditor.ExecuteScriptAsync($"loadScript({safe});");
            }
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
            if (ScriptTree.SelectedItem is ScriptNode s)
            {
                // Single script selected: Load just that script
                SetEditorText(s.Content);
            }
            else if (ScriptTree.SelectedItem is FileNode f)
            {
                // Parent file selected: Combine ALL scripts in this file
                // We use a StringBuilder to efficiently join them with newlines
                StringBuilder sb = new StringBuilder();
                foreach (var script in f.Scripts)
                {
                    sb.AppendLine(script.Content);
                    sb.AppendLine(); // Add an extra empty line between scripts for readability
                }
                SetEditorText(sb.ToString());
            }
        }
    }
}