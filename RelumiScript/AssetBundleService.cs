using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using YamlDotNet.RepresentationModel;
using RelumiScript.Models;

namespace RelumiScript
{
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

        public Dictionary<int, string> PokemonMap { get; private set; } = new Dictionary<int, string>();
        public Dictionary<int, string> ItemMap { get; private set; } = new Dictionary<int, string>();
        public Dictionary<int, string> FlagMap => _flagMap;
        public Dictionary<int, string> SysFlagMap => _sysFlagMap;

        public string InitLog { get; private set; } = "Not Initialized";
        public string InitSummary => $"Cmds: {_commandMap.Count}, Files: {_fileNameMap.Count}";

        public AssetBundleService() { }

        public void Initialize(string jsonDir)
        {
            _commandMap.Clear(); _flagMap.Clear(); _sysFlagMap.Clear(); _workMap.Clear(); _fileNameMap.Clear();
            _revCommandMap.Clear(); _revFlagMap.Clear(); _revSysFlagMap.Clear(); _revWorkMap.Clear();
            try
            {
                LoadMap(jsonDir, "commands.json", _commandMap, _revCommandMap);
                LoadMap(jsonDir, "flags.json", _flagMap, _revFlagMap);
                LoadMap(jsonDir, "sys_flags.json", _sysFlagMap, _revSysFlagMap);
                LoadMap(jsonDir, "work.json", _workMap, _revWorkMap);
                LoadFileMap(jsonDir, "file_names.json");
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
                catch (Exception ex) { System.Diagnostics.Debug.WriteLine($"[AssetBundleService] Error loading {f}: {ex.Message}"); }
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

        // --- NEW LOADING LOGIC ---

        private string CleanUnityYaml(string content)
        {
            var sb = new StringBuilder();
            using (var reader = new StringReader(content))
            {
                string? line;
                while ((line = reader.ReadLine()) != null)
                {
                    // Strip Unity headers/tags to make standard YAML
                    if (line.StartsWith("%")) continue;
                    if (line.Trim().StartsWith("--- !u!"))
                    {
                        sb.AppendLine("---");
                        continue;
                    }
                    sb.AppendLine(line);
                }
            }
            return sb.ToString();
        }

        public void LoadGameData(string rootPath)
        {
            PokemonMap.Clear(); ItemMap.Clear();
            if (!Directory.Exists(rootPath)) return;

            // Target the specific English folder for game data (Pokemon/Item names)
            string enPath = Path.Combine(rootPath, "Assets", "format_msbt", "en", "english");

            // Fallback to searching Assets if that specific folder structure doesn't exist
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
            catch (Exception ex) { System.Diagnostics.Debug.WriteLine($"GameData Load Error: {ex.Message}"); }
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
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Failed to parse game data: {ex.Message}");
            }
        }

        public List<FileNode> LoadMessageFiles(string rootPath)
        {
            var output = new List<FileNode>();
            if (!Directory.Exists(rootPath)) return output;

            try
            {
                // Target the specific English folder for messages
                string enPath = Path.Combine(rootPath, "Assets", "format_msbt", "en", "english");

                // Fallback to searching Assets if that specific folder structure doesn't exist
                string searchPath = Directory.Exists(enPath) ? enPath : Path.Combine(rootPath, "Assets");
                if (!Directory.Exists(searchPath)) searchPath = rootPath;

                var files = Directory.GetFiles(searchPath, "*.asset", SearchOption.AllDirectories);

                foreach (var file in files)
                {
                    string fileName = Path.GetFileNameWithoutExtension(file);

                    // Skip game data
                    if (fileName.Contains("monsname") || fileName.Contains("itemname")) continue;

                    string content = File.ReadAllText(file);
                    // Fast check: Must contain labelDataArray to be a message file
                    if (!content.Contains("labelDataArray")) continue;

                    // FIX: Strip 'english_' prefix so references like 'dp_scenario1' match 'english_dp_scenario1'
                    string logicalName = fileName;
                    if (logicalName.StartsWith("english_", StringComparison.OrdinalIgnoreCase))
                    {
                        logicalName = logicalName.Substring(8);
                    }

                    var node = new FileNode { Name = logicalName, FileName = fileName, IsMessage = true };

                    try
                    {
                        string cleanYaml = CleanUnityYaml(content);
                        var yaml = new YamlStream();
                        using (var reader = new StringReader(cleanYaml)) yaml.Load(reader);

                        foreach (var doc in yaml.Documents)
                        {
                            if (doc.RootNode is YamlMappingNode rootMap &&
                                rootMap.Children.TryGetValue("MonoBehaviour", out var monoNode) &&
                                monoNode is YamlMappingNode mono)
                            {
                                if (mono.Children.TryGetValue("labelDataArray", out var arrayNode) && arrayNode is YamlSequenceNode entries)
                                {
                                    foreach (YamlMappingNode entry in entries)
                                    {
                                        string label = "";
                                        if (entry.Children.TryGetValue("labelName", out var labelNode))
                                            label = labelNode.ToString();

                                        if (entry.Children.TryGetValue("wordDataArray", out var wordsNode) && wordsNode is YamlSequenceNode words)
                                        {
                                            var lines = new List<string>();
                                            foreach (YamlMappingNode word in words)
                                            {
                                                if (word.Children.TryGetValue("str", out var s))
                                                {
                                                    lines.Add(s.ToString());
                                                }
                                            }
                                            node.Scripts.Add(new ScriptNode { Label = label, Content = string.Join("{n}", lines) });
                                        }
                                    }
                                }
                            }
                        }

                        if (node.Scripts.Count > 0)
                        {
                            node.Scripts.Sort((a, b) => string.Compare(a.Label, b.Label, StringComparison.Ordinal));
                            output.Add(node);
                        }
                    }
                    catch { /* Ignore invalid assets */ }
                }
            }
            catch (Exception ex) { InitLog = $"Message Load Error: {ex.Message}"; }
            return output.OrderBy(f => f.Name).ToList();
        }

        public List<FileNode> LoadAndDecompile(string rootPath)
        {
            var output = new List<FileNode>();

            // Prefer strict 'scripts' path
            string scriptsDir = Path.Combine(rootPath, "scripts");

            if (!Directory.Exists(scriptsDir))
            {
                // Fallback: Check if we are ALREADY in the scripts folder
                if (Path.GetFileName(rootPath).Equals("scripts", StringComparison.OrdinalIgnoreCase))
                {
                    scriptsDir = rootPath;
                }
                else
                {
                    try
                    {
                        foreach (var d in Directory.GetDirectories(rootPath))
                        {
                            if (Path.GetFileName(d).Equals("scripts", StringComparison.OrdinalIgnoreCase))
                            {
                                scriptsDir = d;
                                break;
                            }
                        }
                    }
                    catch { }
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

                    // Regex to handle Labels with or without source prefix
                    var labelRegex = new Regex(@"^(?:\\s*)?([a-zA-Z0-9_]+):$");

                    foreach (var line in lines)
                    {
                        var trimmed = line.Trim();
                        var match = labelRegex.Match(trimmed);

                        if (match.Success)
                        {
                            if (currentScript != null)
                            {
                                currentScript.Content = currentContent.ToString();
                                node.Scripts.Add(currentScript);
                            }
                            currentScript = new ScriptNode { Label = match.Groups[1].Value };
                            currentContent.Clear();
                            currentContent.AppendLine(line);
                        }
                        else
                        {
                            if (currentScript == null && !string.IsNullOrWhiteSpace(trimmed))
                            {
                                currentScript = new ScriptNode { Label = "Header" };
                            }
                            currentContent.AppendLine(line);
                        }
                    }

                    if (currentScript != null)
                    {
                        currentScript.Content = currentContent.ToString();
                        node.Scripts.Add(currentScript);
                    }

                    if (node.Scripts.Count > 0) output.Add(node);
                }
            }
            catch (Exception ex)
            {
                output.Add(new FileNode { Name = "ERROR", Scripts = { new ScriptNode { Label = "Log", Content = ex.ToString() } } });
            }
            return output;
        }

        public void Pack(List<FileNode> nodes, string rootPath)
        {
            // Disabled
        }
    }
}