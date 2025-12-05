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
                Editor.Url = new Uri($"file:///{monacoPath.Replace("\\", "/")}");
                Editor.NavigationCompleted += async (sender, args) =>
                {
                    if (args.IsSuccess)
                    {
                        _isEditorReady = true;
                        await InjectLanguageData();
                    }
                };
            }
            else StatusText.Text = "Monaco not found.";
        }

        private async Task InjectLanguageData()
        {
            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string[] candidates = { Path.Combine(baseDir, "JSON"), Path.Combine(baseDir, "..", "..", "..", "JSON") };
                string jsonDir = candidates.FirstOrDefault(d => Directory.Exists(d) && File.Exists(Path.Combine(d, "commands.json")));

                if (jsonDir == null) { StatusText.Text = "JSON folder missing."; return; }

                _service.Initialize(jsonDir);

                async Task<string> GetJsonObj(string f)
                {
                    string p = Path.Combine(jsonDir, "CustomReference", f);
                    if (!File.Exists(p)) p = Path.Combine(jsonDir, f);
                    if (!File.Exists(p)) return "[]";

                    // Read and Minify to single line JSON string
                    var txt = await File.ReadAllTextAsync(p);
                    var obj = JsonConvert.DeserializeObject(txt);
                    return JsonConvert.SerializeObject(obj, Formatting.None);
                }

                // Get Compact JSON Strings (valid JS arrays)
                string jsCmds = await GetJsonObj("commands.json");
                string jsFlags = await GetJsonObj("flags.json");
                string jsSys = await GetJsonObj("sys_flags.json");
                string jsWork = await GetJsonObj("work.json");

                // Inject DIRECTLY as JS Objects (No quotes!)
                await Editor.ExecuteScriptAsync($"var _cmdData = {jsCmds};");
                await Editor.ExecuteScriptAsync($"var _flagData = {jsFlags};");
                await Editor.ExecuteScriptAsync($"var _sysData = {jsSys};");
                await Editor.ExecuteScriptAsync($"var _workData = {jsWork};");

                await Editor.ExecuteScriptAsync("initializeLanguageData(_cmdData, _flagData, _sysData, _workData);");

                Avalonia.Threading.Dispatcher.UIThread.Post(() => StatusText.Text = "Editor Ready.");
            }
            catch (Exception ex)
            {
                Avalonia.Threading.Dispatcher.UIThread.Post(() => StatusText.Text = "Init Error: " + ex.Message);
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
                var loadedFiles = await Task.Run(() => _service.LoadAndDecompile(path));
                var sortedFiles = loadedFiles.OrderBy(f => f.Name).ToList();
                ScriptTree.ItemsSource = sortedFiles;
                StatusText.Text = $"Loaded {sortedFiles.Count} files.";
            }
        }

        private void ScriptTree_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ScriptTree.SelectedItem is ScriptNode s) SetEditorText(s.Content);
        }
    }
}