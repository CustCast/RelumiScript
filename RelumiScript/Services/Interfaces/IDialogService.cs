using System.Threading.Tasks;

namespace RelumiScript.Services.Interfaces
{
    public interface IDialogService
    {
        Task<string?> PickFolderAsync(string title);
        Task<bool> ShowConfirmDialog(string title, string message);
        Task<string?> ShowInputNameDialog(string title);
    }
}