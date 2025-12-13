using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using YamlDotNet.RepresentationModel;
using RelumiScript.Models;
using System.Diagnostics;

namespace RelumiScript.Services
{
    // Model for individual arguments in commands.json
    public class CommandArg
    {
        public string TentativeName { get; set; } = "";
        public string Description { get; set; } = "";
        public List<string> Type { get; set; } = new List<string>();
        public bool Optional { get; set; }
    }

    // Model for the command definition
    public class CommandDefinition
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";

        // Matches "Args" in commands.json
        public List<CommandArg> Args { get; set; } = new List<CommandArg>();

        // Legacy properties to prevent serialization errors if json has extra fields
        [JsonIgnore]
        public string[] Parameters { get; set; } = Array.Empty<string>();
    }

    public class AssetBundleService
    {
        private Dictionary<int, string> _commandMap = new Dictionary<int, string>();
        private Dictionary<int, string> _flagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _sysFlagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _workMap = new Dictionary<int, string>();
        private Dictionary<string, string> _fileNameMap = new Dictionary<string, string>();

        private Dictionary<string, int> _revCommandMap = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        private Dictionary<string, int> _revFlagMap = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        private Dictionary<string, int> _revSysFlagMap = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        private Dictionary<string, int> _revWorkMap = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);

        public List<CommandDefinition> Commands { get; private set; } = new List<CommandDefinition>();

        public Dictionary<int, string> PokemonMap { get; private set; } = new Dictionary<int, string>();
        public Dictionary<int, string> ItemMap { get; private set; } = new Dictionary<int, string>();
        public Dictionary<int, string> FlagMap => _flagMap;
        public Dictionary<int, string> SysFlagMap => _sysFlagMap;

        public string InitLog { get; private set; } = "Not Initialized";
        public string InitSummary => $"Cmds: {_commandMap.Count}, Files: {_fileNameMap.Count}";

        private string _loadedJsonDir = "";

        public AssetBundleService() { }

        public void Initialize(string jsonDir)
        {
            _loadedJsonDir = jsonDir;
            _commandMap.Clear(); _flagMap.Clear(); _sysFlagMap.Clear(); _workMap.Clear(); _fileNameMap.Clear();
            _revCommandMap.Clear(); _revFlagMap.Clear(); _revSysFlagMap.Clear(); _revWorkMap.Clear();
            Commands.Clear();

            try
            {
                LoadMap(jsonDir, "commands.json", _commandMap, _revCommandMap);
                LoadMap(jsonDir, "flags.json", _flagMap, _revFlagMap);
                LoadMap(jsonDir, "sys_flags.json", _sysFlagMap, _revSysFlagMap);
                LoadMap(jsonDir, "work.json", _workMap, _revWorkMap);
                LoadFileMap(jsonDir, "file_names.json");

                LoadFullCommands(jsonDir, "commands.json");
            }
            catch (Exception ex) { InitLog = ex.Message; }
        }

        private void LoadMap(string dir, string f, Dictionary<int, string> map, Dictionary<string, int> revMap)
        {
            string p = Path.Combine(dir, f);
            if (File.Exists(p))
            {
                try
                {
                    var list = JsonConvert.DeserializeObject<List<NameDef>>(File.ReadAllText(p));
                    if (list != null)
                    {
                        foreach (var d in list)
                        {
                            if (d.Name == null) continue;
                            if (!map.ContainsKey(d.Id)) map[d.Id] = d.Name;
                            if (!revMap.ContainsKey(d.Name)) revMap[d.Name] = d.Id;
                        }
                    }
                }
                catch (Exception ex) { Debug.WriteLine($"[AssetBundleService] Error loading {f}: {ex.Message}"); }
            }
        }

        private void LoadFullCommands(string dir, string f)
        {
            string p = Path.Combine(dir, f);
            if (File.Exists(p))
            {
                try
                {
                    var list = JsonConvert.DeserializeObject<List<CommandDefinition>>(File.ReadAllText(p));
                    if (list != null)
                    {
                        Commands = list;
                    }
                }
                catch (Exception ex) { Debug.WriteLine($"[AssetBundleService] Error loading full commands {f}: {ex.Message}"); }
            }
        }

        private void LoadFileMap(string dir, string f)
        {
            string p = Path.Combine(dir, f);
            if (File.Exists(p))
            {
                try
                {
                    var list = JsonConvert.DeserializeObject<List<FileNameDef>>(File.ReadAllText(p));
                    if (list != null) foreach (var d in list) { if (!_fileNameMap.ContainsKey(d.FileName)) _fileNameMap[d.FileName] = d.FriendlyName; }
                }
                catch { }
            }
        }

        public bool UpdateFlag(int oldId, int newId, string newName)
        {
            if (string.IsNullOrEmpty(_loadedJsonDir)) return false;

            if (newId != oldId && _flagMap.ContainsKey(newId)) return false;

            if (_flagMap.ContainsKey(oldId)) _flagMap.Remove(oldId);
            _flagMap[newId] = newName;

            var oldEntry = _revFlagMap.FirstOrDefault(x => x.Value == oldId);
            if (!string.IsNullOrEmpty(oldEntry.Key)) _revFlagMap.Remove(oldEntry.Key);
            _revFlagMap[newName] = newId;

            SaveMap(_flagMap, Path.Combine(_loadedJsonDir, "flags.json"));
            return true;
        }

        public bool UpdateSysFlag(int oldId, int newId, string newName)
        {
            if (string.IsNullOrEmpty(_loadedJsonDir)) return false;
            if (newId != oldId && _sysFlagMap.ContainsKey(newId)) return false;

            if (_sysFlagMap.ContainsKey(oldId)) _sysFlagMap.Remove(oldId);
            _sysFlagMap[newId] = newName;

            var oldEntry = _revSysFlagMap.FirstOrDefault(x => x.Value == oldId);
            if (!string.IsNullOrEmpty(oldEntry.Key)) _revSysFlagMap.Remove(oldEntry.Key);
            _revSysFlagMap[newName] = newId;

            SaveMap(_sysFlagMap, Path.Combine(_loadedJsonDir, "sys_flags.json"));
            return true;
        }

        public bool UpdateWork(int oldId, int newId, string newName, Dictionary<int, string> currentWorkMap)
        {
            if (string.IsNullOrEmpty(_loadedJsonDir)) return false;
            if (newId != oldId && currentWorkMap.ContainsKey(newId)) return false;

            if (currentWorkMap.ContainsKey(oldId)) currentWorkMap.Remove(oldId);
            currentWorkMap[newId] = newName;

            SaveMap(currentWorkMap, Path.Combine(_loadedJsonDir, "work.json"));
            return true;
        }

        public bool UpdateCommand(int oldId, CommandDefinition def)
        {
            if (string.IsNullOrEmpty(_loadedJsonDir)) return false;

            if (def.Id != oldId && Commands.Any(c => c.Id == def.Id)) return false;

            var existing = Commands.FirstOrDefault(c => c.Id == oldId);
            if (existing != null) Commands.Remove(existing);

            Commands.Add(def);
            Commands = Commands.OrderBy(c => c.Id).ToList();

            if (_commandMap.ContainsKey(oldId)) _commandMap.Remove(oldId);
            _commandMap[def.Id] = def.Name;

            var oldRev = _revCommandMap.FirstOrDefault(x => x.Value == oldId);
            if (!string.IsNullOrEmpty(oldRev.Key)) _revCommandMap.Remove(oldRev.Key);
            _revCommandMap[def.Name] = def.Id;

            try
            {
                // Formatting.Indented creates cleaner JSON
                var settings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore };
                File.WriteAllText(Path.Combine(_loadedJsonDir, "commands.json"), JsonConvert.SerializeObject(Commands, Formatting.Indented, settings));
                return true;
            }
            catch { return false; }
        }

        private void SaveMap(Dictionary<int, string> map, string path)
        {
            try
            {
                var list = map.Select(kvp => new { Id = kvp.Key, Name = kvp.Value }).OrderBy(x => x.Id).ToList();
                File.WriteAllText(path, JsonConvert.SerializeObject(list, Formatting.Indented));
            }
            catch (Exception ex) { Debug.WriteLine($"Error saving map {path}: {ex.Message}"); }
        }

        // --- GAME DATA LOADING LOGIC (Preserved) ---
        private string CleanUnityYaml(string content)
        {
            var sb = new StringBuilder();
            using (var reader = new StringReader(content))
            {
                string? line;
                while ((line = reader.ReadLine()) != null)
                {
                    if (line.StartsWith("%")) continue;
                    if (line.Trim().StartsWith("--- !u!")) { sb.AppendLine("---"); continue; }
                    sb.AppendLine(line);
                }
            }
            return sb.ToString();
        }

        public void LoadGameData(string rootPath)
        {
            PokemonMap.Clear(); ItemMap.Clear();
            if (!Directory.Exists(rootPath)) return;
            string enPath = Path.Combine(rootPath, "Assets", "format_msbt", "en", "english");
            string searchPath = Directory.Exists(enPath) ? enPath : Path.Combine(rootPath, "Assets");
            if (!Directory.Exists(searchPath)) searchPath = rootPath;

            try
            {
                var files = Directory.GetFiles(searchPath, "*.asset", SearchOption.AllDirectories);
                foreach (var file in files)
                {
                    string name = Path.GetFileNameWithoutExtension(file);
                    if (name.Contains("monsname") || name.Contains("itemname"))
                    {
                        bool isPokemon = name.Contains("monsname");
                        string content = File.ReadAllText(file);
                        ParseMessageAssetForGameData(content, isPokemon ? PokemonMap : ItemMap);
                    }
                }
            }
            catch (Exception ex) { Debug.WriteLine($"GameData Load Error: {ex.Message}"); }
        }

        private void ParseMessageAssetForGameData(string content, Dictionary<int, string> targetMap)
        {
            try
            {
                string cleanYaml = CleanUnityYaml(content);
                var yaml = new YamlStream();
                using (var reader = new StringReader(cleanYaml)) yaml.Load(reader);

                foreach (var doc in yaml.Documents)
                {
                    if (doc.RootNode is YamlMappingNode rootMap)
                    {
                        if (rootMap.Children.TryGetValue("MonoBehaviour", out var monoNode) && monoNode is YamlMappingNode mono)
                        {
                            if (mono.Children.TryGetValue("labelDataArray", out var arrayNode) && arrayNode is YamlSequenceNode entries)
                            {
                                foreach (YamlMappingNode entry in entries)
                                {
                                    if (entry.Children.TryGetValue("arrayIndex", out var indexNode) &&
                                        entry.Children.TryGetValue("wordDataArray", out var wordsNode) && wordsNode is YamlSequenceNode words)
                                    {
                                        int id = int.Parse(indexNode.ToString());
                                        if (words.Children.Count > 0 && words.Children[0] is YamlMappingNode firstWord)
                                        {
                                            if (firstWord.Children.TryGetValue("str", out var strNode))
                                            {
                                                string val = strNode.ToString();
                                                if (!targetMap.ContainsKey(id)) targetMap[id] = val;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch
            {
                Debug.WriteLine($"Failed to parse game data");
            }
        }

        public List<FileNode> LoadMessageFiles(string rootPath)
        {
            var output = new List<FileNode>();
            if (!Directory.Exists(rootPath)) return output;
            try
            {
                string enPath = Path.Combine(rootPath, "Assets", "format_msbt", "en", "english");
                string searchPath = Directory.Exists(enPath) ? enPath : Path.Combine(rootPath, "Assets");
                if (!Directory.Exists(searchPath)) searchPath = rootPath;

                var files = Directory.GetFiles(searchPath, "*.asset", SearchOption.AllDirectories);
                foreach (var file in files)
                {
                    string fileName = Path.GetFileNameWithoutExtension(file);
                    if (fileName.Contains("monsname") || fileName.Contains("itemname")) continue;
                    string content = File.ReadAllText(file);
                    if (!content.Contains("labelDataArray")) continue;
                    string logicalName = fileName;
                    if (logicalName.StartsWith("english_", StringComparison.OrdinalIgnoreCase)) logicalName = logicalName.Substring(8);
                    var node = new FileNode { Name = logicalName, FileName = fileName, IsMessage = true };
                    try
                    {
                        string cleanYaml = CleanUnityYaml(content);
                        var yaml = new YamlStream();
                        using (var reader = new StringReader(cleanYaml)) yaml.Load(reader);
                        foreach (var doc in yaml.Documents)
                        {
                            if (doc.RootNode is YamlMappingNode rootMap && rootMap.Children.TryGetValue("MonoBehaviour", out var monoNode) && monoNode is YamlMappingNode mono)
                            {
                                if (mono.Children.TryGetValue("labelDataArray", out var arrayNode) && arrayNode is YamlSequenceNode entries)
                                {
                                    foreach (YamlMappingNode entry in entries)
                                    {
                                        string label = "";
                                        if (entry.Children.TryGetValue("labelName", out var labelNode)) label = labelNode.ToString();
                                        if (entry.Children.TryGetValue("wordDataArray", out var wordsNode) && wordsNode is YamlSequenceNode words)
                                        {
                                            var lines = new List<string>();
                                            foreach (YamlMappingNode word in words) if (word.Children.TryGetValue("str", out var s)) lines.Add(s.ToString());
                                            node.Scripts.Add(new ScriptNode { Label = label, Content = string.Join("{n}", lines) });
                                        }
                                    }
                                }
                            }
                        }
                        if (node.Scripts.Count > 0) { node.Scripts.Sort((a, b) => string.Compare(a.Label, b.Label, StringComparison.Ordinal)); output.Add(node); }
                    }
                    catch { }
                }
            }
            catch (Exception ex) { InitLog = $"Message Load Error: {ex.Message}"; }
            return output.OrderBy(f => f.Name).ToList();
        }

        public List<FileNode> LoadAndDecompile(string rootPath)
        {
            var output = new List<FileNode>();
            string scriptsDir = Path.Combine(rootPath, "scripts");
            if (!Directory.Exists(scriptsDir))
            {
                if (Path.GetFileName(rootPath).Equals("scripts", StringComparison.OrdinalIgnoreCase)) scriptsDir = rootPath;
                else
                {
                    try { foreach (var d in Directory.GetDirectories(rootPath)) { if (Path.GetFileName(d).Equals("scripts", StringComparison.OrdinalIgnoreCase)) { scriptsDir = d; break; } } } catch { }
                }
            }
            if (!Directory.Exists(scriptsDir)) return output;
            try
            {
                var files = Directory.GetFiles(scriptsDir, "*.ev", SearchOption.TopDirectoryOnly);
                foreach (var file in files)
                {
                    string name = Path.GetFileNameWithoutExtension(file);
                    string display = _fileNameMap.ContainsKey(name) ? $"{_fileNameMap[name]} ({name})" : name;
                    var node = new FileNode { Name = display, FileName = name, IsMessage = false };
                    string content = File.ReadAllText(file);
                    var lines = content.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
                    ScriptNode? currentScript = null;
                    StringBuilder currentContent = new StringBuilder();
                    var labelRegex = new Regex(@"^(?:\\s*)?([a-zA-Z0-9_]+):$");
                    foreach (var line in lines)
                    {
                        var trimmed = line.Trim();
                        var match = labelRegex.Match(trimmed);
                        if (match.Success)
                        {
                            if (currentScript != null) { currentScript.Content = currentContent.ToString(); node.Scripts.Add(currentScript); }
                            currentScript = new ScriptNode { Label = match.Groups[1].Value };
                            currentContent.Clear();
                            currentContent.AppendLine(line);
                        }
                        else
                        {
                            if (currentScript == null && !string.IsNullOrWhiteSpace(trimmed)) currentScript = new ScriptNode { Label = "Header" };
                            currentContent.AppendLine(line);
                        }
                    }
                    if (currentScript != null) { currentScript.Content = currentContent.ToString(); node.Scripts.Add(currentScript); }
                    if (node.Scripts.Count > 0) output.Add(node);
                }
            }
            catch (Exception ex) { output.Add(new FileNode { Name = "ERROR", Scripts = { new ScriptNode { Label = "Log", Content = ex.ToString() } } }); }
            return output;
        }

        public void Pack(List<FileNode> nodes, string rootPath) { }
    }
}