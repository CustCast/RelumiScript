using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace RelumiScript.Models
{
    // Helper class for search results
    public class SearchResult : INotifyPropertyChanged
    {
        public string Type { get; set; } = "UNK"; // PKM, ITM, FLG, CMD, WRK, EVT
        public string Color { get; set; } = "White";
        public int Id { get; set; } // 0 if not applicable
        public string Name { get; set; } = "";

        public ObservableCollection<FlagLocation> Locations { get; set; } = new ObservableCollection<FlagLocation>();

        private bool _isExpanded;
        public bool IsExpanded
        {
            get => _isExpanded;
            set { _isExpanded = value; PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsExpanded))); }
        }

        public event PropertyChangedEventHandler? PropertyChanged;
    }

    public class FlagUsageInfo : INotifyPropertyChanged
    {
        public string FlagName { get; set; } = "";
        public string CountString => $"({Locations.Count})";
        public List<FlagLocation> Locations { get; set; } = new List<FlagLocation>();

        private bool _isExpanded;
        public bool IsExpanded
        {
            get => _isExpanded;
            set { _isExpanded = value; PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsExpanded))); }
        }

        public event PropertyChangedEventHandler? PropertyChanged;
    }

    public class EventUsageInfo : INotifyPropertyChanged
    {
        public string EventName { get; set; } = "";
        public string CountString => $"({Locations.Count})";
        public List<FlagLocation> Locations { get; set; } = new List<FlagLocation>();

        private bool _isExpanded;
        public bool IsExpanded
        {
            get => _isExpanded;
            set { _isExpanded = value; PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsExpanded))); }
        }

        public event PropertyChangedEventHandler? PropertyChanged;
    }

    public class CommandUsageInfo : INotifyPropertyChanged
    {
        public string CommandName { get; set; } = "";
        public string CountString => $"({Locations.Count} uses)";
        public List<FlagLocation> Locations { get; set; } = new List<FlagLocation>();

        private bool _isExpanded;
        public bool IsExpanded
        {
            get => _isExpanded;
            set { _isExpanded = value; PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsExpanded))); }
        }

        public event PropertyChangedEventHandler? PropertyChanged;
    }

    public class FlagLocation
    {
        public int LineNumber { get; set; }
        public string Command { get; set; } = "";
        public string Content { get; set; } = "";
        public string FileName { get; set; } = "";
        public object? NodeObject { get; set; }
        public bool IsDeclaration { get; set; } // True if this is the label definition
    }
}