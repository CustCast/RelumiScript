using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Newtonsoft.Json;

namespace RelumiScript.Models
{
    public class NameDef
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Name")]
        public string? Name { get; set; }
    }

    public class FileNameDef
    {
        public string FileName { get; set; } = "";
        public string FriendlyName { get; set; } = "";
    }

    public class FileNode
    {
        public string Name { get; set; } = "Unknown";
        public string FileName { get; set; } = "";
        public bool IsMessage { get; set; }
        public List<ScriptNode> Scripts { get; set; } = new List<ScriptNode>();
        public string Icon => IsMessage ? "💬" : "📜";
        public string Color => IsMessage ? "#569CD6" : "#4EC9B0";
    }

    public class ScriptNode
    {
        public string Label { get; set; } = "";
        public string Content { get; set; } = "";
    }

    public class EditorDocument : INotifyPropertyChanged
    {
        private string _title = "";
        private bool _isDirty;
        private bool _isPreview;
        private string _content = "";

        public string Id { get; set; } = Guid.NewGuid().ToString();
        public object? SourceNode { get; set; }

        public string Title
        {
            get => _title + (_isDirty ? "*" : "");
            set { if (_title != value) { _title = value; OnPropertyChanged(); OnPropertyChanged(nameof(DisplayName)); } }
        }

        public string DisplayName => Title;

        public bool IsDirty
        {
            get => _isDirty;
            set { if (_isDirty != value) { _isDirty = value; OnPropertyChanged(); OnPropertyChanged(nameof(Title)); OnPropertyChanged(nameof(DisplayName)); } }
        }

        public bool IsPreview
        {
            get => _isPreview;
            set { if (_isPreview != value) { _isPreview = value; OnPropertyChanged(); OnPropertyChanged(nameof(FontStyle)); } }
        }

        public string Content
        {
            get => _content;
            set { if (_content != value) { _content = value; OnPropertyChanged(); } }
        }

        public string OriginalContent { get; set; } = "";
        public string FontStyle => IsPreview ? "Italic" : "Normal";

        public event PropertyChangedEventHandler? PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string? name = null) =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }

    // --- UPDATED HINT MODELS ---

    public class HintParamDef
    {
        [JsonProperty("Index")]
        public int Index { get; set; }

        [JsonProperty("Type")]
        public List<string> Type { get; set; } = new List<string>();

        [JsonProperty("Ref")]
        public string? Ref { get; set; }

        [JsonProperty("Description")]
        public string? Description { get; set; }

        [JsonProperty("DependsOn")]
        public int? DependsOn { get; set; }

        [JsonProperty("Fragments")]
        public Dictionary<string, string> Fragments { get; set; } = new Dictionary<string, string>();

        [JsonProperty("ShowZero")]
        public List<string> ShowZero { get; set; } = new List<string>();
    }

    public class HintSentencePartDef
    {
        [JsonProperty("Text")]
        public string? Text { get; set; }

        // New property to distinguish Blocks from Text
        [JsonProperty("IsRef")]
        public bool IsRef { get; set; }

        [JsonProperty("Check")]
        public string? Check { get; set; }
    }

    public class HintDef
    {
        [JsonProperty("Cmd")]
        public string? Cmd { get; set; }

        [JsonProperty("Description")]
        public string? Description { get; set; }

        [JsonProperty("Params")]
        public List<HintParamDef> Params { get; set; } = new List<HintParamDef>();

        [JsonProperty("Sentence")]
        public List<HintSentencePartDef> Sentence { get; set; } = new List<HintSentencePartDef>();

        // NEW: Toggle for Inlay Hints
        [JsonProperty("IsEnabled")]
        public bool IsEnabled { get; set; } = true;
    }
}