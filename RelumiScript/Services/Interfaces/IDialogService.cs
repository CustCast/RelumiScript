using System.Threading.Tasks;
using RelumiScript.ViewModels;

namespace RelumiScript.Services.Interfaces
{
    public interface IDialogService
    {
        Task<string?> PickFolderAsync(string title);
        Task<bool> ShowConfirmDialog(string title, string message);
        Task<string?> ShowInputNameDialog(string title);

        // Return bool: true if saved, false if cancelled
        Task<bool> ShowHintEditorDialog(HintEditorViewModel vm);
    }
}