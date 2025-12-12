using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

namespace RelumiScript
{
    public partial class DiscardChangesDialog : Window
    {
        public DiscardChangesDialog()
        {
            InitializeComponent();
        }

        public DiscardChangesDialog(string fileName) : this()
        {
            var msgText = this.FindControl<TextBlock>("MessageText");
            if (msgText != null)
            {
                msgText.Text = $"'{fileName}' has unsaved changes. If you close it now, your changes will be lost.";
            }
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }

        private void BtnCancel_Click(object? sender, RoutedEventArgs e)
        {
            Close(false); // Return false
        }

        private void BtnDiscard_Click(object? sender, RoutedEventArgs e)
        {
            Close(true); // Return true
        }
    }
}