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

        /// <summary>
        /// Robust helper to find folders (Monaco, JSON) whether running from bin/ or source.
        /// </summary>
        private string FindValidFolder(string folderName, string requiredFile)
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;

            // List of candidates to check (Execution dir, Project Root, etc.)
            var candidates = new List<string>
            {
                Path.Combine(baseDir, folderName), // bin/Debug/net6.0/Monaco
                Path.Combine(baseDir, "..", "..", "..", folderName), // Project/Monaco
                Path.Combine(baseDir, "..", "..", "..", "..", folderName) // Extra depth
            };

            foreach (var path in candidates)
            {
                try
                {
                    string fullPath = Path.GetFullPath(path);
                    string checkFile = Path.Combine(fullPath, requiredFile);

                    if (Directory.Exists(fullPath) && File.Exists(checkFile))
                    {
                        return fullPath;
                    }
                }
                catch { /* Ignore invalid paths */ }
            }

            return null; // Not found
        }

        private void InitializeEditor()
        {
            // 1. Find the Monaco folder
            string monacoDir = FindValidFolder("Monaco", "index.html");

            if (!string.IsNullOrEmpty(monacoDir))
            {
                string indexHtmlPath = Path.Combine(monacoDir, "index.html");

                // 2. Use Uri class to handle encoding (spaces -> %20)
                Editor.Url = new Uri(indexHtmlPath);

                Editor.NavigationCompleted += async (sender, args) =>
                {
                    if (args.IsSuccess)
                    {
                        _isEditorReady = true;
                        await InjectLanguageData();
                    }
                    else
                    {
                        // FIXED: Removed 'args.WebErrorStatus' as it does not exist in this library
                        StatusText.Text = "WebView Navigation Failed";
                    }
                };
            }
            else
            {
                StatusText.Text = "Critical Error: 'Monaco' folder not found in build or project directory.";
            }
        }

        private async Task InjectLanguageData()
        {
            try
            {
                // 1. Find JSON folder
                string jsonDir = FindValidFolder("JSON", "commands.json");

                if (string.IsNullOrEmpty(jsonDir))
                {
                    Avalonia.Threading.Dispatcher.UIThread.Post(() => {
                        StatusText.Text = "Error: 'JSON' folder not found.";
                    });
                    return;
                }

                // 2. Initialize Backend with the found path
                _service.Initialize(jsonDir);

                // 3. Load syntax files
                async Task<string> ReadJson(string filename)
                {
                    string customPath = Path.Combine(jsonDir, "CustomReference", filename);
                    if (File.Exists(customPath)) return await File.ReadAllTextAsync(customPath);

                    string defaultPath = Path.Combine(jsonDir, filename);
                    if (File.Exists(defaultPath)) return await File.ReadAllTextAsync(defaultPath);

                    return "[]";
                }

                var cmds = await ReadJson("commands.json");
                var flags = await ReadJson("flags.json");
                var sysFlags = await ReadJson("sys_flags.json");
                var work = await ReadJson("work.json");

                // 4. Safe Serialize for JS Injection
                string jsCmds = JsonConvert.ToString(cmds);
                string jsFlags = JsonConvert.ToString(flags);
                string jsSys = JsonConvert.ToString(sysFlags);
                string jsWork = JsonConvert.ToString(work);

                // 5. Inject
                await Editor.ExecuteScriptAsync($"var _cmdData = {jsCmds};");
                await Editor.ExecuteScriptAsync($"var _flagData = {jsFlags};");
                await Editor.ExecuteScriptAsync($"var _sysData = {jsSys};");
                await Editor.ExecuteScriptAsync($"var _workData = {jsWork};");

                // 6. Activate Syntax
                await Editor.ExecuteScriptAsync("initializeLanguageData(_cmdData, _flagData, _sysData, _workData);");

                // 7. Force Layout Refresh
                await Editor.ExecuteScriptAsync("if(window.editor) { window.editor.layout(); }");

                Avalonia.Threading.Dispatcher.UIThread.Post(() => {
                    StatusText.Text = $"Editor Ready. Backend initialized from: {jsonDir}";
                });
            }
            catch (Exception ex)
            {
                Avalonia.Threading.Dispatcher.UIThread.Post(() => {
                    StatusText.Text = "Syntax Init Error: " + ex.Message;
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
            var files = await topLevel.StorageProvider.OpenFilePickerAsync(new FilePickerOpenOptions
            {
                Title = "Select ev_script",
                AllowMultiple = false
            });

            if (files.Count > 0)
            {
                StatusText.Text = "Processing...";
                var path = files[0].Path.LocalPath;

                var loadedFiles = await Task.Run(() => _service.LoadAndDecompile(path));

                var sortedFiles = loadedFiles.OrderBy(f => f.Name).ToList();

                ScriptTree.ItemsSource = sortedFiles;
                StatusText.Text = $"{_service.InitLog.Split('\n').LastOrDefault()} | Loaded {sortedFiles.Count} files.";
            }
        }

        private void ScriptTree_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode selectedScript)
            {
                SetEditorText(selectedScript.Content);
            }
            else if (ScriptTree.SelectedItem is FileNode)
            {
                SetEditorText("// Select a script label from the tree to view code.");
            }
        }
    }
}