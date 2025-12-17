using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using RelumiScript.Models;

namespace RelumiScript.ViewModels
{
    public class HintEditorViewModel : ViewModelBase
    {
        private string _searchText = "";
        private HintViewModel? _selectedHint;
        private ObservableCollection<HintViewModel> _filteredHints;

        // Master list of all view models
        private readonly List<HintViewModel> _allHints;

        public HintEditorViewModel(List<HintDef> sourceHints)
        {
            _allHints = new List<HintViewModel>();
            foreach (var def in sourceHints)
            {
                _allHints.Add(new HintViewModel(def));
            }

            // Initialize filtered list with everything
            _filteredHints = new ObservableCollection<HintViewModel>(_allHints);
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
                    PerformSearch();
                }
            }
        }

        public ObservableCollection<HintViewModel> FilteredHints
        {
            get => _filteredHints;
            set
            {
                if (_filteredHints != value)
                {
                    _filteredHints = value;
                    OnPropertyChanged();
                }
            }
        }

        public HintViewModel? SelectedHint
        {
            get => _selectedHint;
            set
            {
                if (_selectedHint != value)
                {
                    _selectedHint = value;
                    OnPropertyChanged();
                }
            }
        }

        public void AddHint()
        {
            var newDef = new HintDef { Cmd = "NEW_COMMAND" };
            var vm = new HintViewModel(newDef);

            _allHints.Add(vm);

            // Refresh filter to ensure the new item shows up
            PerformSearch();

            // Select the new item
            SelectedHint = vm;
        }

        public void RemoveHint(HintViewModel hint)
        {
            if (_allHints.Contains(hint))
            {
                _allHints.Remove(hint);

                // If the removed item was selected, deselect it
                if (SelectedHint == hint) SelectedHint = null;

                PerformSearch();
            }
        }

        /// <summary>
        /// Returns the raw models to be saved back to JSON.
        /// </summary>
        public List<HintDef> GetResultingHints()
        {
            return _allHints.Select(vm => vm.Model).ToList();
        }

        private void PerformSearch()
        {
            if (string.IsNullOrWhiteSpace(SearchText))
            {
                FilteredHints = new ObservableCollection<HintViewModel>(_allHints);
            }
            else
            {
                var query = SearchText.ToLower();
                var results = _allHints.Where(h => h.Cmd.ToLower().Contains(query));
                FilteredHints = new ObservableCollection<HintViewModel>(results);
            }
        }
    }
}