using Avalonia.Data.Converters;
using Avalonia.Media;
using Avalonia.Media.Imaging;
using Avalonia.Platform;
using Avalonia.Svg.Skia;
using SkiaSharp;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Runtime.CompilerServices;

namespace RelumiScript.ViewModels
{
    public class ThemeSettings
    {
        public ThemeColors Colors { get; set; } = new ThemeColors();
        public ThemeIcons Icons { get; set; } = new ThemeIcons();
        public SyntaxTheme Syntax { get; set; } = new SyntaxTheme();
    }

    public class ThemeIcons
    {
        public string Open { get; set; } = "folder.svg";
        public string Explorer { get; set; } = "files.svg";
        public string Search { get; set; } = "search.svg";
        public string Flags { get; set; } = "flag.svg";
        public string Commands { get; set; } = "tools.svg";
        public string Theme { get; set; } = "palette.svg";
        public string Preview { get; set; } = "eye.svg";
        public string Terminal { get; set; } = "terminal.svg";
    }

    public class ThemeColors
    {
        public string Background { get; set; } = "#FF1E1E1E";
        public string Foreground { get; set; } = "#FFF8F8F2";
        public string WindowBackground { get; set; } = "#FF1E1E1E";
        public string SidebarBackground { get; set; } = "#FF252526";
        public string PanelBackground { get; set; } = "#FF1E1E1E";
        public string ActivityBarBackground { get; set; } = "#FF333333";
        public string AccentColor { get; set; } = "#FF007ACC";
        public string TextColor { get; set; } = "#FFCCCCCC";
        public string InputBackground { get; set; } = "#FF3C3C3C";
        public string InputForeground { get; set; } = "#FFCCCCCC";
        public string ActivityForeground { get; set; } = "#FF858585";
        public string ActivityActiveForeground { get; set; } = "#FFFFFFFF";
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

    public class ThemeEditorViewModel : INotifyPropertyChanged
    {
        public ThemeColorsVM Colors { get; set; } = new ThemeColorsVM();
        public ThemeIconsVM Icons { get; set; } = new ThemeIconsVM();
        public SyntaxThemeVM Syntax { get; set; } = new SyntaxThemeVM();

        public ObservableCollection<string> AvailableThemes { get; set; } = new ObservableCollection<string>();

        private string _currentThemeName = "Default";
        public string CurrentThemeName
        {
            get => _currentThemeName;
            set { _currentThemeName = value; OnPropertyChanged(); }
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string? propertyName = null) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));

        public void LoadFromSettings(ThemeSettings s)
        {
            if (Color.TryParse(s.Colors.Background, out var bg)) Colors.BackgroundColor = bg;
            if (Color.TryParse(s.Colors.Foreground, out var fg)) Colors.ForegroundColor = fg;
            if (Color.TryParse(s.Colors.WindowBackground, out var wbg)) Colors.WindowBackground = wbg;
            if (Color.TryParse(s.Colors.SidebarBackground, out var sbg)) Colors.SidebarBackground = sbg;
            if (Color.TryParse(s.Colors.PanelBackground, out var pbg)) Colors.PanelBackground = pbg;
            if (Color.TryParse(s.Colors.ActivityBarBackground, out var abg)) Colors.ActivityBarBackground = abg;
            if (Color.TryParse(s.Colors.AccentColor, out var acc)) Colors.AccentColor = acc;
            if (Color.TryParse(s.Colors.TextColor, out var txt)) Colors.TextColor = txt;
            if (Color.TryParse(s.Colors.InputBackground, out var ibg)) Colors.InputBackground = ibg;
            if (Color.TryParse(s.Colors.InputForeground, out var ifg)) Colors.InputForeground = ifg;
            if (Color.TryParse(s.Colors.ActivityForeground, out var afg)) Colors.ActivityForeground = afg;
            if (Color.TryParse(s.Colors.ActivityActiveForeground, out var aafg)) Colors.ActivityActiveForeground = aafg;

            Icons.Load(s.Icons);

            Syntax.ScriptLabel.Load(s.Syntax.ScriptLabel);
            Syntax.WorkVar.Load(s.Syntax.WorkVar);
            Syntax.Flag.Load(s.Syntax.Flag);
            Syntax.SysFlag.Load(s.Syntax.SysFlag);
            Syntax.Command.Load(s.Syntax.Command);
            Syntax.Number.Load(s.Syntax.Number);
            Syntax.String.Load(s.Syntax.String);
            Syntax.Comment.Load(s.Syntax.Comment);

            OnPropertyChanged(nameof(Colors));
            OnPropertyChanged(nameof(Icons));
            OnPropertyChanged(nameof(Syntax));
        }

        public ThemeSettings ToSettings()
        {
            return new ThemeSettings
            {
                Colors = new ThemeColors
                {
                    Background = ThemeColorsVM.ToHex(Colors.BackgroundColor),
                    Foreground = ThemeColorsVM.ToHex(Colors.ForegroundColor),
                    WindowBackground = ThemeColorsVM.ToHex(Colors.WindowBackground),
                    SidebarBackground = ThemeColorsVM.ToHex(Colors.SidebarBackground),
                    PanelBackground = ThemeColorsVM.ToHex(Colors.PanelBackground),
                    ActivityBarBackground = ThemeColorsVM.ToHex(Colors.ActivityBarBackground),
                    AccentColor = ThemeColorsVM.ToHex(Colors.AccentColor),
                    TextColor = ThemeColorsVM.ToHex(Colors.TextColor),
                    InputBackground = ThemeColorsVM.ToHex(Colors.InputBackground),
                    InputForeground = ThemeColorsVM.ToHex(Colors.InputForeground),
                    ActivityForeground = ThemeColorsVM.ToHex(Colors.ActivityForeground),
                    ActivityActiveForeground = ThemeColorsVM.ToHex(Colors.ActivityActiveForeground),
                },
                Icons = Icons.ToModel(),
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

    public class ThemeIconsVM : INotifyPropertyChanged
    {
        private string _basePath = "";
        private string _open = "folder.svg";
        private string _explorer = "files.svg";
        private string _search = "search.svg";
        private string _flags = "flag.svg";
        private string _commands = "tools.svg";
        private string _theme = "palette.svg";
        private string _preview = "eye.svg";
        private string _terminal = "terminal.svg";

        public string Open { get => _open; set { _open = value; NotifyChange(nameof(Open)); UpdateIcon(nameof(OpenIcon)); } }
        public string Explorer { get => _explorer; set { _explorer = value; NotifyChange(nameof(Explorer)); UpdateIcon(nameof(ExplorerIcon)); } }
        public string Search { get => _search; set { _search = value; NotifyChange(nameof(Search)); UpdateIcon(nameof(SearchIcon)); } }
        public string Flags { get => _flags; set { _flags = value; NotifyChange(nameof(Flags)); UpdateIcon(nameof(FlagsIcon)); } }
        public string Commands { get => _commands; set { _commands = value; NotifyChange(nameof(Commands)); UpdateIcon(nameof(CommandsIcon)); } }
        public string Theme { get => _theme; set { _theme = value; NotifyChange(nameof(Theme)); UpdateIcon(nameof(ThemeIcon)); } }
        public string Preview { get => _preview; set { _preview = value; NotifyChange(nameof(Preview)); UpdateIcon(nameof(PreviewIcon)); } }
        public string Terminal { get => _terminal; set { _terminal = value; NotifyChange(nameof(Terminal)); UpdateIcon(nameof(TerminalIcon)); } }

        public Bitmap? OpenIcon => LoadSvgToBitmap(Open);
        public Bitmap? ExplorerIcon => LoadSvgToBitmap(Explorer);
        public Bitmap? SearchIcon => LoadSvgToBitmap(Search);
        public Bitmap? FlagsIcon => LoadSvgToBitmap(Flags);
        public Bitmap? CommandsIcon => LoadSvgToBitmap(Commands);
        public Bitmap? ThemeIcon => LoadSvgToBitmap(Theme);
        public Bitmap? PreviewIcon => LoadSvgToBitmap(Preview);
        public Bitmap? TerminalIcon => LoadSvgToBitmap(Terminal);

        public bool HasOpen => OpenIcon != null;
        public bool HasExplorer => ExplorerIcon != null;
        public bool HasSearch => SearchIcon != null;
        public bool HasFlags => FlagsIcon != null;
        public bool HasCommands => CommandsIcon != null;
        public bool HasTheme => ThemeIcon != null;
        public bool HasPreview => PreviewIcon != null;
        public bool HasTerminal => TerminalIcon != null;

        public ThemeIconsVM()
        {
            FindIconsDirectory();
        }

        private void FindIconsDirectory()
        {
            string current = AppDomain.CurrentDomain.BaseDirectory;
            for (int i = 0; i < 5; i++)
            {
                string candidate = Path.Combine(current, "Icons");
                if (Directory.Exists(candidate))
                {
                    _basePath = candidate;
                    return;
                }
                var parent = Directory.GetParent(current);
                if (parent == null) break;
                current = parent.FullName;
            }
            _basePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Icons");
        }

        private Bitmap? LoadSvgToBitmap(string filename)
        {
            if (string.IsNullOrWhiteSpace(filename)) return null;
            if (string.IsNullOrEmpty(_basePath)) FindIconsDirectory();

            string path = Path.IsPathRooted(filename) ? filename : Path.Combine(_basePath, filename);

            if (!File.Exists(path)) return null;

            try
            {
                var svgSource = SvgSource.Load(path, null);
                if (svgSource?.Picture == null) return null;

                int width = 24;
                int height = 24;

                using (var bitmap = new SKBitmap(width, height))
                using (var canvas = new SKCanvas(bitmap))
                {
                    canvas.Clear(SKColors.Transparent);

                    var bounds = svgSource.Picture.CullRect;
                    float scaleX = width / bounds.Width;
                    float scaleY = height / bounds.Height;
                    var matrix = SKMatrix.CreateScale(scaleX, scaleY);

                    canvas.DrawPicture(svgSource.Picture, ref matrix);
                    canvas.Flush();

                    using (var imageStream = new MemoryStream())
                    {
                        using (var wStream = new SKManagedWStream(imageStream))
                        {
                            bitmap.Encode(wStream, SKEncodedImageFormat.Png, 100);
                        }
                        imageStream.Seek(0, SeekOrigin.Begin);
                        return new Bitmap(imageStream);
                    }
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"SVG Rasterize Error: {ex.Message}");
            }
            return null;
        }

        private void UpdateIcon(string propName)
        {
            NotifyChange(propName);
            NotifyChange("Has" + propName.Replace("Icon", ""));
        }

        public void Load(ThemeIcons i)
        {
            if (i == null) i = new ThemeIcons();

            if (!string.IsNullOrEmpty(i.Open)) Open = i.Open;
            if (!string.IsNullOrEmpty(i.Explorer)) Explorer = i.Explorer;
            if (!string.IsNullOrEmpty(i.Search)) Search = i.Search;
            if (!string.IsNullOrEmpty(i.Flags)) Flags = i.Flags;
            if (!string.IsNullOrEmpty(i.Commands)) Commands = i.Commands;
            if (!string.IsNullOrEmpty(i.Theme)) Theme = i.Theme;
            if (!string.IsNullOrEmpty(i.Preview)) Preview = i.Preview;
            if (!string.IsNullOrEmpty(i.Terminal)) Terminal = i.Terminal;
        }

        public ThemeIcons ToModel()
        {
            return new ThemeIcons
            {
                Open = Open,
                Explorer = Explorer,
                Search = Search,
                Flags = Flags,
                Commands = Commands,
                Theme = Theme,
                Preview = Preview,
                Terminal = Terminal
            };
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        private void NotifyChange(string p) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(p));
    }

    public class ThemeColorsVM : INotifyPropertyChanged
    {
        private Color _bg = Color.Parse("#FF1E1E1E");
        public Color BackgroundColor { get => _bg; set { _bg = value; OnChanged(); } }

        private Color _fg = Color.Parse("#FFF8F8F2");
        public Color ForegroundColor { get => _fg; set { _fg = value; OnChanged(); } }

        private Color _winBg = Color.Parse("#FF1E1E1E");
        public Color WindowBackground { get => _winBg; set { _winBg = value; OnChanged(); } }

        private Color _sideBg = Color.Parse("#FF252526");
        public Color SidebarBackground { get => _sideBg; set { _sideBg = value; OnChanged(); } }

        private Color _panelBg = Color.Parse("#FF1E1E1E");
        public Color PanelBackground { get => _panelBg; set { _panelBg = value; OnChanged(); } }

        private Color _actBg = Color.Parse("#FF333333");
        public Color ActivityBarBackground { get => _actBg; set { _actBg = value; OnChanged(); } }

        private Color _accent = Color.Parse("#FF007ACC");
        public Color AccentColor { get => _accent; set { _accent = value; OnChanged(); } }

        private Color _text = Color.Parse("#FFCCCCCC");
        public Color TextColor { get => _text; set { _text = value; OnChanged(); } }

        private Color _inputBg = Color.Parse("#FF3C3C3C");
        public Color InputBackground { get => _inputBg; set { _inputBg = value; OnChanged(); } }

        private Color _inputFg = Color.Parse("#FFCCCCCC");
        public Color InputForeground { get => _inputFg; set { _inputFg = value; OnChanged(); } }

        private Color _actFg = Color.Parse("#FF858585");
        public Color ActivityForeground { get => _actFg; set { _actFg = value; OnChanged(); } }

        private Color _actActiveFg = Color.Parse("#FFFFFFFF");
        public Color ActivityActiveForeground { get => _actActiveFg; set { _actActiveFg = value; OnChanged(); } }

        public static string ToHex(Color c)
        {
            if (c.A == 255) return $"#{c.R:X2}{c.G:X2}{c.B:X2}";
            return $"#{c.A:X2}{c.R:X2}{c.G:X2}{c.B:X2}";
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        protected void OnChanged([CallerMemberName] string name = "") => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
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

    // --- CONVERTER ADDED HERE TO ENSURE VISIBILITY ---
    public class ColorToBrushConverter : IValueConverter
    {
        public object? Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
        {
            if (value is Color color)
            {
                return new SolidColorBrush(color);
            }
            return Brushes.Transparent;
        }

        public object? ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}