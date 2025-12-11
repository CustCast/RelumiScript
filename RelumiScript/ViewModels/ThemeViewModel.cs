using Avalonia.Media;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace RelumiScript.ViewModels
{
    // --- Helper Classes for JSON Serialization ---
    public class ThemeSettings
    {
        public ThemeColors Colors { get; set; } = new ThemeColors();
        public SyntaxTheme Syntax { get; set; } = new SyntaxTheme();
    }

    public class ThemeColors
    {
        public string Background { get; set; } = "#FF282A36";
        public string Foreground { get; set; } = "#FFF8F8F2";
    }

    public class SyntaxTheme
    {
        public TokenStyle ScriptLabel { get; set; } = new TokenStyle { Color = "#FF569CD6", Style = "bold" };
        public TokenStyle WorkVar { get; set; } = new TokenStyle { Color = "#FFFFD700" };
        public TokenStyle Flag { get; set; } = new TokenStyle { Color = "#FF50FA7B" };
        public TokenStyle SysFlag { get; set; } = new TokenStyle { Color = "#FF8BE9FD", Style = "italic" };
        public TokenStyle Command { get; set; } = new TokenStyle { Color = "#FFBD93F9", Style = "bold" };
        public TokenStyle Number { get; set; } = new TokenStyle { Color = "#FFFFB86C" };
        public TokenStyle String { get; set; } = new TokenStyle { Color = "#FFF1FA8C" };
        public TokenStyle Comment { get; set; } = new TokenStyle { Color = "#FF6272A4" };
    }

    public class TokenStyle
    {
        public string Color { get; set; } = "";
        public string Style { get; set; } = "";
    }

    // --- View Model for Avalonia Bindings ---

    public class ThemeEditorViewModel : INotifyPropertyChanged
    {
        public ThemeColorsVM Colors { get; set; } = new ThemeColorsVM();
        public SyntaxThemeVM Syntax { get; set; } = new SyntaxThemeVM();

        public event PropertyChangedEventHandler? PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string? propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public void LoadFromSettings(ThemeSettings s)
        {
            if (Color.TryParse(s.Colors.Background, out var bg)) Colors.BackgroundColor = bg;
            if (Color.TryParse(s.Colors.Foreground, out var fg)) Colors.ForegroundColor = fg;

            Syntax.ScriptLabel.Load(s.Syntax.ScriptLabel);
            Syntax.WorkVar.Load(s.Syntax.WorkVar);
            Syntax.Flag.Load(s.Syntax.Flag);
            Syntax.SysFlag.Load(s.Syntax.SysFlag);
            Syntax.Command.Load(s.Syntax.Command);
            Syntax.Number.Load(s.Syntax.Number);
            Syntax.String.Load(s.Syntax.String);
            Syntax.Comment.Load(s.Syntax.Comment);

            OnPropertyChanged(nameof(Colors));
            OnPropertyChanged(nameof(Syntax));
        }

        public ThemeSettings ToSettings()
        {
            return new ThemeSettings
            {
                Colors = new ThemeColors
                {
                    Background = ThemeColorsVM.ToHex(Colors.BackgroundColor),
                    Foreground = ThemeColorsVM.ToHex(Colors.ForegroundColor)
                },
                Syntax = new SyntaxTheme
                {
                    ScriptLabel = Syntax.ScriptLabel.ToModel(),
                    WorkVar = Syntax.WorkVar.ToModel(),
                    Flag = Syntax.Flag.ToModel(),
                    SysFlag = Syntax.SysFlag.ToModel(),
                    Command = Syntax.Command.ToModel(),
                    Number = Syntax.Number.ToModel(),
                    String = Syntax.String.ToModel(),
                    Comment = Syntax.Comment.ToModel()
                }
            };
        }
    }

    public class ThemeColorsVM : INotifyPropertyChanged
    {
        private Color _bg = Color.Parse("#FF282A36");
        public Color BackgroundColor
        {
            get => _bg;
            set { _bg = value; OnPropertyChanged(nameof(BackgroundColor)); }
        }

        private Color _fg = Color.Parse("#FFF8F8F2");
        public Color ForegroundColor
        {
            get => _fg;
            set { _fg = value; OnPropertyChanged(nameof(ForegroundColor)); }
        }

        public static string ToHex(Color c)
        {
            if (c.A == 255)
                return $"#{c.R:X2}{c.G:X2}{c.B:X2}";
            return $"#{c.A:X2}{c.R:X2}{c.G:X2}{c.B:X2}";
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        protected void OnPropertyChanged(string name) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }

    public class SyntaxThemeVM
    {
        public TokenStyleVM ScriptLabel { get; set; } = new TokenStyleVM();
        public TokenStyleVM WorkVar { get; set; } = new TokenStyleVM();
        public TokenStyleVM Flag { get; set; } = new TokenStyleVM();
        public TokenStyleVM SysFlag { get; set; } = new TokenStyleVM();
        public TokenStyleVM Command { get; set; } = new TokenStyleVM();
        public TokenStyleVM Number { get; set; } = new TokenStyleVM();
        public TokenStyleVM String { get; set; } = new TokenStyleVM();
        public TokenStyleVM Comment { get; set; } = new TokenStyleVM();
    }

    public class TokenStyleVM : INotifyPropertyChanged
    {
        private Color _color = Avalonia.Media.Colors.White;
        public Color Color
        {
            get => _color;
            set
            {
                _color = value;
                OnPropertyChanged(nameof(Color));
                OnPropertyChanged(nameof(Brush));
            }
        }

        public ISolidColorBrush Brush => new SolidColorBrush(Color);

        private bool _bold;
        public bool IsBold { get => _bold; set { _bold = value; NotifyStyle(); } }

        private bool _italic;
        public bool IsItalic { get => _italic; set { _italic = value; NotifyStyle(); } }

        public FontWeight Weight => IsBold ? FontWeight.Bold : FontWeight.Normal;
        public FontStyle FontStyle => IsItalic ? FontStyle.Italic : FontStyle.Normal;

        private void NotifyStyle()
        {
            OnPropertyChanged(nameof(IsBold));
            OnPropertyChanged(nameof(IsItalic));
            OnPropertyChanged(nameof(Weight));
            OnPropertyChanged(nameof(FontStyle));
        }

        public void Load(TokenStyle s)
        {
            if (!string.IsNullOrEmpty(s.Color) && Color.TryParse(s.Color, out var c)) Color = c;

            string st = s.Style ?? "";
            IsBold = st.Contains("bold");
            IsItalic = st.Contains("italic");
        }

        public TokenStyle ToModel()
        {
            var parts = new List<string>();
            if (IsBold) parts.Add("bold");
            if (IsItalic) parts.Add("italic");

            return new TokenStyle
            {
                Color = ThemeColorsVM.ToHex(Color),
                Style = string.Join(" ", parts)
            };
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        protected void OnPropertyChanged(string name) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}