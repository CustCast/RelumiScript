using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace RelumiScript.Models
{
    public class FileNode
    {
        public string Name { get; set; } = "";
        public string Icon { get; set; } = "📄"; // Default icon
        public List<ScriptNode> Scripts { get; set; } = new List<ScriptNode>();
    }

    public class ScriptNode
    {
        public string Label { get; set; } = "";
        public string Content { get; set; } = "";
    }
}