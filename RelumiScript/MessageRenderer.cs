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
using System.Text.RegularExpressions;

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

    public class MessageRenderer : IDisposable
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

        private readonly string _assetDir;
        private Bitmap? _bgImage;
        private AtlasData? _atlasData;
        private readonly List<Bitmap> _atlasPages = new List<Bitmap>();

        // Optimization: Cache cropped bitmaps to avoid allocation on every frame/char
        private readonly Dictionary<string, CroppedBitmap> _glyphCache = new Dictionary<string, CroppedBitmap>();

        public MessageRenderer(string assetRoot)
        {
            _assetDir = assetRoot;
            LoadMetrics();
            CalibrateMetrics();
            LoadBackground();
            LoadAtlas();
        }

        private sealed class LineLayout
        {
            public double LineScale { get; init; }
            public double TargetFontSize { get; init; }
            public double RenderScale { get; init; }
        }

        public void Dispose()
        {
            _bgImage?.Dispose();
            foreach (var bmp in _atlasPages) bmp.Dispose();
            _atlasPages.Clear();

            foreach (var bmp in _glyphCache.Values) bmp.Dispose();
            _glyphCache.Clear();
        }

        private void LoadMetrics()
        {
            string path = Path.Combine(_assetDir, "strlength.txt");
            if (!File.Exists(path))
            {
                if (!_metrics.ContainsKey(" ")) _metrics[" "] = 8.671875;
                return;
            }

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
            if (!File.Exists(mapPath)) return;

            try
            {
                string json = File.ReadAllText(mapPath);
                _atlasData = JsonConvert.DeserializeObject<AtlasData>(json);

                if (_atlasData?.Glyphs == null) return;

                // Normalize keys
                var safeMap = new Dictionary<string, GlyphData>(StringComparer.OrdinalIgnoreCase);
                foreach (var kvp in _atlasData.Glyphs) safeMap[kvp.Key] = kvp.Value;
                _atlasData.Glyphs = safeMap;

                // Load Pages
                int pageIndex = 0;
                while (true)
                {
                    string imgPath = Path.Combine(fontDir, $"atlas_{pageIndex}.png");
                    if (!File.Exists(imgPath)) break;
                    _atlasPages.Add(new Bitmap(imgPath));
                    pageIndex++;
                }

                // Pre-cache Glyphs
                foreach (var kvp in _atlasData.Glyphs)
                {
                    var data = kvp.Value;
                    if (data.Page < _atlasPages.Count)
                    {
                        try
                        {
                            var cropped = new CroppedBitmap(
                                _atlasPages[data.Page],
                                new PixelRect(data.X, data.Y, data.Width, data.Height)
                            );
                            _glyphCache[kvp.Key] = cropped;
                        }
                        catch { /* Ignore invalid glyphs */ }
                    }
                }
            }
            catch (Exception ex) { System.Diagnostics.Debug.WriteLine($"[MessageRenderer] Atlas Load Error: {ex.Message}"); }
        }

        public List<string> SplitIntoPages(string rawText, bool macro = false)
        {
            var pages = new List<string>();
            string? lastLine = null;

            if (string.IsNullOrEmpty(rawText)) return pages;

            var currentPage = new List<string>();

            string normalizedText = rawText;

            if (macro)
            {
                normalizedText = normalizedText
                    .Replace("\\n", "{n}")
                    .Replace("\\f", "{f}")
                    .Replace("\\r", "{r}");
            }

            var tokens = Regex.Split(normalizedText, @"(\{n\}|\{f\}|\{r\})");

            for (int i = 0; i < tokens.Length; i++)
            {
                var token = tokens[i];

                switch (token)
                {
                    case "{n}":
                        break;

                    case "{r}":
                        if (currentPage.Count > 0)
                        {
                            pages.Add(string.Join("\n", currentPage));
                            currentPage.Clear();
                        }
                        lastLine = null;
                        break;

                    case "{f}":
                        if (currentPage.Count > 0)
                        {
                            pages.Add(string.Join("\n", currentPage));
                            currentPage.Clear();
                        }
                        if (lastLine != null)
                        {
                            currentPage.Add(lastLine);
                        }

                        if (i + 1 < tokens.Length && !IsControlToken(tokens[i + 1]))
                        {
                            currentPage.Add(tokens[i + 1]);
                            lastLine = tokens[i + 1];
                            i++;
                        }
                        break;

                    default:
                        if (!string.IsNullOrEmpty(token))
                        {
                            currentPage.Add(token);
                            lastLine = token;

                            if (currentPage.Count >= MaxLinesPerPage)
                            {
                                pages.Add(string.Join("\n", currentPage));
                                currentPage.Clear();
                            }
                        }
                        break;
                }
            }

            if (currentPage.Count > 0)
            {
                pages.Add(string.Join("\n", currentPage));
            }

            return pages;
        }

        private static bool IsControlToken(string token)
        {
            return token == "{n}" || token == "{f}" || token == "{r}";
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

        private static string[] SplitLines(string text)
        {
            return text.Split(new[] { '\n' }, StringSplitOptions.None);
        }

        private LineLayout CalculateLineLayout(string line, double refSize)
        {
            double lineWidth = MeasureText(line);
            double lineScale = lineWidth > _baseMetricCalculated
                ? (_baseMetricCalculated / lineWidth)
                : 1.0;

            double targetFontSize = BaseFontSize * lineScale * TextScale;
            double renderScale = targetFontSize / refSize;

            return new LineLayout
            {
                LineScale = lineScale,
                TargetFontSize = targetFontSize,
                RenderScale = renderScale
            };
        }

        private static string NormalizeChar(char c)
        {
            return c == '\'' ? "’" : c.ToString();
        }

        private double CalculateAdvance(char c, double lineScale)
        {
            string charStr = NormalizeChar(c);

            double metricWidth = 8.67;
            if (_metrics.TryGetValue(charStr, out double w))
                metricWidth = w;
            else if (char.IsDigit(c))
                metricWidth = 15.0;

            return metricWidth * _pixelsPerUnitCalculated * lineScale * TextScale;
        }

        private bool TryRenderGlyph(
            Canvas canvas,
            char c,
            double cursorX,
            double currentY,
            double renderScale
        )
        {
            string hex = ((int)c).ToString("X4");

            // Look up in cache directly
            if (!_atlasData!.Glyphs!.TryGetValue(hex, out GlyphData? data) ||
                !_glyphCache.TryGetValue(hex, out var croppedBitmap))
            {
                return false;
            }

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
            return true;
        }

        private static void RenderMissingGlyph(
            Canvas canvas,
            double cursorX,
            double currentY,
            double targetFontSize
        )
        {
            var err = new Border
            {
                Background = Brushes.Red,
                Width = 10,
                Height = targetFontSize
            };

            Canvas.SetLeft(err, cursorX);
            Canvas.SetTop(err, currentY);
            canvas.Children.Add(err);
        }

        private void RenderLine(
            Canvas canvas,
            string line,
            LineLayout layout,
            double startX,
            double currentY
        )
        {
            double cursorX = startX;

            foreach (char c in line)
            {
                double advancePx = CalculateAdvance(c, layout.LineScale);

                if (c == ' ')
                {
                    cursorX += advancePx;
                    continue;
                }

                bool rendered = TryRenderGlyph(
                    canvas,
                    c,
                    cursorX,
                    currentY,
                    layout.RenderScale
                );

                if (!rendered)
                {
                    RenderMissingGlyph(canvas, cursorX, currentY, layout.TargetFontSize);
                }

                cursorX += advancePx;
            }
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

            var lines = SplitLines(pageText);

            double currentY = 40;
            double startX = 100;
            double refSize = _atlasData.Size;

            foreach (var line in lines)
            {
                var lineLayout = CalculateLineLayout(line, refSize);

                RenderLine(
                    canvas,
                    line,
                    lineLayout,
                    startX,
                    currentY
                );

                currentY += lineLayout.TargetFontSize + 10;
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

        public Canvas Render(string rawText) => RenderPage(rawText.Replace("{n}", "\n"), 1, 1);
    }
}