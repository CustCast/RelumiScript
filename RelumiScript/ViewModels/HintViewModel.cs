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
    // ViewModel to handle Sentence Parts (Text vs Block)
    public class SentencePartViewModel : ViewModelBase
    {
        public HintSentencePartDef Model { get; }

        public string Text
        {
            get => Model.Text ?? "";
            set
            {
                if (Model.Text != value)
                {
                    Model.Text = value;
                    OnPropertyChanged();
                }
            }
        }

        public bool IsRef
        {
            get => Model.IsRef;
            set
            {
                if (Model.IsRef != value)
                {
                    Model.IsRef = value;
                    OnPropertyChanged();
                }
            }
        }

        public SentencePartViewModel(HintSentencePartDef model)
        {
            Model = model;
            // Auto-detect Ref if it looks like {Ref} but isn't marked yet
            if (!model.IsRef && !string.IsNullOrEmpty(model.Text) &&
                model.Text.StartsWith("{") && model.Text.EndsWith("}") && !model.Text.Contains(" "))
            {
                model.IsRef = true;
            }
        }
    }

    public class FragmentItem : ViewModelBase
    {
        // Optimization: Compile Regex once to avoid overhead on every keystroke
        private static readonly Regex PlaceholderRegex = new Regex(@"\{[^}]+\}", RegexOptions.Compiled);

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
                }
            }
        }

        // Always use {Value} as the token to ensure consistency with the Engine
        public string PlaceholderToken => "{Value}";

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
                if (string.IsNullOrEmpty(value))
                {
                    _prefix = "";
                    _suffix = "";
                }
                else
                {
                    string cleanValue = value;

                    // SMART CLEANUP LOGIC:
                    if (cleanValue.EndsWith("{Value}", StringComparison.OrdinalIgnoreCase))
                    {
                        int lastBrace = cleanValue.LastIndexOf('{');
                        int firstBrace = cleanValue.IndexOf('{');

                        if (firstBrace != -1 && firstBrace < lastBrace)
                        {
                            cleanValue = cleanValue.Substring(0, lastBrace);
                        }
                    }

                    var match = PlaceholderRegex.Match(cleanValue);

                    if (match.Success)
                    {
                        _prefix = cleanValue.Substring(0, match.Index);
                        _suffix = cleanValue.Substring(match.Index + match.Length);
                    }
                    else
                    {
                        _prefix = cleanValue;
                        _suffix = "";
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

        public List<string> AvailableTypes { get; } = new List<string>
        {
            "Value", "Work", "Flag", "SysFlag", "Pokemon", "Item",
            "Ball", "Form", "Number", "Label", "String"
        };

        // Event to notify parent when the Ref name changes
        public event Action<string, string>? RefChanged;

        // Wrapper around Model.Ref to handle notification and events
        public string Ref
        {
            get => Model.Ref ?? "";
            set
            {
                if (Model.Ref != value)
                {
                    string oldRef = Model.Ref ?? "";
                    Model.Ref = value;
                    OnPropertyChanged();

                    // Notify listeners (HintViewModel) to update sentence parts
                    RefChanged?.Invoke(oldRef, value);
                }
            }
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

            var initialTypes = model.Type != null ? new List<string>(model.Type) : new List<string>();

            if (model.Fragments != null)
            {
                foreach (var kvp in model.Fragments)
                {
                    bool showZero = model.ShowZero != null && model.ShowZero.Contains(kvp.Key);
                    Fragments.Add(new FragmentItem { Type = kvp.Key, Text = kvp.Value, ShowZero = showZero });
                }
            }

            foreach (var t in initialTypes)
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

            SyncFragments();
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

        private void GenerateFragmentForType(string type)
        {
            if (Fragments.Any(f => f.Type == type)) return;
            string defaultText = "{Value}";
            if (type == "Label") defaultText = "Jump to {Value}";
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

            if (Model.Type == null) Model.Type = new List<string>();
            Model.Type.Clear();

            foreach (var item in Fragments)
            {
                if (!string.IsNullOrWhiteSpace(item.Type))
                {
                    Model.Fragments[item.Type] = item.Text;

                    if (item.ShowZero)
                    {
                        Model.ShowZero.Add(item.Type);
                    }

                    if (!Model.Type.Contains(item.Type))
                    {
                        Model.Type.Add(item.Type);
                    }
                }
            }
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
        public ObservableCollection<SentencePartViewModel> SentenceParts { get; }

        public HintViewModel(HintDef model)
        {
            _model = model;
            _cmd = model.Cmd ?? "";
            _description = model.Description ?? "";

            Params = new ObservableCollection<HintParamViewModel>(
                model.Params.Select(p =>
                {
                    var vm = new HintParamViewModel(p);
                    // Hook up the rename event
                    vm.RefChanged += OnParamRefChanged;
                    return vm;
                })
            );

            SentenceParts = new ObservableCollection<SentencePartViewModel>(
                model.Sentence.Select(s => new SentencePartViewModel(s))
            );
        }

        private void OnParamRefChanged(string oldVal, string newVal)
        {
            if (string.IsNullOrEmpty(oldVal)) return;

            string oldToken = "{" + oldVal + "}";
            string newToken = "{" + newVal + "}";

            // Auto-update any sentence parts that refer to the old parameter name
            foreach (var part in SentenceParts)
            {
                if (part.IsRef && part.Text == oldToken)
                {
                    part.Text = newToken;
                }
            }
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

            if (newParam.Fragments == null) newParam.Fragments = new Dictionary<string, string>();
            newParam.Fragments["Value"] = "{Value}";

            var vm = new HintParamViewModel(newParam);
            vm.RefChanged += OnParamRefChanged; // Subscribe
            Params.Add(vm);
            _model.Params.Add(newParam);
        }

        public void RemoveParam(HintParamViewModel param)
        {
            if (Params.Contains(param))
            {
                param.RefChanged -= OnParamRefChanged; // Unsubscribe
                Params.Remove(param);
                _model.Params.Remove(param.Model);
            }
        }

        public void AddSentencePart()
        {
            var newPart = new HintSentencePartDef
            {
                Text = " new part",
                IsRef = false
            };
            SentenceParts.Add(new SentencePartViewModel(newPart));
            _model.Sentence.Add(newPart);
        }

        public void AddSentencePartWithRef(string refName)
        {
            var newPart = new HintSentencePartDef
            {
                Text = "{" + refName + "}",
                IsRef = true
            };
            SentenceParts.Add(new SentencePartViewModel(newPart));
            _model.Sentence.Add(newPart);
        }

        public void RemoveSentencePart(SentencePartViewModel part)
        {
            if (SentenceParts.Contains(part))
            {
                SentenceParts.Remove(part);
                _model.Sentence.Remove(part.Model);
            }
        }
    }
}