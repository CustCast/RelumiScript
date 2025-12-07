using AssetsTools.NET;
using AssetsTools.NET.Extra;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace RelumiScript
{
    public class NameDef
    {
        [JsonProperty("Id")] public int Id { get; set; }
        [JsonProperty("Name")] public string Name { get; set; }
    }

    public class FileNameDef
    {
        public string FileName { get; set; }
        public string FriendlyName { get; set; }
    }

    public class FileNode
    {
        public string Name { get; set; }
        public bool IsMessage { get; set; }
        public List<ScriptNode> Scripts { get; set; } = new List<ScriptNode>();

        // UI Helpers
        public string Icon => IsMessage ? "💬" : "📜";
        public string Color => IsMessage ? "#569CD6" : "#4EC9B0";
    }

    public class ScriptNode
    {
        public string Label { get; set; }
        public string Content { get; set; }
    }

    public class AssetBundleService
    {
        private AssetsManager _manager;

        private Dictionary<int, string> _commandMap = new Dictionary<int, string>();
        private Dictionary<int, string> _flagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _sysFlagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _workMap = new Dictionary<int, string>();
        private Dictionary<string, string> _fileNameMap = new Dictionary<string, string>();

        public Dictionary<int, string> PokemonMap { get; private set; } = new Dictionary<int, string>();

        public string InitLog { get; private set; } = "Not Initialized";
        public string InitSummary => $"Cmds: {_commandMap.Count}, Files: {_fileNameMap.Count}, Pokes: {PokemonMap.Count}";

        public AssetBundleService() { _manager = new AssetsManager(); }

        public void Initialize(string jsonDir)
        {
            _commandMap.Clear(); _flagMap.Clear(); _sysFlagMap.Clear(); _workMap.Clear(); _fileNameMap.Clear();
            try
            {
                LoadMap(jsonDir, "commands.json", _commandMap);
                LoadMap(jsonDir, "flags.json", _flagMap);
                LoadMap(jsonDir, "sys_flags.json", _sysFlagMap);
                LoadMap(jsonDir, "work.json", _workMap);
                LoadFileMap(jsonDir, "file_names.json");
                InitLog = $"Backend Ready. {_commandMap.Count} cmds.";
            }
            catch (Exception ex) { InitLog = ex.Message; }
        }

        private void LoadMap(string dir, string f, Dictionary<int, string> map)
        {
            string p = Path.Combine(dir, f);
            if (File.Exists(p))
            {
                try
                {
                    var list = JsonConvert.DeserializeObject<List<NameDef>>(File.ReadAllText(p));
                    if (list != null) foreach (var d in list) if (!map.ContainsKey(d.Id)) map[d.Id] = d.Name;
                }
                catch { }
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
                    if (list != null)
                    {
                        foreach (var d in list)
                        {
                            if (!string.IsNullOrEmpty(d.FileName) && !_fileNameMap.ContainsKey(d.FileName))
                                _fileNameMap[d.FileName] = d.FriendlyName;
                        }
                    }
                }
                catch { }
            }
        }

        // --- POKEMON LOADER ---
        public void LoadPokemonData(string msgBundlePath)
        {
            PokemonMap.Clear();
            if (!File.Exists(msgBundlePath)) return;

            try
            {
                if (_manager.Files.Any(f => f.path == msgBundlePath))
                {
                    _manager.UnloadAssetsFile(msgBundlePath);
                    _manager.UnloadBundleFile(msgBundlePath);
                }

                var bundleInstance = _manager.LoadBundleFile(msgBundlePath);
                var afile = _manager.LoadAssetsFileFromBundle(bundleInstance, 0);
                var infos = afile.file.GetAssetsOfType(AssetClassID.MonoBehaviour);

                foreach (var info in infos)
                {
                    var baseField = _manager.GetBaseField(afile, info);
                    var nameField = baseField["m_Name"];
                    if (!nameField.IsDummy && nameField.AsString == "english_ss_monsname")
                    {
                        var entries = baseField["labelDataArray"]; // Primary check
                        if (entries.IsDummy) entries = baseField["entries"];
                        if (entries.IsDummy) entries = baseField["data"];
                        if (entries.IsDummy) entries = baseField["Array"];

                        if (!entries.IsDummy && entries.Children.Count > 0)
                        {
                            var items = (entries.Children[0].FieldName == "Array") ? entries.Children[0] : entries;
                            foreach (var item in items.Children)
                            {
                                var indexField = item["arrayIndex"];
                                var wordDataArray = item["wordDataArray"];

                                if (!indexField.IsDummy && !wordDataArray.IsDummy && wordDataArray.Children.Count > 0)
                                {
                                    int id = indexField.AsInt;
                                    var firstWord = wordDataArray.Children[0];
                                    if (firstWord.FieldName == "Array") firstWord = firstWord.Children[0];
                                    var strField = firstWord["str"];
                                    if (!strField.IsDummy) PokemonMap[id] = strField.AsString;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            catch (Exception ex) { Console.WriteLine("Error loading pokemon: " + ex.Message); }
        }

        // --- MESSAGE FILES LOADER ---
        public List<FileNode> LoadMessageFiles(string bundlePath)
        {
            var output = new List<FileNode>();
            try
            {
                if (!_manager.Files.Any(f => f.path == bundlePath))
                {
                    var bundle = _manager.LoadBundleFile(bundlePath);
                    _manager.LoadAssetsFileFromBundle(bundle, 0);
                }

                var inst = _manager.Files.FirstOrDefault(f => f.path == bundlePath);
                if (inst == null) return output;

                var infos = inst.file.GetAssetsOfType(AssetClassID.MonoBehaviour);

                foreach (var info in infos)
                {
                    var baseField = _manager.GetBaseField(inst, info);
                    var nameField = baseField["m_Name"];
                    if (nameField.IsDummy) continue;

                    string name = nameField.AsString;
                    if (!name.StartsWith("english_") || name == "english_ss_monsname") continue;

                    var fileNode = new FileNode { Name = name.Replace("english_", ""), IsMessage = true };

                    var entries = baseField["labelDataArray"];
                    if (entries.IsDummy) entries = baseField["entries"];

                    if (!entries.IsDummy && entries.Children.Count > 0)
                    {
                        var items = (entries.Children[0].FieldName == "Array") ? entries.Children[0] : entries;
                        foreach (var item in items.Children)
                        {
                            string label = item["labelName"].AsString;
                            string text = "";
                            var wordDataArray = item["wordDataArray"];
                            if (!wordDataArray.IsDummy && wordDataArray.Children.Count > 0)
                            {
                                var words = (wordDataArray.Children[0].FieldName == "Array") ? wordDataArray.Children[0] : wordDataArray;
                                if (words.Children.Count > 0) text = words.Children[0]["str"].AsString;
                            }
                            fileNode.Scripts.Add(new ScriptNode { Label = label, Content = text });
                        }
                    }

                    if (fileNode.Scripts.Count > 0)
                    {
                        fileNode.Scripts = fileNode.Scripts.OrderBy(s => s.Label).ToList();
                        output.Add(fileNode);
                    }
                }
            }
            catch (Exception ex) { Console.WriteLine("Msg Load Error: " + ex.Message); }
            return output.OrderBy(f => f.Name).ToList();
        }

        // --- SCRIPT LOADER ---
        public List<FileNode> LoadAndDecompile(string bundlePath)
        {
            var output = new List<FileNode>();
            try
            {
                if (_manager.Files.Any(f => f.path == bundlePath))
                {
                    _manager.UnloadAssetsFile(bundlePath);
                    _manager.UnloadBundleFile(bundlePath);
                }

                var bundleInstance = _manager.LoadBundleFile(bundlePath);
                var afile = _manager.LoadAssetsFileFromBundle(bundleInstance, 0);
                var infos = afile.file.GetAssetsOfType(AssetClassID.MonoBehaviour);

                foreach (var info in infos)
                {
                    try
                    {
                        var baseField = _manager.GetBaseField(afile, info);
                        var nameField = baseField["m_Name"];
                        if (nameField.IsDummy) continue;

                        var internalName = nameField.AsString;
                        if (string.IsNullOrEmpty(internalName) || internalName.StartsWith("EvCam")) continue;

                        string displayName = internalName;
                        if (_fileNameMap.ContainsKey(internalName)) displayName = $"{_fileNameMap[internalName]} ({internalName})";

                        var strListField = baseField["StrList"];
                        List<string> stringTable = new List<string>();
                        if (!strListField.IsDummy)
                        {
                            var data = (strListField.Children.Count == 1 && strListField.Children[0].FieldName == "Array") ? strListField.Children[0] : strListField;
                            foreach (var s in data.Children) stringTable.Add(s.AsString);
                        }

                        var scriptsField = baseField["Scripts"];
                        if (scriptsField.IsDummy) continue;
                        if (scriptsField.Children.Count == 1 && scriptsField.Children[0].FieldName == "Array") scriptsField = scriptsField.Children[0];

                        var fileNode = new FileNode { Name = displayName, IsMessage = false };

                        for (int i = 0; i < scriptsField.Children.Count; i++)
                        {
                            var script = scriptsField[i];
                            var sb = new StringBuilder();
                            string label = $"{internalName}_seq_{i}";
                            var labelField = script["Label"];
                            if (!labelField.IsDummy && !string.IsNullOrEmpty(labelField.AsString)) label = labelField.AsString;

                            sb.AppendLine($"{label}:");

                            var commandsField = script["Commands"];
                            if (!commandsField.IsDummy)
                            {
                                if (commandsField.Children.Count == 1 && commandsField.Children[0].FieldName == "Array") commandsField = commandsField.Children[0];

                                for (int j = 0; j < commandsField.Children.Count; j++)
                                {
                                    var cmd = commandsField[j];
                                    var args = cmd["Arg"];
                                    if (!args.IsDummy)
                                    {
                                        if (args.Children.Count == 1 && args.Children[0].FieldName == "Array") args = args.Children[0];
                                        if (args.Children.Count > 0)
                                        {
                                            int cmdId = !args[0]["data"].IsDummy ? args[0]["data"].AsInt : 0;
                                            string cmdName = _commandMap.ContainsKey(cmdId) ? _commandMap[cmdId] : $"cmd_{cmdId}";
                                            var argList = new List<string>();
                                            for (int k = 1; k < args.Children.Count; k++)
                                            {
                                                var type = !args[k]["argType"].IsDummy ? args[k]["argType"].AsInt : 0;
                                                var val = !args[k]["data"].IsDummy ? args[k]["data"].AsInt : 0;
                                                argList.Add(FormatArg(type, val, stringTable));
                                            }
                                            sb.AppendLine($"\t{cmdName} {string.Join(" ", argList)}");
                                        }
                                    }
                                }
                            }
                            fileNode.Scripts.Add(new ScriptNode { Label = label, Content = sb.ToString() });
                        }
                        if (fileNode.Scripts.Count > 0) output.Add(fileNode);
                    }
                    catch { continue; }
                }
            }
            catch (Exception ex) { output.Add(new FileNode { Name = "ERROR", Scripts = { new ScriptNode { Label = "Log", Content = ex.ToString() } } }); }
            return output;
        }

        private string FormatArg(int type, int val, List<string> stringTable)
        {
            switch (type)
            {
                case 1:
                    byte[] bytes = BitConverter.GetBytes(val);
                    float floatVal = BitConverter.ToSingle(bytes, 0);
                    return floatVal.ToString(CultureInfo.InvariantCulture);
                case 2: return _workMap.ContainsKey(val) ? _workMap[val] : $"var_{val}";
                case 3: return _flagMap.ContainsKey(val) ? _flagMap[val] : $"flag_{val}";
                case 4: return _sysFlagMap.ContainsKey(val) ? _sysFlagMap[val] : $"sys_{val}";
                case 5:
                    if (val >= 0 && val < stringTable.Count)
                    {
                        string rawString = stringTable[val];
                        byte[] rawBytes = Encoding.GetEncoding("iso-8859-1").GetBytes(rawString);
                        return $"\"{Encoding.UTF8.GetString(rawBytes)}\"";
                    }
                    return $"\"<MISSING_STR_{val}>\"";
                default: return val.ToString();
            }
        }
    }
}