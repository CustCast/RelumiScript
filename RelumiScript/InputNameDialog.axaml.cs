using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

namespace RelumiScript
{
    public partial class InputNameDialog : Window
    {
        public InputNameDialog()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }

        private void BtnCancel_Click(object? sender, RoutedEventArgs e)
        {
            Close(null);
        }

        private void BtnOk_Click(object? sender, RoutedEventArgs e)
        {
            var box = this.FindControl<TextBox>("InputBox");
            Close(box?.Text ?? "");
        }
    }
}