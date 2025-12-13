using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using Avalonia.Media;
using RelumiScript.Services;
using RelumiScript.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace RelumiScript
{
    // ViewModel for binding in the dialog
    public class CommandArgViewModel
    {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string Types { get; set; } = ""; // Comma separated for UI
        public bool IsOptional { get; set; }
    }

    public partial class EditDataDialog : Window
    {
        private string _type;
        private int _originalId;
        private AssetBundleService _service;
        private Dictionary<int, string> _workMap;

        // Manual Control References
        private TextBlock? _headerTitle;
        private TextBlock? _headerSubtitle;
        // private TextBox? _inputId; // Removed
        private TextBox? _inputName;
        private TextBox? _inputDescription;
        private StackPanel? _descriptionPanel;
        private StackPanel? _parametersPanel;
        private ItemsControl? _paramsList;
        private TextBlock? _errorText;

        public ObservableCollection<CommandArgViewModel> Parameters { get; set; } = new ObservableCollection<CommandArgViewModel>();

        public EditDataDialog()
        {
            InitializeComponent();
        }

        public EditDataDialog(string type, int id, string name, string desc, List<CommandArg> paramsList, AssetBundleService service, Dictionary<int, string> workMap, ThemeEditorViewModel themeVm)
        {
            InitializeComponent();
            _type = type;
            _originalId = id;
            _service = service;
            _workMap = workMap;

            // Apply theme resources
            if (themeVm != null)
            {
                var colors = themeVm.Colors;
                this.Resources["ThemeWindowBackground"] = new SolidColorBrush(colors.WindowBackground);
                this.Resources["ThemeInputBackground"] = new SolidColorBrush(colors.InputBackground);
                this.Resources["ThemeInputForeground"] = new SolidColorBrush(colors.InputForeground);
                this.Resources["ThemeTextColor"] = new SolidColorBrush(colors.TextColor);
                this.Resources["ThemeAccentColor"] = new SolidColorBrush(colors.AccentColor);
                this.Resources["ThemePanelBackground"] = new SolidColorBrush(colors.PanelBackground);
            }

            // Wire up controls manually
            _headerTitle = this.FindControl<TextBlock>("HeaderTitle");
            _headerSubtitle = this.FindControl<TextBlock>("HeaderSubtitle");
            // _inputId = this.FindControl<TextBox>("InputId"); // Removed
            _inputName = this.FindControl<TextBox>("InputName");
            _inputDescription = this.FindControl<TextBox>("InputDescription");
            _descriptionPanel = this.FindControl<StackPanel>("DescriptionPanel");
            _parametersPanel = this.FindControl<StackPanel>("ParametersPanel");
            _paramsList = this.FindControl<ItemsControl>("ParamsList");
            _errorText = this.FindControl<TextBlock>("ErrorText");

            // Set Initial Values
            // if (_inputId != null) _inputId.Text = id.ToString(); // Removed
            if (_inputName != null) _inputName.Text = name;
            if (_inputDescription != null) _inputDescription.Text = desc;

            // Setup UI based on type
            if (type == "CMD")
            {
                if (_headerTitle != null) _headerTitle.Text = "Edit Command";
                if (_headerSubtitle != null) _headerSubtitle.Text = $"Editing Command ID {id}";

                if (_descriptionPanel != null) _descriptionPanel.IsVisible = true;
                if (_parametersPanel != null) _parametersPanel.IsVisible = true;

                foreach (var p in paramsList)
                {
                    Parameters.Add(new CommandArgViewModel
                    {
                        Name = p.TentativeName,
                        Description = p.Description,
                        Types = string.Join(", ", p.Type),
                        IsOptional = p.Optional
                    });
                }
                if (_paramsList != null) _paramsList.ItemsSource = Parameters;
            }
            else
            {
                if (_descriptionPanel != null) _descriptionPanel.IsVisible = false;
                if (_parametersPanel != null) _parametersPanel.IsVisible = false;

                string typeName = type == "FLG" ? "Flag" : (type == "SYS" ? "System Flag" : "Work Variable");
                if (_headerTitle != null) _headerTitle.Text = $"Edit {typeName}";
                if (_headerSubtitle != null) _headerSubtitle.Text = $"Editing {typeName} ID {id}";
            }
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }

        public void BtnAddParam_Click(object? sender, RoutedEventArgs e)
        {
            Parameters.Add(new CommandArgViewModel
            {
                Name = "New Parameter",
                Types = "Work, Number"
            });
        }

        public void BtnRemoveParam_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Button btn && btn.Tag is CommandArgViewModel wrapper)
            {
                Parameters.Remove(wrapper);
            }
        }

        public void BtnCancel_Click(object? sender, RoutedEventArgs e)
        {
            Close(false);
        }

        public void BtnSave_Click(object? sender, RoutedEventArgs e)
        {
            if (_inputName == null) return;

            // ID is no longer editable, so we use _originalId
            int newId = _originalId;

            if (string.IsNullOrWhiteSpace(_inputName.Text))
            {
                ShowError("Name cannot be empty.");
                return;
            }

            bool success = false;
            string newName = _inputName.Text.Trim();
            string newDesc = _inputDescription?.Text?.Trim() ?? "";

            if (_type == "CMD")
            {
                var newArgs = new List<CommandArg>();
                foreach (var vm in Parameters)
                {
                    var typesList = vm.Types.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                                            .Select(t => t.Trim())
                                            .ToList();

                    newArgs.Add(new CommandArg
                    {
                        TentativeName = vm.Name,
                        Description = vm.Description,
                        Type = typesList,
                        Optional = vm.IsOptional
                    });
                }

                var def = new CommandDefinition
                {
                    Id = newId,
                    Name = newName,
                    Description = newDesc,
                    Args = newArgs
                };
                success = _service.UpdateCommand(_originalId, def);
            }
            else if (_type == "FLG")
            {
                success = _service.UpdateFlag(_originalId, newId, newName);
            }
            else if (_type == "SYS")
            {
                success = _service.UpdateSysFlag(_originalId, newId, newName);
            }
            else if (_type == "WRK")
            {
                success = _service.UpdateWork(_originalId, newId, newName, _workMap);
            }

            if (success)
            {
                Close(true);
            }
            else
            {
                ShowError("Error saving changes. Ensure the name is valid.");
            }
        }

        private void ShowError(string msg)
        {
            if (_errorText != null)
            {
                _errorText.Text = msg;
                _errorText.IsVisible = true;
            }
        }
    }
}