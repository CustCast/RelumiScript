using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Newtonsoft.Json;

namespace RelumiScript.Models
{
    /// <summary>
    /// Represents a named definition with an ID and name, used for JSON deserialization.
    /// </summary>
    public class NameDef
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Name")]
        public string? Name { get; set; }
    }

    /// <summary>
    /// Represents a file name mapping with internal and friendly names.
    /// </summary>
    public class FileNameDef
    {
        public string FileName { get; set; } = "";
        public string FriendlyName { get; set; } = "";
    }

    /// <summary>
    /// Represents a file node containing multiple scripts.
    /// </summary>
    public class FileNode
    {
        public string Name { get; set; } = "Unknown";
        public string FileName { get; set; } = ""; // Stores raw asset name (e.g. "ev_script") for saving
        public bool IsMessage { get; set; }
        public List<ScriptNode> Scripts { get; set; } = new List<ScriptNode>();

        // Computed properties for UI binding
        public string Icon => IsMessage ? "💬" : "📜";
        public string Color => IsMessage ? "#569CD6" : "#4EC9B0";
    }

    /// <summary>
    /// Represents a single script with a label and content.
    /// </summary>
    public class ScriptNode
    {
        public string Label { get; set; } = "";
        public string Content { get; set; } = "";
    }

    /// <summary>
    /// Represents an open document tab in the editor.
    /// </summary>
    public class EditorDocument : INotifyPropertyChanged
    {
        private string _title = "";
        private bool _isDirty;
        private bool _isPreview;
        private string _content = "";

        public string Id { get; set; } = Guid.NewGuid().ToString();

        // Reference to the source node (either FileNode or ScriptNode)
        public object? SourceNode { get; set; }

        public string Title
        {
            get => _title + (_isDirty ? "*" : "");
            set { if (_title != value) { _title = value; OnPropertyChanged(); OnPropertyChanged(nameof(DisplayName)); } }
        }

        public string DisplayName => Title; // Helper for binding if needed

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

        // UI Helpers
        public string FontStyle => IsPreview ? "Italic" : "Normal";

        public event PropertyChangedEventHandler? PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string? name = null) =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}