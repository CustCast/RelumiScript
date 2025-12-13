using Avalonia;
using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;
using Avalonia.Media.Imaging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace RelumiScript
{
    public class AtlasData
    {
        [JsonProperty("size")] public int Size { get; set; }
        [JsonProperty("glyphs")] public Dictionary<string, GlyphData>? Glyphs { get; set; }
    }

    public class GlyphData
    {
        [JsonProperty("p")] public int Page { get; set; }
        [JsonProperty("x")] public int X { get; set; }
        [JsonProperty("y")] public int Y { get; set; }
        [JsonProperty("w")] public int Width { get; set; }
        [JsonProperty("h")] public int Height { get; set; }
        [JsonProperty("ox")] public int OffsetX { get; set; }
        [JsonProperty("oy")] public int OffsetY { get; set; }
        [JsonProperty("ax")] public double AdvanceX { get; set; }
    }

    public class MessageRenderer
    {
        private Dictionary<string, double> _metrics = new Dictionary<string, double>();

        private const double BaseFontSize = 54.0;
        private const double BaseMetric = 573.0;
        private const double MaxWidth = 1080.0;
        private const string CalibrationPhrase = "Oh. And it needs to be found and caught down";
        private const double TextScale = 1;

        private double _canvasWidth = 1500;
        private double _canvasHeight = 230;

        private const int MaxLinesPerPage = 2;

        private double _baseMetricCalculated = BaseMetric;
        private double _pixelsPerUnitCalculated = 1.88;

        private string _assetDir;
        private Bitmap? _bgImage;
        private AtlasData? _atlasData;
        private List<Bitmap> _atlasPages = new List<Bitmap>();

        public MessageRenderer(string assetRoot)
        {
            _assetDir = assetRoot;
            LoadMetrics();
            CalibrateMetrics();
            LoadBackground();
            LoadAtlas();
        }

        private void LoadMetrics()
        {
            string path = Path.Combine(_assetDir, "strlength.txt");
            if (!File.Exists(path)) return;

            var lines = File.ReadAllLines(path);
            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line) || line.StartsWith("//")) continue;
                if (line.StartsWith(" ") && line.TrimStart().Length > 0 && char.IsDigit(line.TrimStart()[0]))
                {
                    if (double.TryParse(line.Trim(), out double val)) _metrics[" "] = val;
                    continue;
                }
                var parts = line.Split(new[] { ' ', ',' }, 2, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length == 2 && double.TryParse(parts[1], out double width)) _metrics[parts[0]] = width;
            }
            if (!_metrics.ContainsKey(" ")) _metrics[" "] = 8.671875;
        }

        private void CalibrateMetrics()
        {
            _baseMetricCalculated = MeasureText(CalibrationPhrase);
            if (_baseMetricCalculated > 0) _pixelsPerUnitCalculated = MaxWidth / _baseMetricCalculated;
        }

        private void LoadBackground()
        {
            string path = Path.Combine(_assetDir, "textbox.png");
            if (File.Exists(path))
            {
                try
                {
                    _bgImage = new Bitmap(path);
                    _canvasWidth = _bgImage.PixelSize.Width;
                    _canvasHeight = _bgImage.PixelSize.Height > 0 ? _bgImage.PixelSize.Height : 230;
                }
                catch (Exception ex) { System.Diagnostics.Debug.WriteLine($"[MessageRenderer] BG Load Error: {ex.Message}"); }
            }
        }

        private void LoadAtlas()
        {
            string fontDir = Path.Combine(_assetDir, "Fonts");
            string mapPath = Path.Combine(fontDir, "atlas_map.json");
            if (File.Exists(mapPath))
            {
                try
                {
                    string json = File.ReadAllText(mapPath);
                    _atlasData = JsonConvert.DeserializeObject<AtlasData>(json);
                    if (_atlasData?.Glyphs != null)
                    {
                        var safeMap = new Dictionary<string, GlyphData>(StringComparer.OrdinalIgnoreCase);
                        foreach (var kvp in _atlasData.Glyphs) safeMap[kvp.Key] = kvp.Value;
                        _atlasData.Glyphs = safeMap;
                    }
                    int pageIndex = 0;
                    while (true)
                    {
                        string imgPath = Path.Combine(fontDir, $"atlas_{pageIndex}.png");
                        if (!File.Exists(imgPath)) break;
                        _atlasPages.Add(new Bitmap(imgPath));
                        pageIndex++;
                    }
                }
                catch (Exception ex) { System.Diagnostics.Debug.WriteLine($"[MessageRenderer] Atlas Load Error: {ex.Message}"); }
            }
        }

        public List<string> SplitIntoPages(string rawText)
        {
            var pages = new List<string>();
            if (string.IsNullOrEmpty(rawText)) return pages;
            var lines = rawText.Split(new[] { "{n}" }, StringSplitOptions.None);
            for (int i = 0; i < lines.Length; i += MaxLinesPerPage)
            {
                var pageLines = lines.Skip(i).Take(MaxLinesPerPage);
                pages.Add(string.Join("\n", pageLines));
            }
            return pages;
        }

        public double MeasureText(string text)
        {
            double width = 0;
            for (int i = 0; i < text.Length; i++)
            {
                if (i + 2 < text.Length && text.Substring(i, 3) == "{n}") { width += 343.6875; i += 2; continue; }
                string c = text[i].ToString();
                if (c == "'") c = "’";
                if (_metrics.TryGetValue(c, out double val)) width += val;
                else if (char.IsDigit(c[0])) width += 15.0;
                else width += 8.67;
            }
            return width;
        }

        public Canvas RenderPage(string pageText, int pageNumber, int totalPages)
        {
            var canvas = new Canvas
            {
                Width = _canvasWidth,
                Height = _canvasHeight,
                ClipToBounds = true,
                Background = _bgImage != null
                    ? new ImageBrush { Source = _bgImage, Stretch = Stretch.Fill, AlignmentX = AlignmentX.Left, AlignmentY = AlignmentY.Top }
                    : Brushes.Transparent
            };

            if (string.IsNullOrEmpty(pageText) || _atlasData?.Glyphs == null || _atlasPages.Count == 0) return canvas;

            var lines = pageText.Split(new[] { '\n' }, StringSplitOptions.None);
            double currentY = 40;
            double startX = 100;
            double refSize = _atlasData.Size;

            foreach (var line in lines)
            {
                double lineWidth = MeasureText(line);
                double lineScale = lineWidth > _baseMetricCalculated ? (_baseMetricCalculated / lineWidth) : 1.0;
                double targetFontSize = (BaseFontSize * lineScale) * TextScale;
                double renderScale = targetFontSize / refSize;
                double cursorX = startX;

                foreach (char c in line)
                {
                    string charStr = c.ToString();
                    if (charStr == "'") charStr = "’"; // Normalize apostrophe to match metrics

                    double metricWidth = 8.67;
                    if (_metrics.TryGetValue(charStr, out double w)) metricWidth = w;
                    else if (char.IsDigit(c)) metricWidth = 15.0;

                    // Calculate advance using metrics (strlength.txt) rather than texture atlas data
                    double advancePx = (metricWidth * _pixelsPerUnitCalculated * lineScale) * TextScale;

                    if (c == ' ') { cursorX += advancePx; continue; }

                    string hex = ((int)c).ToString("X4");
                    if (_atlasData.Glyphs.TryGetValue(hex, out GlyphData? data) && data != null && data.Page < _atlasPages.Count)
                    {
                        var croppedBitmap = new CroppedBitmap(_atlasPages[data.Page], new PixelRect(data.X, data.Y, data.Width, data.Height));
                        var img = new Image
                        {
                            Source = croppedBitmap,
                            Width = data.Width * renderScale,
                            Height = data.Height * renderScale,
                            Stretch = Stretch.Fill
                        };
                        Canvas.SetLeft(img, cursorX + (data.OffsetX * renderScale));
                        Canvas.SetTop(img, currentY + (data.OffsetY * renderScale));
                        canvas.Children.Add(img);

                        // Use calculated metric advance for cursor position
                        cursorX += advancePx;
                    }
                    else
                    {
                        var err = new Border { Background = Brushes.Red, Width = 10, Height = targetFontSize };
                        Canvas.SetLeft(err, cursorX); Canvas.SetTop(err, currentY);
                        canvas.Children.Add(err);
                        cursorX += advancePx;
                    }
                }
                currentY += (targetFontSize + 10);
            }

            if (totalPages > 1)
            {
                var pageIndicator = new TextBlock
                {
                    Text = $"Page {pageNumber}/{totalPages}",
                    Foreground = Brushes.White,
                    FontSize = 12,
                    FontWeight = FontWeight.Bold,
                    Opacity = 0.7
                };
                Canvas.SetRight(pageIndicator, 20);
                Canvas.SetBottom(pageIndicator, 15);
                canvas.Children.Add(pageIndicator);
            }
            return canvas;
        }

        // Legacy Render method kept for compatibility
        public Canvas Render(string rawText) => RenderPage(rawText.Replace("{n}", "\n"), 1, 1);
    }
}