using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.Linq;
using RelumiScript.Models;
using System;
using System.Collections.Specialized;
using System.ComponentModel;

namespace RelumiScript.ViewModels
{
    public class FragmentItem : ViewModelBase
    {
        private string _type = "";
        private string _text = "";

        public string Type
        {
            get => _type;
            set { _type = value; OnPropertyChanged(); }
        }

        public string Text
        {
            get => _text;
            set { _text = value; OnPropertyChanged(); }
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

        // NEW: Exposed Description property
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
                    Fragments.Add(new FragmentItem { Type = kvp.Key, Text = kvp.Value });
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
            string defaultText = "{Value}";
            if (type == "Label") defaultText = "Jump to {Value}";
            Fragments.Add(new FragmentItem { Type = type, Text = defaultText });
        }

        public void AddFragment()
        {
            Fragments.Add(new FragmentItem { Type = "NewType", Text = "{Value}" });
        }

        public void RemoveFragment(FragmentItem item)
        {
            Fragments.Remove(item);
        }

        public void SyncFragments()
        {
            if (Model.Fragments == null) Model.Fragments = new Dictionary<string, string>();
            Model.Fragments.Clear();
            foreach (var item in Fragments)
            {
                if (!string.IsNullOrWhiteSpace(item.Type))
                {
                    Model.Fragments[item.Type] = item.Text;
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
                Ref = "val",
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
                Text = " new part",
                Check = null,
                ShowZero = null
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