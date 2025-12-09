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
    /// <summary>
    /// Represents a named definition with an ID and name, used for JSON deserialization.
    /// </summary>
    public class NameDef { [JsonProperty("Id")] public int Id { get; set; } [JsonProperty("Name")] public string? Name { get; set; } }

    /// <summary>
    /// Represents a file name mapping with internal and friendly names.
    /// </summary>
    public class FileNameDef { public string FileName { get; set; } = ""; public string FriendlyName { get; set; } = ""; }

    /// <summary>
    /// Represents a file node containing multiple scripts.
    /// </summary>
    public class FileNode
    {
        public string Name { get; set; } = "Unknown";
        public bool IsMessage { get; set; }
        public List<ScriptNode> Scripts { get; set; } = new List<ScriptNode>();
        public string Icon => IsMessage ? "💬" : "📜";
        public string Color => IsMessage ? "#569CD6" : "#4EC9B0";
    }

    /// <summary>
    /// Represents a single script with a label and content.
    /// </summary>
    public class ScriptNode { public string Label { get; set; } = ""; public string Content { get; set; } = ""; }

    /// <summary>
    /// Service for loading and decompiling Pokémon BDSP asset bundles.
    /// Handles Unity AssetBundle parsing, script decompilation, and message file loading.
    /// </summary>
    public class AssetBundleService
    {
        private AssetsManager _manager;
        private Dictionary<int, string> _commandMap = new Dictionary<int, string>();
        private Dictionary<int, string> _flagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _sysFlagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _workMap = new Dictionary<int, string>();
        private Dictionary<string, string> _fileNameMap = new Dictionary<string, string>();

        public Dictionary<int, string> PokemonMap { get; private set; } = new Dictionary<int, string>();
        public Dictionary<int, string> ItemMap { get; private set; } = new Dictionary<int, string>();
        public Dictionary<int, string> FlagMap => _flagMap;
        public Dictionary<int, string> SysFlagMap => _sysFlagMap;

        public string InitLog { get; private set; } = "Not Initialized";
        public string InitSummary => $"Cmds: {_commandMap.Count}, Files: {_fileNameMap.Count}, Pokes: {PokemonMap.Count}, Items: {ItemMap.Count}";

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
                    if (list != null) foreach (var d in list) if (!map.ContainsKey(d.Id) && d.Name != null) map[d.Id] = d.Name;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error loading {f}: {ex.Message}");
                }
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
                    if (list != null) foreach (var d in list) if (!_fileNameMap.ContainsKey(d.FileName)) _fileNameMap[d.FileName] = d.FriendlyName;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error loading {f}: {ex.Message}");
                }
            }
        }

        // Renamed from LoadPokemonData to LoadGameData to reflect broader purpose
        public void LoadGameData(string msgBundlePath)
        {
            PokemonMap.Clear();
            ItemMap.Clear();

            if (!File.Exists(msgBundlePath)) return;
            try
            {
                if (_manager.Files.Any(f => f.path == msgBundlePath)) { _manager.UnloadAssetsFile(msgBundlePath); _manager.UnloadBundleFile(msgBundlePath); }
                var bundle = _manager.LoadBundleFile(msgBundlePath);
                var afile = _manager.LoadAssetsFileFromBundle(bundle, 0);

                foreach (var info in afile.file.GetAssetsOfType(AssetClassID.MonoBehaviour))
                {
                    var baseField = _manager.GetBaseField(afile, info);
                    string assetName = baseField["m_Name"].AsString;

                    // CHECK 1: Pokemon Names
                    if (assetName == "english_ss_monsname")
                    {
                        ParseStringList(baseField, PokemonMap);
                    }
                    // CHECK 2: Item Names (matches ss_itemname, ss_itemname_acc, etc.)
                    else if (assetName.Contains("ss_itemname"))
                    {
                        ParseStringList(baseField, ItemMap);
                    }
                }
            }
            catch (Exception ex) { Console.WriteLine("GameDataLoad Error: " + ex.Message); }
        }

        // Helper to parse the standard MSBT array structure
        private void ParseStringList(AssetTypeValueField baseField, Dictionary<int, string> targetMap)
        {
            var entries = baseField["labelDataArray"];
            if (entries.IsDummy) entries = baseField["entries"];
            if (!entries.IsDummy && entries.Children.Count == 1 && entries.Children[0].FieldName == "Array")
                entries = entries.Children[0];

            if (!entries.IsDummy)
            {
                foreach (var item in entries.Children)
                {
                    var idx = item["arrayIndex"];
                    var words = item["wordDataArray"];
                    if (!words.IsDummy && words.Children.Count > 0 && words.Children[0].FieldName == "Array")
                        words = words.Children[0];

                    if (!idx.IsDummy && !words.IsDummy && words.Children.Count > 0)
                    {
                        string val = words.Children[0]["str"].AsString;
                        // Avoid overwriting if we have duplicates (first one usually wins or is main)
                        if (!targetMap.ContainsKey(idx.AsInt))
                            targetMap[idx.AsInt] = val;
                    }
                }
            }
        }

        public List<FileNode> LoadMessageFiles(string bundlePath)
        {
            var output = new List<FileNode>();
            try
            {
                if (_manager.Files.Any(f => f.path == bundlePath)) { _manager.UnloadAssetsFile(bundlePath); _manager.UnloadBundleFile(bundlePath); }
                var bundle = _manager.LoadBundleFile(bundlePath);
                var afile = _manager.LoadAssetsFileFromBundle(bundle, 0);

                foreach (var info in afile.file.GetAssetsOfType(AssetClassID.MonoBehaviour))
                {
                    var baseField = _manager.GetBaseField(afile, info);
                    string name = baseField["m_Name"].AsString;
                    if (!name.StartsWith("english_") || name == "english_ss_monsname") continue;

                    var node = new FileNode { Name = name.Replace("english_", ""), IsMessage = true };

                    var entries = baseField["labelDataArray"];
                    if (entries.IsDummy) entries = baseField["entries"];
                    if (!entries.IsDummy && entries.Children.Count == 1 && entries.Children[0].FieldName == "Array")
                        entries = entries.Children[0];

                    if (!entries.IsDummy)
                    {
                        foreach (var item in entries.Children)
                        {
                            string txt = "";
                            var words = item["wordDataArray"];
                            if (!words.IsDummy && words.Children.Count > 0 && words.Children[0].FieldName == "Array")
                                words = words.Children[0];

                            if (!words.IsDummy && words.Children.Count > 0)
                            {
                                txt = words.Children[0]["str"].AsString;
                            }
                            node.Scripts.Add(new ScriptNode { Label = item["labelName"].AsString, Content = txt });
                        }
                    }
                    if (node.Scripts.Count > 0)
                    {
                        node.Scripts.Sort((a, b) => string.Compare(a.Label, b.Label));
                        output.Add(node);
                    }
                }
            }
            catch (Exception ex) { Console.WriteLine("MsgLoad Error: " + ex.Message); }
            return output.OrderBy(f => f.Name).ToList();
        }

        public List<FileNode> LoadAndDecompile(string bundlePath)
        {
            var output = new List<FileNode>();
            try
            {
                if (_manager.Files.Any(f => f.path == bundlePath)) { _manager.UnloadAssetsFile(bundlePath); _manager.UnloadBundleFile(bundlePath); }
                var bundle = _manager.LoadBundleFile(bundlePath);
                var afile = _manager.LoadAssetsFileFromBundle(bundle, 0);

                foreach (var info in afile.file.GetAssetsOfType(AssetClassID.MonoBehaviour))
                {
                    var baseField = _manager.GetBaseField(afile, info);
                    string name = baseField["m_Name"].AsString;
                    if (string.IsNullOrEmpty(name) || name.StartsWith("EvCam")) continue;

                    string display = _fileNameMap.ContainsKey(name) ? $"{_fileNameMap[name]} ({name})" : name;
                    var node = new FileNode { Name = display, IsMessage = false };

                    var strList = baseField["StrList"];
                    if (!strList.IsDummy && strList.Children.Count == 1 && strList.Children[0].FieldName == "Array")
                        strList = strList.Children[0];

                    var strings = new List<string>();
                    if (!strList.IsDummy)
                    {
                        foreach (var s in strList.Children) strings.Add(s.AsString);
                    }

                    var scripts = baseField["Scripts"];
                    if (scripts.IsDummy) continue;
                    if (scripts.Children.Count == 1 && scripts.Children[0].FieldName == "Array") scripts = scripts.Children[0];

                    for (int i = 0; i < scripts.Children.Count; i++)
                    {
                        var sb = new StringBuilder();
                        var script = scripts[i];
                        string label = !script["Label"].IsDummy ? script["Label"].AsString : $"{name}_seq_{i}";
                        sb.AppendLine($"{label}:");

                        var cmds = script["Commands"];
                        if (!cmds.IsDummy && cmds.Children.Count == 1 && cmds.Children[0].FieldName == "Array") cmds = cmds.Children[0];

                        if (!cmds.IsDummy)
                        {
                            foreach (var cmd in cmds.Children)
                            {
                                var args = cmd["Arg"];
                                if (!args.IsDummy && args.Children.Count == 1 && args.Children[0].FieldName == "Array") args = args.Children[0];

                                if (!args.IsDummy && args.Children.Count > 0)
                                {
                                    int id = args[0]["data"].AsInt;
                                    string cmdName = _commandMap.ContainsKey(id) ? _commandMap[id] : $"cmd_{id}";
                                    var argList = new List<string>();
                                    for (int k = 1; k < args.Children.Count; k++)
                                    {
                                        argList.Add(FormatArg(args[k]["argType"].AsInt, args[k]["data"].AsInt, strings));
                                    }
                                    sb.AppendLine($"\t{cmdName} {string.Join(" ", argList)}");
                                }
                            }
                        }
                        node.Scripts.Add(new ScriptNode { Label = label, Content = sb.ToString() });
                    }
                    if (node.Scripts.Count > 0) output.Add(node);
                }
            }
            catch (Exception ex) { output.Add(new FileNode { Name = "ERROR", Scripts = { new ScriptNode { Label = "Log", Content = ex.ToString() } } }); }
            return output;
        }

        private string FormatArg(int type, int val, List<string> stringTable)
        {
            switch (type)
            {
                case 1: return BitConverter.ToSingle(BitConverter.GetBytes(val), 0).ToString(CultureInfo.InvariantCulture);
                case 2: return _workMap.ContainsKey(val) ? _workMap[val] : $"var_{val}";
                case 3: return _flagMap.ContainsKey(val) ? $"#{_flagMap[val]}" : $"#{val}";
                case 4: return _sysFlagMap.ContainsKey(val) ? $"${_sysFlagMap[val]}" : $"${val}";
                case 5:
                    if (val >= 0 && val < stringTable.Count)
                    {
                        return $"\"{Encoding.UTF8.GetString(Encoding.GetEncoding("iso-8859-1").GetBytes(stringTable[val]))}\"";
                    }
                    return $"\"<MISSING_STR_{val}>\"";
                default: return val.ToString();
            }
        }
    }
}