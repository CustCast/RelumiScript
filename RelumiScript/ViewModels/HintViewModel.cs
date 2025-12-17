using System.Collections.ObjectModel;
using System.Linq;
using RelumiScript.Models;

namespace RelumiScript.ViewModels
{
    public class HintViewModel : ViewModelBase
    {
        private readonly HintDef _model;
        private string _cmd;

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

        public ObservableCollection<HintParamDef> Params { get; }
        public ObservableCollection<HintSentencePartDef> SentenceParts { get; }

        public HintViewModel(HintDef model)
        {
            _model = model;
            _cmd = model.Cmd ?? "";

            // Initialize observable collections from the model's lists
            Params = new ObservableCollection<HintParamDef>(model.Params);
            SentenceParts = new ObservableCollection<HintSentencePartDef>(model.Sentence);
        }

        public void AddParam()
        {
            // Auto-increment index based on the last item
            int nextIndex = Params.Count > 0 ? Params.Max(p => p.Index) + 1 : 0;

            var newParam = new HintParamDef
            {
                Index = nextIndex,
                Type = "Value",
                Ref = "val",
                DependsOn = null
            };

            Params.Add(newParam);
            _model.Params.Add(newParam); // Keep model in sync
        }

        public void RemoveParam(HintParamDef param)
        {
            if (Params.Contains(param))
            {
                Params.Remove(param);
                _model.Params.Remove(param);
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
            _model.Sentence.Add(newPart); // Keep model in sync
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