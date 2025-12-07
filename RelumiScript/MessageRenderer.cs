using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;
using Avalonia.Media.Imaging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace RelumiScript
{
    public class MessageRenderer
    {
        private Dictionary<string, double> _metrics = new Dictionary<string, double>();
        private const double BaseFontSize = 54.0;
        private const double BaseMetric = 573.0;

        private string _assetDir;
        private Bitmap _bgImage;

        // Constructor now requires the path to the 'Assets' folder
        public MessageRenderer(string assetRoot)
        {
            _assetDir = assetRoot;
            LoadMetrics();
            LoadBackground();
        }

        private void LoadMetrics()
        {
            string path = Path.Combine(_assetDir, "strlength.txt");
            if (File.Exists(path))
            {
                foreach (var line in File.ReadAllLines(path))
                {
                    if (string.IsNullOrWhiteSpace(line) || line.StartsWith("//")) continue;
                    var parts = line.Split(new[] { ' ', ',' }, 2, StringSplitOptions.RemoveEmptyEntries);
                    if (parts.Length == 2 && double.TryParse(parts[1], out double width))
                    {
                        _metrics[parts[0]] = width;
                    }
                }
            }
        }

        private void LoadBackground()
        {
            string path = Path.Combine(_assetDir, "textbox.png");
            if (File.Exists(path))
            {
                _bgImage = new Bitmap(path);
            }
        }

        public double MeasureText(string text)
        {
            double width = 0;
            for (int i = 0; i < text.Length; i++)
            {
                if (i + 2 < text.Length && text.Substring(i, 3) == "{n}")
                {
                    width += 343.6875;
                    i += 2;
                    continue;
                }

                string c = text[i].ToString();
                if (c == "'") c = "’";

                if (_metrics.TryGetValue(c, out double val)) width += val;
                else if (char.IsDigit(c[0])) width += 15.0;
                else width += _metrics.GetValueOrDefault(" ", 8.67);
            }
            return width;
        }

        public Control Render(string rawText)
        {
            var canvas = new Canvas
            {
                Width = 1500,
                Height = 340,
                Background = _bgImage != null ? new ImageBrush { Source = _bgImage, Stretch = Stretch.None, AlignmentX = AlignmentX.Left, AlignmentY = AlignmentY.Top } : Brushes.Gray
            };

            if (string.IsNullOrEmpty(rawText)) return canvas;

            var lines = rawText.Replace("{n}", "\n").Replace("\\r", "").Split('\n');

            double currentY = 50;
            double startX = 110;

            foreach (var line in lines)
            {
                double lineWidth = MeasureText(line);
                double scale = lineWidth > BaseMetric ? (BaseMetric / lineWidth) : 1.0;
                double fontSize = BaseFontSize * scale;
                double renderHeight = fontSize;

                var linePanel = new StackPanel
                {
                    Orientation = Orientation.Horizontal,
                    Height = renderHeight
                };

                Canvas.SetLeft(linePanel, startX);
                Canvas.SetTop(linePanel, currentY);

                foreach (char c in line)
                {
                    if (c == ' ')
                    {
                        linePanel.Children.Add(new Panel { Width = (fontSize / 3) });
                        continue;
                    }

                    string hex = ((int)c).ToString("X4");
                    string imgPath = Path.Combine(_assetDir, "Fonts", $"{hex}.png");

                    if (File.Exists(imgPath))
                    {
                        var img = new Image
                        {
                            Source = new Bitmap(imgPath),
                            Height = fontSize,
                            Stretch = Stretch.Uniform
                        };
                        linePanel.Children.Add(img);
                    }
                    else
                    {
                        linePanel.Children.Add(new Border { Background = Brushes.Red, Width = fontSize / 2, Height = fontSize });
                    }
                }

                canvas.Children.Add(linePanel);
                currentY += (renderHeight + 10);
            }

            return new Viewbox { Child = canvas, Stretch = Stretch.Uniform };
        }
    }
}