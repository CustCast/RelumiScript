using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.Linq;
using RelumiScript.Models;
using System;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace RelumiScript.ViewModels
{
    public class FragmentItem : ViewModelBase
    {
        private string _type = "";
        private string _prefix = "";
        private string _suffix = "";
        private bool _showZero;

        public string Type
        {
            get => _type;
            set
            {
                if (_type != value)
                {
                    _type = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(PlaceholderToken));
                    // When type changes, the token changes, but we keep prefix/suffix
                    // so we just trigger a full Text update
                    OnPropertyChanged(nameof(Text));
                }
            }
        }

        // Returns "{Pokemon}", "{Value}", etc based on the Type property
        public string PlaceholderToken => string.IsNullOrWhiteSpace(Type) ? "{Value}" : $"{{{Type}}}";

        public string Prefix
        {
            get => _prefix;
            set
            {
                if (_prefix != value)
                {
                    _prefix = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(Text));
                }
            }
        }

        public string Suffix
        {
            get => _suffix;
            set
            {
                if (_suffix != value)
                {
                    _suffix = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(Text));
                }
            }
        }

        public string Text
        {
            get => $"{Prefix}{PlaceholderToken}{Suffix}";
            set
            {
                // Intelligent Parsing:
                // Try to find the *current* token first. If not found, try generic brace patterns.
                if (string.IsNullOrEmpty(value))
                {
                    _prefix = "";
                    _suffix = "";
                }
                else
                {
                    string token = PlaceholderToken;
                    int idx = value.IndexOf(token, StringComparison.OrdinalIgnoreCase);

                    // If exact token not found, check if there is ANY {Something} in there we can latch onto?
                    // For now, we assume standard behavior. If token is missing, put everything in Prefix.
                    if (idx >= 0)
                    {
                        _prefix = value.Substring(0, idx);
                        _suffix = value.Substring(idx + token.Length);
                    }
                    else
                    {
                        // Fallback: Check for generic {Value} if current Type-token isn't found
                        int valIdx = value.IndexOf("{Value}", StringComparison.OrdinalIgnoreCase);
                        if (valIdx >= 0)
                        {
                            _prefix = value.Substring(0, valIdx);
                            _suffix = value.Substring(valIdx + 7);
                        }
                        else
                        {
                            _prefix = value;
                            _suffix = "";
                        }
                    }
                }
                OnPropertyChanged(nameof(Prefix));
                OnPropertyChanged(nameof(Suffix));
            }
        }

        public bool ShowZero
        {
            get => _showZero;
            set { _showZero = value; OnPropertyChanged(); }
        }
    }

    public class HintParamViewModel : ViewModelBase
    {
        public HintParamDef Model { get; }

        public ObservableCollection<FragmentItem> Fragments { get; }
        public ObservableCollection<string> Types { get; }

        public List<string> AvailableTypes { get; } = new List<string>
        {
            "Value", "Work", "Flag", "SysFlag", "Pokemon", "Item",
            "Ball", "Form", "Number", "Label", "String"
        };

        private string? _selectedTypeToAdd;
        public string? SelectedTypeToAdd
        {
            get => _selectedTypeToAdd;
            set { _selectedTypeToAdd = value; OnPropertyChanged(); }
        }

        public string Description
        {
            get => Model.Description ?? "";
            set
            {
                if (Model.Description != value)
                {
                    Model.Description = value;
                    OnPropertyChanged();
                }
            }
        }

        public HintParamViewModel(HintParamDef model)
        {
            Model = model;
            Fragments = new ObservableCollection<FragmentItem>();
            Types = new ObservableCollection<string>(model.Type);

            if (model.Fragments != null)
            {
                foreach (var kvp in model.Fragments)
                {
                    bool showZero = model.ShowZero != null && model.ShowZero.Contains(kvp.Key);
                    // This setter will trigger the parsing logic
                    Fragments.Add(new FragmentItem { Type = kvp.Key, Text = kvp.Value, ShowZero = showZero });
                }
            }

            foreach (var t in Types)
            {
                if (!Fragments.Any(f => f.Type == t))
                {
                    GenerateFragmentForType(t);
                }
            }

            Fragments.CollectionChanged += Fragments_CollectionChanged;

            foreach (var frag in Fragments)
            {
                frag.PropertyChanged += Fragment_PropertyChanged;
            }

            Types.CollectionChanged += (s, e) => SyncTypes();
        }

        private void Fragments_CollectionChanged(object? sender, NotifyCollectionChangedEventArgs e)
        {
            if (e.NewItems != null)
            {
                foreach (FragmentItem item in e.NewItems) item.PropertyChanged += Fragment_PropertyChanged;
            }
            if (e.OldItems != null)
            {
                foreach (FragmentItem item in e.OldItems) item.PropertyChanged -= Fragment_PropertyChanged;
            }
            SyncFragments();
        }

        private void Fragment_PropertyChanged(object? sender, PropertyChangedEventArgs e)
        {
            SyncFragments();
        }

        public void AddType()
        {
            if (string.IsNullOrEmpty(SelectedTypeToAdd)) return;
            if (Types.Contains(SelectedTypeToAdd)) return;

            Types.Add(SelectedTypeToAdd);
            GenerateFragmentForType(SelectedTypeToAdd);
            SelectedTypeToAdd = null;
        }

        public void RemoveType(string type)
        {
            if (Types.Contains(type))
            {
                Types.Remove(type);
                var frag = Fragments.FirstOrDefault(f => f.Type == type);
                if (frag != null) Fragments.Remove(frag);
            }
        }

        private void GenerateFragmentForType(string type)
        {
            if (Fragments.Any(f => f.Type == type)) return;

            // Default text now respects the type token
            string defaultText = $"{{{type}}}";
            if (type == "Label") defaultText = $"Jump to {{{type}}}";

            Fragments.Add(new FragmentItem { Type = type, Text = defaultText, ShowZero = false });
        }

        public void AddFragment()
        {
            Fragments.Add(new FragmentItem { Type = "Value", Text = "{Value}", ShowZero = false });
        }

        public void RemoveFragment(FragmentItem item)
        {
            Fragments.Remove(item);
        }

        public void SyncFragments()
        {
            if (Model.Fragments == null) Model.Fragments = new Dictionary<string, string>();
            Model.Fragments.Clear();

            if (Model.ShowZero == null) Model.ShowZero = new List<string>();
            Model.ShowZero.Clear();

            foreach (var item in Fragments)
            {
                if (!string.IsNullOrWhiteSpace(item.Type))
                {
                    // This will construct the full string (Prefix + {Type} + Suffix)
                    Model.Fragments[item.Type] = item.Text;
                    if (item.ShowZero)
                    {
                        Model.ShowZero.Add(item.Type);
                    }
                }
            }
        }

        public void SyncTypes()
        {
            Model.Type = new List<string>(Types);
        }
    }

    public class HintViewModel : ViewModelBase
    {
        private readonly HintDef _model;
        private string _cmd;
        private string _description;

        public HintDef Model => _model;

        public string Cmd
        {
            get => _cmd;
            set
            {
                if (_cmd != value)
                {
                    _cmd = value;
                    _model.Cmd = value;
                    OnPropertyChanged();
                }
            }
        }

        public string Description
        {
            get => _description;
            set
            {
                if (_description != value)
                {
                    _description = value;
                    _model.Description = value;
                    OnPropertyChanged();
                }
            }
        }

        public ObservableCollection<HintParamViewModel> Params { get; }
        public ObservableCollection<HintSentencePartDef> SentenceParts { get; }

        public HintViewModel(HintDef model)
        {
            _model = model;
            _cmd = model.Cmd ?? "";
            _description = model.Description ?? "";

            Params = new ObservableCollection<HintParamViewModel>(
                model.Params.Select(p => new HintParamViewModel(p))
            );

            SentenceParts = new ObservableCollection<HintSentencePartDef>(model.Sentence);
        }

        public void AddParam()
        {
            int nextIndex = Params.Count > 0 ? Params.Max(p => p.Model.Index) + 1 : 0;

            var newParam = new HintParamDef
            {
                Index = nextIndex,
                Type = new List<string> { "Value" },
                Ref = $"val{nextIndex}",
                DependsOn = null
            };

            newParam.Fragments["Value"] = "{Value}";

            var vm = new HintParamViewModel(newParam);
            Params.Add(vm);
            _model.Params.Add(newParam);
        }

        public void RemoveParam(HintParamViewModel param)
        {
            if (Params.Contains(param))
            {
                Params.Remove(param);
                _model.Params.Remove(param.Model);
            }
        }

        public void AddSentencePart()
        {
            var newPart = new HintSentencePartDef
            {
                Text = " new part"
            };
            SentenceParts.Add(newPart);
            _model.Sentence.Add(newPart);
        }

        public void AddSentencePartWithRef(string refName)
        {
            var newPart = new HintSentencePartDef
            {
                Text = " {" + refName + "}"
            };
            SentenceParts.Add(newPart);
            _model.Sentence.Add(newPart);
        }

        public void RemoveSentencePart(HintSentencePartDef part)
        {
            if (SentenceParts.Contains(part))
            {
                SentenceParts.Remove(part);
                _model.Sentence.Remove(part);
            }
        }
    }
}