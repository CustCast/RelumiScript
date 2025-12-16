using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using Avalonia.Media;
using RelumiScript.Services;
using RelumiScript.ViewModels;
using RelumiScript.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace RelumiScript
{
    public class CommandArgViewModel
    {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string Types { get; set; } = "";
        public bool IsOptional { get; set; }
    }

    public partial class EditDataDialog : Window
    {
        private string _type;
        private int _originalId;
        private AssetBundleService _service;
        private Dictionary<int, string> _workMap;

        private TextBlock? _headerTitle;
        private TextBlock? _headerSubtitle;
        private TextBox? _inputName;
        private TextBox? _inputDescription;
        private StackPanel? _descriptionPanel;
        private StackPanel? _parametersPanel;
        private StackPanel? _optionsPanel;
        private CheckBox? _checkDummy;
        private CheckBox? _checkAnimation;
        private ItemsControl? _paramsList;
        private TextBlock? _errorText;

        public ObservableCollection<CommandArgViewModel> Parameters { get; set; } = new ObservableCollection<CommandArgViewModel>();

        public EditDataDialog() { InitializeComponent(); }

        public EditDataDialog(string type, int id, object dataObj, AssetBundleService service, Dictionary<int, string> workMap, ThemeEditorViewModel themeVm)
        {
            InitializeComponent();
            _type = type;
            _originalId = id;
            _service = service;
            _workMap = workMap;

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

            _headerTitle = this.FindControl<TextBlock>("HeaderTitle");
            _headerSubtitle = this.FindControl<TextBlock>("HeaderSubtitle");
            _inputName = this.FindControl<TextBox>("InputName");
            _inputDescription = this.FindControl<TextBox>("InputDescription");
            _descriptionPanel = this.FindControl<StackPanel>("DescriptionPanel");
            _parametersPanel = this.FindControl<StackPanel>("ParametersPanel");
            _optionsPanel = this.FindControl<StackPanel>("OptionsPanel");
            _checkDummy = this.FindControl<CheckBox>("CheckDummy");
            _checkAnimation = this.FindControl<CheckBox>("CheckAnimation");
            _paramsList = this.FindControl<ItemsControl>("ParamsList");
            _errorText = this.FindControl<TextBlock>("ErrorText");

            if (type == "CMD" && dataObj is CommandDefinition cmd)
            {
                if (_headerTitle != null) _headerTitle.Text = "Edit Command";
                if (_headerSubtitle != null) _headerSubtitle.Text = $"Editing Command ID {id}";

                if (_inputName != null) _inputName.Text = cmd.Name;
                if (_inputDescription != null) _inputDescription.Text = cmd.Description;

                if (_descriptionPanel != null) _descriptionPanel.IsVisible = true;
                if (_parametersPanel != null) _parametersPanel.IsVisible = true;
                if (_optionsPanel != null) _optionsPanel.IsVisible = true;

                if (_checkDummy != null) _checkDummy.IsChecked = cmd.Dummy;
                if (_checkAnimation != null) _checkAnimation.IsChecked = cmd.Animation;

                foreach (var p in cmd.Args)
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
                string currentName = dataObj is NameDef nd ? nd.Name ?? "" : dataObj.ToString() ?? "";
                if (_inputName != null) _inputName.Text = currentName;

                if (_descriptionPanel != null) _descriptionPanel.IsVisible = false;
                if (_parametersPanel != null) _parametersPanel.IsVisible = false;
                if (_optionsPanel != null) _optionsPanel.IsVisible = false;

                string typeName = type == "FLG" ? "Flag" : (type == "SYS" ? "System Flag" : "Work Variable");
                if (_headerTitle != null) _headerTitle.Text = $"Edit {typeName}";
                if (_headerSubtitle != null) _headerSubtitle.Text = $"Editing {typeName} ID {id}";
            }
        }

        private void InitializeComponent() { AvaloniaXamlLoader.Load(this); }

        public void BtnAddParam_Click(object? sender, RoutedEventArgs e)
        {
            Parameters.Add(new CommandArgViewModel { Name = "New Parameter", Types = "Work, Number" });
        }

        public void BtnRemoveParam_Click(object? sender, RoutedEventArgs e)
        {
            if (sender is Button btn && btn.Tag is CommandArgViewModel wrapper) Parameters.Remove(wrapper);
        }

        public void BtnCancel_Click(object? sender, RoutedEventArgs e) { Close(false); }

        public void BtnSave_Click(object? sender, RoutedEventArgs e)
        {
            if (_inputName == null) return;
            int newId = _originalId;

            if (string.IsNullOrWhiteSpace(_inputName.Text)) { ShowError("Name cannot be empty."); return; }

            bool success = false;
            string newName = _inputName.Text.Trim();
            string newDesc = _inputDescription?.Text?.Trim() ?? "";

            if (_type == "CMD")
            {
                // Create a completely new list to avoid reference issues
                var newArgs = new List<CommandArg>();
                foreach (var vm in Parameters)
                {
                    var typesList = vm.Types.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(t => t.Trim()).ToList();
                    newArgs.Add(new CommandArg
                    {
                        TentativeName = vm.Name,
                        Description = vm.Description,
                        Type = typesList,
                        Optional = vm.IsOptional
                    });
                }

                bool isDummy = _checkDummy?.IsChecked ?? false;
                bool isAnimation = _checkAnimation?.IsChecked ?? false;

                var def = new CommandDefinition
                {
                    Id = newId,
                    Name = newName,
                    Description = newDesc,
                    Dummy = isDummy,
                    Animation = isAnimation,
                    Args = newArgs
                };
                success = _service.UpdateCommand(_originalId, def);
            }
            else if (_type == "FLG") success = _service.UpdateFlag(_originalId, newId, newName);
            else if (_type == "SYS") success = _service.UpdateSysFlag(_originalId, newId, newName);
            else if (_type == "WRK") success = _service.UpdateWork(_originalId, newId, newName, _workMap);

            if (success) Close(true);
            else ShowError("Error saving changes.");
        }

        private void ShowError(string msg)
        {
            if (_errorText != null) { _errorText.Text = msg; _errorText.IsVisible = true; }
        }
    }
}