using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using RelumiScript.Models;
using RelumiScript.Services;

namespace RelumiScript.ViewModels
{
    public class ExplorerViewModel : ViewModelBase
    {
        private readonly ProjectService _projectService;
        private string _searchText = "";
        private ObservableCollection<FileNode> _filteredFiles = new ObservableCollection<FileNode>();

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
                    FilterFiles();
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
            FilterFiles();
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
                FilteredFiles = new ObservableCollection<FileNode>(allFiles.OrderBy(x => x.Name));
                return;
            }

            string query = _searchText.Trim();
            var filtered = new List<FileNode>();

            foreach (var file in allFiles)
            {
                bool nameMatch = file.Name.Contains(query, StringComparison.OrdinalIgnoreCase);
                var matchingScripts = file.Scripts.Where(s => s.Label.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();

                if (nameMatch || matchingScripts.Count > 0)
                {
                    var newNode = new FileNode { Name = file.Name, FileName = file.FileName, IsMessage = file.IsMessage };
                    // If file matches, show all scripts; otherwise only show matching scripts
                    if (nameMatch) newNode.Scripts = new List<ScriptNode>(file.Scripts);
                    else newNode.Scripts = matchingScripts;

                    filtered.Add(newNode);
                }
            }
            FilteredFiles = new ObservableCollection<FileNode>(filtered.OrderBy(x => x.Name));
        }
    }
}