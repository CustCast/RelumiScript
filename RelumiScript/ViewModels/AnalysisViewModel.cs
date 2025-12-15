using System;
using System.Collections.Generic;
using System.Linq;
using RelumiScript.Models;
using RelumiScript.Services;

namespace RelumiScript.ViewModels
{
    public class AnalysisViewModel : ViewModelBase
    {
        private readonly ProjectService _projectService;

        // Flags Tab
        private string _flagSearchText = "";
        private List<FlagUsageInfo> _filteredFlags = new List<FlagUsageInfo>();

        // Scripts/Works Tab
        private string _workSearchText = "";
        private List<FlagUsageInfo> _filteredWorks = new List<FlagUsageInfo>();

        public AnalysisViewModel(ProjectService projectService)
        {
            _projectService = projectService;
        }

        // --- Flags ---
        public string FlagSearchText
        {
            get => _flagSearchText;
            set { _flagSearchText = value; OnPropertyChanged(); FilterFlags(); }
        }

        public List<FlagUsageInfo> FilteredFlags
        {
            get => _filteredFlags;
            private set { _filteredFlags = value; OnPropertyChanged(); }
        }

        public void FilterFlags()
        {
            var unused = _projectService.AllFlagUsages.Where(x => x.Locations.Count == 0 && !x.FlagName.StartsWith("$"));
            if (string.IsNullOrWhiteSpace(_flagSearchText))
            {
                FilteredFlags = unused.ToList();
            }
            else
            {
                FilteredFlags = unused.Where(f => f.FlagName.Contains(_flagSearchText, StringComparison.OrdinalIgnoreCase)).ToList();
            }
        }

        // --- Works ---
        public string WorkSearchText
        {
            get => _workSearchText;
            set { _workSearchText = value; OnPropertyChanged(); FilterWorks(); }
        }

        public List<FlagUsageInfo> FilteredWorks
        {
            get => _filteredWorks;
            private set { _filteredWorks = value; OnPropertyChanged(); }
        }

        public void FilterWorks()
        {
            var unused = _projectService.AllWorkUsages.Where(x => x.Locations.Count == 0);
            if (string.IsNullOrWhiteSpace(_workSearchText))
            {
                FilteredWorks = unused.ToList();
            }
            else
            {
                FilteredWorks = unused.Where(c => c.FlagName.Contains(_workSearchText, StringComparison.OrdinalIgnoreCase)).ToList();
            }
        }

        public void RefreshAll()
        {
            FilterFlags();
            FilterWorks();
        }
    }
}