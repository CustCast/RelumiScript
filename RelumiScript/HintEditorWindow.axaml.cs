using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

namespace RelumiScript
{
    public partial class HintEditorWindow : Window
    {
        public HintEditorWindow()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }

        public void OnSave_Click(object? sender, RoutedEventArgs e)
        {
            // Return true to indicate we want to save
            Close(true);
        }

        public void OnCancel_Click(object? sender, RoutedEventArgs e)
        {
            // Return false to indicate cancellation
            Close(false);
        }
    }
}