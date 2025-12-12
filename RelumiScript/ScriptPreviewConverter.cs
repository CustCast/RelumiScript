using Avalonia.Data.Converters;
using Avalonia.Media;
using RelumiScript.Models;
using RelumiScript.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Avalonia;

namespace RelumiScript
{
    // Model for a full line (contains segments)
    public class PreviewLineViewModel
    {
        public int LineNumber { get; set; }
        public IBrush Background { get; set; } = Brushes.Transparent;
        public IEnumerable<PreviewSegment> Segments { get; set; } = new List<PreviewSegment>();
    }

    // Model for a specific word/token
    public class PreviewSegment
    {
        public string Text { get; set; } = "";
        public IBrush Foreground { get; set; } = Brushes.White;
        public FontWeight Weight { get; set; } = FontWeight.Normal;
        public FontStyle Style { get; set; } = FontStyle.Normal;
    }

    public class ScriptPreviewConverter : IMultiValueConverter
    {
        public object? Convert(IList<object?> values, Type targetType, object? parameter, CultureInfo culture)
        {
            // Expects: [0] Node, [1] LineNumber, [2] ThemeVm
            if (values == null || values.Count < 3 || values[0] == null)
                return null;

            object nodeObj = values[0];
            if (values[1] is not int targetLine) return null;
            var themeVm = values[2] as ThemeEditorViewModel;

            try
            {
                string content = "";
                int startLineOffset = 0;

                // 1. Isolate the SPECIFIC EVENT
                if (nodeObj is FileNode fNode)
                {
                    bool found = false;
                    int currentOffset = 0;
                    foreach (var script in fNode.Scripts)
                    {
                        int lineCount = CountLines(script.Content);
                        if (targetLine > currentOffset && targetLine <= currentOffset + lineCount)
                        {
                            content = script.Content;
                            startLineOffset = currentOffset;
                            found = true;
                            break;
                        }
                        currentOffset += lineCount;
                    }
                    if (!found) return new List<PreviewLineViewModel>();
                }
                else if (nodeObj is ScriptNode sNode)
                {
                    content = sNode.Content;
                    startLineOffset = 0;
                }
                else return null;

                // 2. Generate Lines
                var allLines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
                var previewLines = new List<PreviewLineViewModel>();

                // Highlight Color (Dark Blue selection)
                IBrush colHighlight = new SolidColorBrush(Color.Parse("#264F78"));
                // Default theme background - Explicit cast to IBrush to fix CS0173
                IBrush themeBg = (themeVm?.Colors.BackgroundColor != null)
                    ? (IBrush)new SolidColorBrush(themeVm.Colors.BackgroundColor)
                    : Brushes.Transparent;

                for (int i = 0; i < allLines.Length; i++)
                {
                    int globalLineNumber = startLineOffset + i + 1;
                    bool isTarget = globalLineNumber == targetLine;
                    string lineText = allLines[i];

                    // Tokenize Line
                    var segments = TokenizeLine(lineText, themeVm?.Syntax);

                    previewLines.Add(new PreviewLineViewModel
                    {
                        LineNumber = globalLineNumber,
                        Background = isTarget ? colHighlight : themeBg,
                        Segments = segments
                    });
                }

                return previewLines;
            }
            catch (Exception ex)
            {
                return new List<PreviewLineViewModel> {
                    new PreviewLineViewModel {
                        Segments = new List<PreviewSegment> { new PreviewSegment { Text = "Error: " + ex.Message, Foreground = Brushes.Red } }
                    }
                };
            }
        }

        private IEnumerable<PreviewSegment> TokenizeLine(string line, SyntaxThemeVM? syntax)
        {
            var segments = new List<PreviewSegment>();
            if (string.IsNullOrEmpty(line)) return segments;
            if (syntax == null)
            {
                segments.Add(new PreviewSegment { Text = line });
                return segments;
            }

            string pattern = @"(//.*|;.*)|(""[^""]*"")|([#$@][\w]+)|(\w+:)|(\w+)|(\s+)|(.)";
            var matches = Regex.Matches(line, pattern);

            foreach (Match m in matches)
            {
                string text = m.Value;
                IBrush fg = syntax.Command.Brush;
                FontWeight weight = syntax.Command.Weight;
                FontStyle style = syntax.Command.FontStyle;

                if (string.IsNullOrWhiteSpace(text))
                {
                    segments.Add(new PreviewSegment { Text = text });
                    continue;
                }
                else if (text.StartsWith("//") || text.StartsWith(";"))
                {
                    fg = syntax.Comment.Brush;
                    weight = syntax.Comment.Weight;
                    style = syntax.Comment.FontStyle;
                }
                else if (text.StartsWith("\""))
                {
                    fg = syntax.String.Brush;
                    weight = syntax.String.Weight;
                    style = syntax.String.FontStyle;
                }
                else if (text.StartsWith("#"))
                {
                    fg = syntax.Flag.Brush;
                    weight = syntax.Flag.Weight;
                    style = syntax.Flag.FontStyle;
                }
                else if (text.StartsWith("$"))
                {
                    fg = syntax.SysFlag.Brush;
                    weight = syntax.SysFlag.Weight;
                    style = syntax.SysFlag.FontStyle;
                }
                else if (text.StartsWith("@"))
                {
                    fg = syntax.WorkVar.Brush;
                    weight = syntax.WorkVar.Weight;
                    style = syntax.WorkVar.FontStyle;
                }
                else if (char.IsDigit(text[0]))
                {
                    fg = syntax.Number.Brush;
                    weight = syntax.Number.Weight;
                    style = syntax.Number.FontStyle;
                }
                else if (text.EndsWith(":"))
                {
                    fg = syntax.ScriptLabel.Brush;
                    weight = syntax.ScriptLabel.Weight;
                    style = syntax.ScriptLabel.FontStyle;
                }
                else if (text == ":" || text == "(" || text == ")")
                {
                    fg = Brushes.White;
                    weight = FontWeight.Normal;
                }

                segments.Add(new PreviewSegment
                {
                    Text = text,
                    Foreground = fg,
                    Weight = weight,
                    Style = style
                });
            }

            return segments;
        }

        private int CountLines(string s)
        {
            if (string.IsNullOrEmpty(s)) return 0;
            return s.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None).Length;
        }
    }
}