using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using RelumiScript.Models;
using RelumiScript.Services;

namespace RelumiScript.ViewModels
{
    public class ExplorerViewModel : ViewModelBase
    {
        private readonly ProjectService _projectService;
        private string _searchText = "";
        private ObservableCollection<FileNode> _filteredFiles = new ObservableCollection<FileNode>();
        private CancellationTokenSource? _searchCts;

        public ExplorerViewModel(ProjectService projectService)
        {
            _projectService = projectService;
        }

        public string SearchText
        {
            get => _searchText;
            set
            {
                if (_searchText != value)
                {
                    _searchText = value;
                    OnPropertyChanged();
                    DebounceFilter();
                }
            }
        }

        public ObservableCollection<FileNode> FilteredFiles
        {
            get => _filteredFiles;
            private set { _filteredFiles = value; OnPropertyChanged(); }
        }

        public void Refresh()
        {
            // Immediate refresh when called programmatically (load/save)
            FilterFiles();
        }

        private void DebounceFilter()
        {
            _searchCts?.Cancel();
            _searchCts = new CancellationTokenSource();
            var token = _searchCts.Token;

            // Wait 300ms before filtering. If user types again, this task is cancelled.
            Task.Delay(300, token).ContinueWith(t =>
            {
                if (t.IsCanceled) return;
                Avalonia.Threading.Dispatcher.UIThread.Post(() => FilterFiles());
            });
        }

        private void FilterFiles()
        {
            var allFiles = _projectService.AllFiles;
            if (allFiles == null || !allFiles.Any())
            {
                FilteredFiles = new ObservableCollection<FileNode>();
                return;
            }

            if (string.IsNullOrWhiteSpace(_searchText))
            {
                // Optimization: Avoid creating new observable collection if count matches (roughly)
                // but for safety in this context, just updating is fine.
                if (FilteredFiles.Count != allFiles.Count)
                {
                    FilteredFiles = new ObservableCollection<FileNode>(allFiles.OrderBy(x => x.Name));
                }
                return;
            }

            string query = _searchText.Trim();
            var filtered = new List<FileNode>();

            // Optimization: Parallel filtering for large project lists
            // Note: Since we are creating new Nodes, we must be careful, but FileNode is a lightweight wrapper.
            // For safety and simplicity on UI thread, we keep it sequential but optimized logic.

            foreach (var file in allFiles)
            {
                bool nameMatch = file.Name.Contains(query, StringComparison.OrdinalIgnoreCase);

                // Only check scripts if file name didn't match (Lazy eval)
                // Or if we want to filter the children shown.
                // Current logic: If file name matches, show ALL scripts. If not, show ONLY matching scripts.

                List<ScriptNode>? matchingScripts = null;

                if (nameMatch)
                {
                    // Shallow copy list is cheap
                    matchingScripts = new List<ScriptNode>(file.Scripts);
                }
                else
                {
                    matchingScripts = file.Scripts
                        .Where(s => s.Label.Contains(query, StringComparison.OrdinalIgnoreCase))
                        .ToList();
                }

                if (matchingScripts.Count > 0)
                {
                    var newNode = new FileNode
                    {
                        Name = file.Name,
                        FileName = file.FileName,
                        IsMessage = file.IsMessage,
                        Scripts = matchingScripts
                    };
                    filtered.Add(newNode);
                }
            }

            FilteredFiles = new ObservableCollection<FileNode>(filtered.OrderBy(x => x.Name));
        }
    }
}