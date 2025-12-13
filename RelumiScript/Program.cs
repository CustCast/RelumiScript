using System;
using Avalonia;
using Avalonia.WebView.Desktop;
using Avalonia.Svg.Skia;

namespace RelumiScript
{
    internal class Program
    {
        [STAThread]
        public static void Main(string[] args)
        {
            // REQUIRED: Initializes the SVG library resources
            GC.KeepAlive(typeof(SvgImage).Assembly);
            GC.KeepAlive(typeof(Avalonia.Svg.Skia.Svg).Assembly);

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            BuildAvaloniaApp()
                .StartWithClassicDesktopLifetime(args);
        }

        public static AppBuilder BuildAvaloniaApp()
            => AppBuilder.Configure<App>()
                .UsePlatformDetect()
                .WithInterFont()
                .LogToTrace()
                .UseDesktopWebView();
    }
}