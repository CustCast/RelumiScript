#nullable disable
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Platform.Storage;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AvaloniaWebView;

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
                Editor.Url = new Uri(monacoPath);

                Editor.NavigationCompleted += (sender, args) =>
                {
                    if (args.IsSuccess)
                    {
                        _isEditorReady = true;
                    }
                };
            }
            else
            {
                StatusText.Text = "Error: Monaco editor files not found.";
            }
        }

        private async void SetEditorText(string content)
        {
            if (!_isEditorReady) return;

            string escapedContent = content
                .Replace("\\", "\\\\")
                .Replace("'", "\\'")
                .Replace("\n", "\\n")
                .Replace("\r", "");

            // 1. Set the text
            await Editor.ExecuteScriptAsync($"editor.setValue('{escapedContent}');");

            // 2. Unlock the editor
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

                var loadedFiles = await System.Threading.Tasks.Task.Run(() => _service.LoadAndDecompile(path));

                var sortedFiles = loadedFiles.OrderBy(f => f.Name).ToList();

                ScriptTree.ItemsSource = sortedFiles;
                StatusText.Text = $"Loaded {sortedFiles.Count} files.";
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