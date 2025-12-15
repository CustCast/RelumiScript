using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using RelumiScript.Models;
using RelumiScript.Services;

namespace RelumiScript.ViewModels
{
    public class SearchViewModel : ViewModelBase
    {
        private readonly ProjectService _projectService;
        private string _searchQuery = "";
        private List<SearchResult>? _results;

        public SearchViewModel(ProjectService projectService)
        {
            _projectService = projectService;
        }

        public string SearchQuery
        {
            get => _searchQuery;
            set
            {
                if (_searchQuery != value)
                {
                    _searchQuery = value;
                    OnPropertyChanged();
                    PerformSearch();
                }
            }
        }

        public List<SearchResult>? Results
        {
            get => _results;
            private set { _results = value; OnPropertyChanged(); }
        }

        public void Refresh()
        {
            PerformSearch();
        }

        private void PerformSearch()
        {
            if (string.IsNullOrWhiteSpace(_searchQuery))
            {
                Results = null;
                return;
            }

            string query = _searchQuery.Trim();
            var results = new List<SearchResult>();
            bool isIdSearch = int.TryParse(query, out int searchId);

            var service = _projectService.AssetService;
            var workMap = _projectService.WorkIdMap;
            var project = _projectService; // Access analysis lists directly from service

            // Pokemon
            if (isIdSearch && service.PokemonMap.TryGetValue(searchId, out string? pName))
                results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = searchId, Name = pName });

            var pkmMatches = service.PokemonMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId);
            foreach (var kvp in pkmMatches.Take(20))
                results.Add(new SearchResult { Type = "PKM", Color = "#569CD6", Id = kvp.Key, Name = kvp.Value });

            // Items
            if (isIdSearch && service.ItemMap.TryGetValue(searchId, out string? iName))
                results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = searchId, Name = iName });

            var itmMatches = service.ItemMap.Where(k => k.Value.Contains(query, StringComparison.OrdinalIgnoreCase) && k.Key != searchId);
            foreach (var kvp in itmMatches.Take(20))
                results.Add(new SearchResult { Type = "ITM", Color = "#CE9178", Id = kvp.Key, Name = kvp.Value });

            // Works
            if (isIdSearch && workMap.TryGetValue(searchId, out string? wName))
            {
                var usage = project.AllWorkUsages.FirstOrDefault(u => u.FlagName.Equals("@" + wName, StringComparison.OrdinalIgnoreCase));
                results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Id = searchId, Name = wName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() });
            }
            var wrkMatches = project.AllWorkUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var w in wrkMatches.Take(20))
                results.Add(new SearchResult { Type = "WRK", Color = "#FFD700", Name = w.FlagName, Locations = new ObservableCollection<FlagLocation>(w.Locations) });

            // Flags
            if (isIdSearch && service.FlagMap.TryGetValue(searchId, out string? fName))
            {
                var usage = project.AllFlagUsages.FirstOrDefault(u => u.FlagName.Equals("#" + fName, StringComparison.OrdinalIgnoreCase));
                results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Id = searchId, Name = fName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() });
            }
            if (isIdSearch && service.SysFlagMap.TryGetValue(searchId, out string? sName))
            {
                var usage = project.AllFlagUsages.FirstOrDefault(u => u.FlagName.Equals("$" + sName, StringComparison.OrdinalIgnoreCase));
                results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Id = searchId, Name = sName, Locations = usage != null ? new ObservableCollection<FlagLocation>(usage.Locations) : new() });
            }
            var flgMatches = project.AllFlagUsages.Where(x => x.FlagName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var f in flgMatches.Take(20))
                results.Add(new SearchResult { Type = "FLG", Color = "#50FA7B", Name = f.FlagName, Locations = new ObservableCollection<FlagLocation>(f.Locations) });

            // Commands
            var cmdMatches = project.AllCommandUsages.Where(x => x.CommandName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var c in cmdMatches.Take(20))
                results.Add(new SearchResult { Type = "CMD", Color = "#BD93F9", Name = c.CommandName, Locations = new ObservableCollection<FlagLocation>(c.Locations) });

            // Events
            var evtMatches = project.AllEventUsages.Where(x => x.EventName.Contains(query, StringComparison.OrdinalIgnoreCase));
            foreach (var e in evtMatches.Take(20))
            {
                var sortedLocs = new ObservableCollection<FlagLocation>(e.Locations.OrderByDescending(l => l.IsDeclaration).ThenBy(l => l.FileName));
                results.Add(new SearchResult { Type = "EVT", Color = "#FF79C6", Name = e.EventName, Locations = sortedLocs });
            }

            // Auto-expand if single result
            if (results.Count == 1) results[0].IsExpanded = true;

            Results = results;
        }
    }
}