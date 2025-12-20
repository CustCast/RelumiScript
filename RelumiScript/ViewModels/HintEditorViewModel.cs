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

        // Backing field for property
        private ObservableCollection<HintViewModel> _filteredHints;

        public ObservableCollection<HintViewModel> FilteredHints
        {
            get => _filteredHints;
            set { _filteredHints = value; OnPropertyChanged(); }
        }

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

            // Optimization: Replaced slow JSON cloning with manual clone
            var clonedHints = FastCloneHints(hints);

            _allHints = clonedHints.Select(h => new HintViewModel(h)).ToList();

            // Initialize directly
            _filteredHints = new ObservableCollection<HintViewModel>(_allHints);
        }

        // Optimization: Helper to avoid JsonConvert overhead
        private List<HintDef> FastCloneHints(List<HintDef> source)
        {
            var list = new List<HintDef>(source.Count);
            foreach (var s in source)
            {
                var h = new HintDef
                {
                    Cmd = s.Cmd,
                    Description = s.Description,
                    Params = new List<HintParamDef>(),
                    Sentence = new List<HintSentencePartDef>()
                };

                if (s.Params != null)
                {
                    foreach (var p in s.Params)
                    {
                        h.Params.Add(new HintParamDef
                        {
                            Index = p.Index,
                            Ref = p.Ref,
                            DependsOn = p.DependsOn,
                            Description = p.Description,
                            Type = p.Type != null ? new List<string>(p.Type) : null,
                            ShowZero = p.ShowZero != null ? new List<string>(p.ShowZero) : null,
                            Fragments = p.Fragments != null ? new Dictionary<string, string>(p.Fragments) : null
                        });
                    }
                }

                if (s.Sentence != null)
                {
                    foreach (var part in s.Sentence)
                    {
                        h.Sentence.Add(new HintSentencePartDef
                        {
                            Text = part.Text,
                            IsRef = part.IsRef
                        });
                    }
                }
                list.Add(h);
            }
            return list;
        }

        public void FilterHints()
        {
            // Optimization: Create new collection and swap it in O(1) time
            // preventing N layout updates where N is hint count.
            if (string.IsNullOrWhiteSpace(SearchText))
            {
                FilteredHints = new ObservableCollection<HintViewModel>(_allHints);
            }
            else
            {
                var lower = SearchText.ToLower();
                var matches = _allHints.Where(h => h.Cmd.ToLower().Contains(lower));
                FilteredHints = new ObservableCollection<HintViewModel>(matches);
            }
        }

        public void AddHint()
        {
            var newDef = new HintDef { Cmd = "NewCommand", Params = new List<HintParamDef>(), Sentence = new List<HintSentencePartDef>() };
            var vm = new HintViewModel(newDef);
            _allHints.Add(vm);

            // Add to current view if it matches search (or search is empty)
            if (string.IsNullOrWhiteSpace(SearchText) || vm.Cmd.ToLower().Contains(SearchText.ToLower()))
            {
                FilteredHints.Add(vm);
            }

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