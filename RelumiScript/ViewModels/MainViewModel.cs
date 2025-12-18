using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using RelumiScript.Models;
using RelumiScript.Services;
using RelumiScript.Services.Interfaces;

namespace RelumiScript.ViewModels
{
    public class MainViewModel : INotifyPropertyChanged
    {
        private readonly ProjectService _projectService;
        private readonly IDialogService _dialogService;

        private string _statusMessage = "Ready";
        private EditorDocument? _activeDocument;

        // Child ViewModels
        private ThemeEditorViewModel _themeVm = new ThemeEditorViewModel();
        private ExplorerViewModel _explorerVm;
        private SearchViewModel _searchVm;
        private AnalysisViewModel _analysisVm;

        private bool _isBusy;

        private int _syntaxRevision = 0;
        private int _analysisRevision = 0;

        public ObservableCollection<EditorDocument> Documents { get; } = new ObservableCollection<EditorDocument>();

        public IEnumerable<FileNode> Files => _projectService.AllFiles;

        public ThemeEditorViewModel ThemeVm => _themeVm;
        public ExplorerViewModel Explorer => _explorerVm;
        public SearchViewModel Search => _searchVm;
        public AnalysisViewModel Analysis => _analysisVm;

        public MainViewModel(ProjectService projectService, IDialogService dialogService)
        {
            _projectService = projectService;
            _dialogService = dialogService;

            _explorerVm = new ExplorerViewModel(_projectService);
            _searchVm = new SearchViewModel(_projectService);
            _analysisVm = new AnalysisViewModel(_projectService);
        }

        public string StatusMessage
        {
            get => _statusMessage;
            set { _statusMessage = value; OnPropertyChanged(); }
        }

        public bool IsBusy
        {
            get => _isBusy;
            set { _isBusy = value; OnPropertyChanged(); }
        }

        public int SyntaxRevision
        {
            get => _syntaxRevision;
            set { _syntaxRevision = value; OnPropertyChanged(); }
        }

        public int AnalysisRevision
        {
            get => _analysisRevision;
            set { _analysisRevision = value; OnPropertyChanged(); }
        }

        public EditorDocument? ActiveDocument
        {
            get => _activeDocument;
            set { _activeDocument = value; OnPropertyChanged(); }
        }

        public ProjectService Project => _projectService;

        public async Task LoadProjectCommand()
        {
            var folder = await _dialogService.PickFolderAsync("Select Project Root Folder");
            if (string.IsNullOrEmpty(folder)) return;

            IsBusy = true;
            try
            {
                await _projectService.LoadProjectAsync(folder, msg => StatusMessage = msg);
                OnPropertyChanged(nameof(Files));
                _explorerVm.Refresh();
                await _projectService.RefreshTrackersAsync(msg => StatusMessage = msg);
                AnalysisRevision++;
                SyntaxRevision++;
            }
            catch (Exception ex)
            {
                StatusMessage = $"Load Error: {ex.Message}";
            }
            finally
            {
                IsBusy = false;
            }
        }

        public async Task SaveAllCommand()
        {
            if (_projectService.AllFiles.Count == 0) return;

            var dirty = Documents.Where(d => d.IsDirty).ToList();
            if (dirty.Count == 0) return;

            try
            {
                await _projectService.SaveDocumentsAsync(dirty);
                foreach (var doc in dirty)
                {
                    doc.OriginalContent = doc.Content;
                    doc.IsDirty = false;
                }
                StatusMessage = $"Saved {dirty.Count} files.";
            }
            catch (Exception ex)
            {
                StatusMessage = $"Save Error: {ex.Message}";
            }
        }

        // --- New Command: Open Hint Editor ---
        public async Task OpenHintEditorCommand(string? initialSearch = null)
        {
            if (_projectService.AllHints == null) return;

            // FIXED: Passing the Theme ViewModel correctly
            var vm = new HintEditorViewModel(_projectService.AllHints, _themeVm);

            if (!string.IsNullOrWhiteSpace(initialSearch))
            {
                vm.SearchText = initialSearch;
            }

            bool saveChanges = await _dialogService.ShowHintEditorDialog(vm);

            if (saveChanges)
            {
                IsBusy = true;
                try
                {
                    _projectService.AllHints = vm.GetResultingHints();

                    await _projectService.SaveHintsAsync();
                    await _projectService.GenerateSyntaxFile();

                    SyntaxRevision++;
                    StatusMessage = "Hints updated and saved.";
                }
                catch (Exception ex)
                {
                    StatusMessage = $"Error saving hints: {ex.Message}";
                }
                finally
                {
                    IsBusy = false;
                }
            }
            else
            {
                StatusMessage = "Hint editing cancelled.";
            }
        }

        public void OpenDocument(object node, bool isPeek)
        {
            if (node == null) return;

            if (node is ScriptNode sNode)
            {
                var parent = _projectService.AllFiles.FirstOrDefault(f => f.Scripts.Contains(sNode));
                if (parent != null)
                {
                    OpenDocument(parent, isPeek);
                    return;
                }
            }

            string docId = "", title = "", content = "";
            if (node is FileNode fNode)
            {
                docId = "FILE:" + fNode.FileName;
                title = fNode.Name;
                content = string.Join(Environment.NewLine, fNode.Scripts.Select(x => x.Content));
            }
            else if (node is ScriptNode scriptNode)
            {
                docId = "SCRIPT:" + scriptNode.Label;
                title = scriptNode.Label;
                content = scriptNode.Content;
            }
            else return;

            var existing = Documents.FirstOrDefault(d => d.Id == docId);
            if (existing != null)
            {
                if (!isPeek && existing.IsPreview) existing.IsPreview = false;
                ActiveDocument = existing;
                return;
            }

            var newDoc = new EditorDocument
            {
                Id = docId,
                Title = title,
                Content = content,
                OriginalContent = content,
                IsDirty = false,
                IsPreview = isPeek,
                SourceNode = node
            };

            if (isPeek)
            {
                var currentPreview = Documents.FirstOrDefault(d => d.IsPreview);
                if (currentPreview != null)
                {
                    if (currentPreview.IsDirty)
                    {
                        currentPreview.IsPreview = false;
                        Documents.Add(newDoc);
                    }
                    else
                    {
                        int index = Documents.IndexOf(currentPreview);
                        Documents[index] = newDoc;
                    }
                }
                else Documents.Add(newDoc);
            }
            else Documents.Add(newDoc);

            ActiveDocument = newDoc;
        }

        public void CloseDocument(EditorDocument doc)
        {
            Documents.Remove(doc);
            if (ActiveDocument == doc)
            {
                ActiveDocument = Documents.FirstOrDefault();
            }
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}