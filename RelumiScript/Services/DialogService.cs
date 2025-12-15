using Avalonia.Controls;
using Avalonia.Platform.Storage;
using RelumiScript.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RelumiScript.Services
{
    public class DialogService : IDialogService
    {
        private readonly Window _owner;

        public DialogService(Window owner)
        {
            _owner = owner;
        }

        public async Task<string?> PickFolderAsync(string title)
        {
            var topLevel = TopLevel.GetTopLevel(_owner);
            if (topLevel == null) return null;

            var folders = await topLevel.StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions
            {
                AllowMultiple = false,
                Title = title
            });

            return folders.Count > 0 ? folders[0].Path.LocalPath : null;
        }

        public async Task<bool> ShowConfirmDialog(string title, string message)
        {
            var dialog = new DiscardChangesDialog(title);
            // Note: Reuse existing dialog or create a generic ConfirmDialog if DiscardChangesDialog is too specific
            // For now, mapping to existing Discard logic or standard message box if available
            var result = await dialog.ShowDialog<bool>(_owner);
            return result;
        }

        public async Task<string?> ShowInputNameDialog(string title)
        {
            var dialog = new InputNameDialog();
            return await dialog.ShowDialog<string?>(_owner);
        }
    }
}