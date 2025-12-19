using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Input;
using Avalonia.Markup.Xaml;
using RelumiScript.ViewModels;

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

        public void TitleBar_PointerPressed(object sender, PointerPressedEventArgs e)
        {
            if (e.GetCurrentPoint(this).Properties.IsLeftButtonPressed)
            {
                BeginMoveDrag(e);
            }
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

        // New event handler for the "Add Ref" ComboBox
        public void OnAddRef_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (sender is ComboBox cb && cb.SelectedItem is HintParamViewModel param && DataContext is HintEditorViewModel mainVm)
            {
                // Reset selection so it can be clicked again
                cb.SelectedItem = null;

                if (mainVm.SelectedHint != null && !string.IsNullOrEmpty(param.Model.Ref))
                {
                    mainVm.SelectedHint.AddSentencePartWithRef(param.Model.Ref);
                }
            }
        }
    }
}