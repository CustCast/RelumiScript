using System.Collections.ObjectModel;
using System.Linq;
using System.Windows.Input;
using RelumiScript.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace RelumiScript.ViewModels
{
    public class HintEditorViewModel : ViewModelBase
    {
        private string _searchText = "";
        private HintViewModel? _selectedHint;
        private readonly List<HintViewModel> _allHints;

        public ObservableCollection<HintViewModel> FilteredHints { get; }

        public ThemeEditorViewModel Theme { get; }

        public string SearchText
        {
            get => _searchText;
            set
            {
                if (_searchText != value)
                {
                    _searchText = value;
                    OnPropertyChanged();
                    FilterHints();
                }
            }
        }

        public HintViewModel? SelectedHint
        {
            get => _selectedHint;
            set { _selectedHint = value; OnPropertyChanged(); }
        }

        public HintEditorViewModel(List<HintDef> hints, ThemeEditorViewModel theme)
        {
            Theme = theme;

            // Deep Clone the hints so we don't modify the live project until Save is clicked
            var json = JsonConvert.SerializeObject(hints);
            var clonedHints = JsonConvert.DeserializeObject<List<HintDef>>(json) ?? new List<HintDef>();

            _allHints = clonedHints.Select(h => new HintViewModel(h)).ToList();

            FilteredHints = new ObservableCollection<HintViewModel>(_allHints);
        }

        public void FilterHints()
        {
            FilteredHints.Clear();
            if (string.IsNullOrWhiteSpace(SearchText))
            {
                foreach (var h in _allHints) FilteredHints.Add(h);
            }
            else
            {
                var lower = SearchText.ToLower();
                foreach (var h in _allHints)
                {
                    if (h.Cmd.ToLower().Contains(lower)) FilteredHints.Add(h);
                }
            }
        }

        public void AddHint()
        {
            var newDef = new HintDef { Cmd = "NewCommand" };
            var vm = new HintViewModel(newDef);
            _allHints.Add(vm);
            FilteredHints.Add(vm);
            SelectedHint = vm;
        }

        public void RemoveHint(HintViewModel hint)
        {
            if (_allHints.Contains(hint)) _allHints.Remove(hint);
            if (FilteredHints.Contains(hint)) FilteredHints.Remove(hint);
            if (SelectedHint == hint) SelectedHint = null;
        }

        public List<HintDef> GetResultingHints()
        {
            return _allHints.Select(vm => vm.Model).ToList();
        }
    }
}