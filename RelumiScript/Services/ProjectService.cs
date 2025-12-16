using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RelumiScript.Models;

namespace RelumiScript.Services
{
    public class ProjectService
    {
        private readonly AssetBundleService _assetService;

        // Data State
        public string WorkingDirectory { get; private set; } = "";
        public List<FileNode> AllFiles { get; private set; } = new List<FileNode>();
        public List<FileNode> LoadedMessages { get; private set; } = new List<FileNode>();
        public Dictionary<int, string> WorkIdMap { get; private set; } = new Dictionary<int, string>();

        // Analysis Data (Populated by Scanner)
        public List<FlagUsageInfo> AllFlagUsages { get; private set; } = new List<FlagUsageInfo>();
        public List<CommandUsageInfo> AllCommandUsages { get; private set; } = new List<CommandUsageInfo>();
        public List<FlagUsageInfo> AllWorkUsages { get; private set; } = new List<FlagUsageInfo>();
        public List<EventUsageInfo> AllEventUsages { get; private set; } = new List<EventUsageInfo>();

        public AssetBundleService AssetService => _assetService;

        public ProjectService()
        {
            _assetService = new AssetBundleService();
        }

        public async Task LoadProjectAsync(string rootPath, Action<string> statusCallback)
        {
            WorkingDirectory = rootPath;
            statusCallback("Scanning...");

            try
            {
                string? jsonDir = FindJsonFolder();
                if (_assetService.InitSummary.Contains("Cmds: 0") && !string.IsNullOrEmpty(jsonDir))
                {
                    _assetService.Initialize(jsonDir);
                }

                statusCallback("Loading Game Data...");
                await Task.Run(() => _assetService.LoadGameData(rootPath));

                statusCallback("Loading Scripts...");
                var scripts = await Task.Run(() => _assetService.LoadAndDecompile(rootPath));
                AllFiles = scripts;

                statusCallback("Loading Messages...");
                LoadedMessages = await Task.Run(() => _assetService.LoadMessageFiles(rootPath));

                await GenerateSyntaxFile();

                statusCallback($"Loaded {scripts.Count} scripts.");
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Project Load Error: {ex}");
                throw;
            }
        }

        public async Task RefreshTrackersAsync(Action<string> statusCallback)
        {
            statusCallback("Scanner: Indexing...");
            try
            {
                LoadWorkIdMap();

                // Prepare nodes for scanner
                List<object> nodesToScan = new List<object>();
                if (AllFiles != null)
                {
                    foreach (var f in AllFiles) nodesToScan.Add(f);
                }

                var result = await ScriptScanner.ScanAllAsync(nodesToScan, _assetService.FlagMap, _assetService.SysFlagMap, WorkIdMap);

                AllFlagUsages = result.Flags;
                AllWorkUsages = result.Works;
                AllCommandUsages = result.Commands;
                AllEventUsages = result.Events;

                statusCallback($"Scanner: Indexed {result.Flags.Count} flags, {result.Works.Count} works.");
            }
            catch (Exception ex)
            {
                statusCallback($"Scanner Error: {ex.Message}");
            }
        }

        public async Task SaveDocumentsAsync(List<EditorDocument> dirtyDocs)
        {
            string saveDir = Path.Combine(WorkingDirectory, "scripts");
            if (!Directory.Exists(saveDir)) Directory.CreateDirectory(saveDir);

            var affectedFiles = new HashSet<FileNode>();
            foreach (var doc in dirtyDocs)
            {
                if (doc.SourceNode is FileNode fn) affectedFiles.Add(fn);
                else if (doc.SourceNode is ScriptNode sn)
                {
                    var parent = AllFiles.FirstOrDefault(f => f.Scripts.Contains(sn));
                    if (parent != null) affectedFiles.Add(parent);
                }
            }

            foreach (var file in affectedFiles)
            {
                // Reconstruct full file content from documents + existing scripts
                var scriptDocs = dirtyDocs
                    .Where(d => d.SourceNode is ScriptNode sn && file.Scripts.Contains(sn))
                    .ToDictionary(d => (ScriptNode)d.SourceNode!, d => d.Content);

                // If the file itself is open as a document, use that, otherwise reconstruct
                string content;
                var fileDoc = dirtyDocs.FirstOrDefault(d => d.SourceNode == file);
                if (fileDoc != null)
                {
                    content = fileDoc.Content;
                }
                else
                {
                    content = string.Join(Environment.NewLine, file.Scripts.Select(s => scriptDocs.ContainsKey(s) ? scriptDocs[s] : s.Content));
                }

                string fileName = file.FileName;
                if (!fileName.EndsWith(".ev", StringComparison.OrdinalIgnoreCase)) fileName += ".ev";

                await File.WriteAllTextAsync(Path.Combine(saveDir, Path.GetFileName(fileName)), content);

                // Update In-Memory Models
                var newScripts = ParseScriptsFromContent(content);
                file.Scripts = new List<ScriptNode>(newScripts);

                // Update Master List Reference
                var masterNode = AllFiles.FirstOrDefault(f => f.FileName == file.FileName);
                if (masterNode != null && masterNode != file)
                {
                    masterNode.Scripts = new List<ScriptNode>(newScripts);
                }
            }
        }

        private List<ScriptNode> ParseScriptsFromContent(string content)
        {
            var list = new List<ScriptNode>();
            var lines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            ScriptNode? currentScript = null;
            StringBuilder currentContent = new StringBuilder();

            // FIXED REGEX: Matches "Label:" allowing for indentation and trailing whitespace.
            // Does NOT allow comments on the same line (to be safe/compatible).
            var labelRegex = new Regex(@"^(?:\s*)?([a-zA-Z0-9_]+):(?=\s*$)");

            foreach (var line in lines)
            {
                var match = labelRegex.Match(line);
                if (match.Success)
                {
                    if (currentScript != null)
                    {
                        currentScript.Content = currentContent.ToString();
                        list.Add(currentScript);
                    }
                    currentScript = new ScriptNode { Label = match.Groups[1].Value };
                    currentContent.Clear();
                    currentContent.AppendLine(line);
                }
                else
                {
                    if (currentScript == null && !string.IsNullOrWhiteSpace(line))
                        currentScript = new ScriptNode { Label = "Header" };

                    if (currentScript != null)
                        currentContent.AppendLine(line);
                }
            }
            if (currentScript != null)
            {
                currentScript.Content = currentContent.ToString();
                list.Add(currentScript);
            }
            return list;
        }

        public async Task GenerateSyntaxFile()
        {
            string? jd = FindJsonFolder();
            if (string.IsNullOrEmpty(jd)) return;

            await Task.Run(() => {
                // 1. Load Commands
                string cmds = File.Exists(Path.Combine(jd, "commands.json"))
                    ? File.ReadAllText(Path.Combine(jd, "commands.json"))
                    : "[]";

                // 2. Load Hints Configuration
                string hintsJson = "[]";
                string hintsPath = Path.Combine(jd, "hints.json");

                if (File.Exists(hintsPath))
                {
                    hintsJson = File.ReadAllText(hintsPath);
                }

                // 3. Construct the Master Data Object
                var dataObj = new
                {
                    commands = JArray.Parse(cmds),
                    flags = new string[0],
                    sysflags = new string[0],
                    works = new string[0],
                    pokes = _assetService.PokemonMap,
                    items = _assetService.ItemMap,
                    forms = _assetService.FormMap,
                    balls = _assetService.BallMap,
                    hints = JArray.Parse(hintsJson)
                };

                string js = $"window.RELUMI_DATA = {JsonConvert.SerializeObject(dataObj)}; window.RELUMI_DATA_LOADED = true;";

                File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Monaco", "syntax_data.js"), js, Encoding.UTF8);
            });
        }

        public string? FindJsonFolder()
        {
            string b = AppDomain.CurrentDomain.BaseDirectory;
            if (Directory.Exists(Path.Combine(b, "JSON"))) return Path.Combine(b, "JSON");
            if (Directory.Exists(Path.Combine(b, "..", "..", "..", "JSON"))) return Path.GetFullPath(Path.Combine(b, "..", "..", "..", "JSON"));
            return null;
        }

        private void LoadWorkIdMap()
        {
            WorkIdMap.Clear();
            string? jsonDir = FindJsonFolder();
            if (string.IsNullOrEmpty(jsonDir)) return;
            try
            {
                string workPath = Path.Combine(jsonDir, "work.json");
                if (File.Exists(workPath))
                {
                    var jArray = JArray.Parse(File.ReadAllText(workPath));
                    foreach (var item in jArray)
                    {
                        int id = item["Id"]?.Value<int>() ?? 0;
                        string name = item["Name"]?.Value<string>() ?? "";
                        if (!WorkIdMap.ContainsKey(id)) WorkIdMap.Add(id, name);
                    }
                }
            }
            catch { }
        }
    }
}