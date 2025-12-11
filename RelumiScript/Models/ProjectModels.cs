using System.Collections.Generic;
using Newtonsoft.Json; // Required for [JsonProperty]

namespace RelumiScript
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
}