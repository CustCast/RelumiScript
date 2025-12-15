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

        // State
        private string _statusMessage = "Ready";
        private EditorDocument? _activeDocument;
        private ThemeEditorViewModel _themeVm = new ThemeEditorViewModel();
        private bool _isBusy;

        // Signals
        // We use these counters to signal the View to perform actions
        private int _syntaxRevision = 0;
        private int _analysisRevision = 0;

        // Collections
        public ObservableCollection<EditorDocument> Documents { get; } = new ObservableCollection<EditorDocument>();

        // Exposed Service Data
        public IEnumerable<FileNode> Files => _projectService.AllFiles;
        public ThemeEditorViewModel ThemeVm => _themeVm;

        public MainViewModel(ProjectService projectService, IDialogService dialogService)
        {
            _projectService = projectService;
            _dialogService = dialogService;
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

        // View listens to this to know when to execute 'loadSyntaxFromFile' in Monaco
        public int SyntaxRevision
        {
            get => _syntaxRevision;
            set { _syntaxRevision = value; OnPropertyChanged(); }
        }

        // View listens to this to know when to re-run 'FilterFlags', 'FilterWorks', etc.
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
                // 1. Load Files
                await _projectService.LoadProjectAsync(folder, msg => StatusMessage = msg);
                OnPropertyChanged(nameof(Files)); // Updates Explorer

                // 2. Refresh Analysis (Flags, Works, etc)
                await _projectService.RefreshTrackersAsync(msg => StatusMessage = msg);
                AnalysisRevision++; // Signals View to refresh Side Panels & Search

                // 3. Generate Syntax
                // (Already done in LoadProjectAsync, but we increment revision to trigger Monaco update)
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

                // Refresh Explorer logic if needed
            }
            catch (Exception ex)
            {
                StatusMessage = $"Save Error: {ex.Message}";
            }
        }

        // Document Management Logic
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