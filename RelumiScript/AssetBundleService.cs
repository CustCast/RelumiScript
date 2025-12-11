using AssetsTools.NET;
using AssetsTools.NET.Extra;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using RelumiScript;

namespace RelumiScript
{
    public class AssetBundleService
    {
        private AssetsManager _manager;

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

        public AssetBundleService() { _manager = new AssetsManager(); }

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

        public void LoadGameData(string msgBundlePath)
        {
            PokemonMap.Clear(); ItemMap.Clear();
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
                    if (assetName == "english_ss_monsname") ParseStringList(baseField, PokemonMap);
                    else if (assetName.Contains("ss_itemname")) ParseStringList(baseField, ItemMap);
                }
            }
            catch (Exception ex) { InitLog = $"GameData Load Error: {ex.Message}"; System.Diagnostics.Debug.WriteLine($"[AssetBundleService] GameData Load Error: {ex.Message}"); }
        }

        private void ParseStringList(AssetTypeValueField baseField, Dictionary<int, string> targetMap)
        {
            var entries = baseField["labelDataArray"];
            if (entries.IsDummy) entries = baseField["entries"];
            if (!entries.IsDummy && entries.Children.Count == 1 && entries.Children[0].FieldName == "Array") entries = entries.Children[0];

            if (!entries.IsDummy)
            {
                foreach (var item in entries.Children)
                {
                    var idx = item["arrayIndex"];
                    var words = item["wordDataArray"];
                    if (!words.IsDummy && words.Children.Count > 0 && words.Children[0].FieldName == "Array") words = words.Children[0];
                    if (!idx.IsDummy && !words.IsDummy && words.Children.Count > 0)
                    {
                        int idxValue = idx.AsInt;
                        if (!targetMap.ContainsKey(idxValue)) targetMap[idxValue] = words.Children[0]["str"].AsString;
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
                    var node = new FileNode { Name = name.Replace("english_", ""), FileName = name, IsMessage = true };
                    var entries = baseField["labelDataArray"];
                    if (entries.IsDummy) entries = baseField["entries"];
                    if (!entries.IsDummy && entries.Children.Count == 1 && entries.Children[0].FieldName == "Array") entries = entries.Children[0];
                    if (!entries.IsDummy)
                    {
                        foreach (var item in entries.Children)
                        {
                            var words = item["wordDataArray"];
                            if (!words.IsDummy && words.Children.Count > 0 && words.Children[0].FieldName == "Array") words = words.Children[0];
                            var lines = new List<string>();
                            if (!words.IsDummy && words.Children.Count > 0)
                            {
                                foreach (var word in words.Children)
                                {
                                    string str = word["str"].AsString;
                                    if (!string.IsNullOrEmpty(str)) lines.Add(str);
                                }
                            }
                            node.Scripts.Add(new ScriptNode { Label = item["labelName"].AsString, Content = string.Join("{n}", lines) });
                        }
                    }
                    if (node.Scripts.Count > 0) { node.Scripts.Sort((a, b) => string.Compare(a.Label, b.Label, StringComparison.Ordinal)); output.Add(node); }
                }
            }
            catch (Exception ex) { InitLog = $"Message Load Error: {ex.Message}"; System.Diagnostics.Debug.WriteLine($"[AssetBundleService] Message Load Error: {ex.Message}"); }
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
                    var node = new FileNode { Name = display, FileName = name, IsMessage = false };
                    var strList = baseField["StrList"];
                    var strings = new List<string>();
                    if (!strList.IsDummy && strList.Children.Count > 0)
                    {
                        var arr = strList.Children.Count == 1 && strList.Children[0].FieldName == "Array" ? strList.Children[0] : strList;
                        foreach (var s in arr.Children) strings.Add(s.AsString);
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
                                        argList.Add(FormatArg(args[k]["argType"].AsInt, args[k]["data"].AsInt, strings));
                                    sb.Append('\t').Append(cmdName).Append(' ').AppendJoin(' ', argList).AppendLine();
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
                case 2: return _workMap.ContainsKey(val) ? $"@{_workMap[val]}" : $"@var_{val}";
                case 3: return _flagMap.ContainsKey(val) ? $"#{_flagMap[val]}" : $"#{val}";
                case 4: return _sysFlagMap.ContainsKey(val) ? $"${_sysFlagMap[val]}" : $"${val}";
                case 5: if (val >= 0 && val < stringTable.Count) { string s = stringTable[val].Replace("\"", "\\\""); return $"\"{s}\""; } return $"\"<MISSING_STR_{val}>\"";
                default: return val.ToString();
            }
        }

        // --- COMPILER / REPACKER (FIXED) ---

        public void Pack(List<FileNode> nodes, string originalBundlePath, string outputPath)
        {
            if (_manager.Files.Any(f => f.path == originalBundlePath))
            {
                _manager.UnloadAssetsFile(originalBundlePath);
                _manager.UnloadBundleFile(originalBundlePath);
            }

            var bundle = _manager.LoadBundleFile(originalBundlePath);
            var afileInst = _manager.LoadAssetsFileFromBundle(bundle, 0);
            var afile = afileInst.file;

            foreach (var info in afile.GetAssetsOfType(AssetClassID.MonoBehaviour))
            {
                // FIX: Get reference to the exact asset info in the file's table to ensure SetNewData applies
                var assetInfo = afile.GetAssetInfo(info.PathId);
                var baseField = _manager.GetBaseField(afileInst, assetInfo);
                string name = baseField["m_Name"].AsString;

                if (string.IsNullOrEmpty(name) || name.StartsWith("EvCam")) continue;

                var node = nodes.FirstOrDefault(n => n.FileName == name);
                if (node == null) continue;

                var newStringTable = new List<string>();
                var scriptsArr = baseField["Scripts"]["Array"];
                scriptsArr.Children.Clear();

                foreach (var scriptNode in node.Scripts)
                {
                    var scriptData = ValueBuilder.DefaultValueFieldFromArrayTemplate(scriptsArr);
                    scriptData["Label"].AsString = scriptNode.Label.TrimEnd(':');

                    var cmdsArr = scriptData["Commands"]["Array"];
                    var lines = scriptNode.Content.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

                    foreach (var line in lines)
                    {
                        var trimmed = line.Trim();
                        if (string.IsNullOrWhiteSpace(trimmed) || trimmed.EndsWith(":") || trimmed.StartsWith(";") || trimmed.StartsWith("//")) continue;

                        var parts = ParseCommand(trimmed);
                        if (parts.Count == 0) continue;

                        string cmdName = parts[0];
                        int cmdId = GetCommandId(cmdName);

                        var cmdData = ValueBuilder.DefaultValueFieldFromArrayTemplate(cmdsArr);
                        var argsArr = cmdData["Arg"]["Array"];

                        var arg0 = ValueBuilder.DefaultValueFieldFromArrayTemplate(argsArr);
                        arg0["argType"].AsInt = 0;
                        arg0["data"].AsInt = cmdId;
                        argsArr.Children.Add(arg0);

                        for (int k = 1; k < parts.Count; k++)
                        {
                            var (type, val) = ParseArgument(parts[k], newStringTable);
                            var argN = ValueBuilder.DefaultValueFieldFromArrayTemplate(argsArr);
                            argN["argType"].AsInt = type;
                            argN["data"].AsInt = val;
                            argsArr.Children.Add(argN);
                        }
                        cmdsArr.Children.Add(cmdData);
                    }
                    scriptsArr.Children.Add(scriptData);
                }

                var strArr = baseField["StrList"]["Array"];
                strArr.Children.Clear();
                foreach (var s in newStringTable)
                {
                    var val = ValueBuilder.DefaultValueFieldFromArrayTemplate(strArr);
                    val.AsString = s;
                    strArr.Children.Add(val);
                }

                // Apply new data to the specific asset info
                assetInfo.SetNewData(baseField);
            }

            // Write modified assets file to memory
            byte[] assetsFileBytes;
            using (var stream = new MemoryStream())
            using (var writer = new AssetsFileWriter(stream))
            {
                afile.Write(writer);
                assetsFileBytes = stream.ToArray();
            }

            // Update bundle content
            var bundleDir = bundle.file.BlockAndDirInfo.DirectoryInfos.FirstOrDefault(d => d.Name == afileInst.name);
            if (bundleDir != null) bundleDir.SetNewData(assetsFileBytes);

            // COMPRESS AND SAVE
            using (var uncompressedStream = new MemoryStream())
            using (var uncompressedWriter = new AssetsFileWriter(uncompressedStream))
            {
                bundle.file.Write(uncompressedWriter); // Write uncompressed to stream

                var newBundle = new AssetBundleFile();
                uncompressedStream.Position = 0;
                newBundle.Read(new AssetsFileReader(uncompressedStream));

                using (var fileStream = File.OpenWrite(outputPath))
                using (var fileWriter = new AssetsFileWriter(fileStream))
                {
                    // FIX: Pack takes (writer, compression) in v3.0.0
                    newBundle.Pack(fileWriter, AssetBundleCompressionType.LZ4);
                }
            }
        }

        private int GetCommandId(string name)
        {
            if (_revCommandMap.TryGetValue(name, out int id)) return id;
            if (name.StartsWith("cmd_") && int.TryParse(name.Substring(4), out int pid)) return pid;
            return 0;
        }

        private (int type, int val) ParseArgument(string raw, List<string> stringTable)
        {
            raw = raw.Trim();
            if (raw.StartsWith("\"")) { string text = raw.Trim('"').Replace("\\\"", "\""); int idx = stringTable.IndexOf(text); if (idx == -1) { idx = stringTable.Count; stringTable.Add(text); } return (5, idx); }
            if (raw.StartsWith("@")) { if (_revWorkMap.TryGetValue(raw, out int id)) return (2, id); if (_revWorkMap.TryGetValue(raw.Substring(1), out id)) return (2, id); if (int.TryParse(raw.Substring(1).Replace("var_", ""), out int vid)) return (2, vid); return (2, 0); }
            if (raw.StartsWith("#")) { if (_revFlagMap.TryGetValue(raw, out int id)) return (3, id); if (_revFlagMap.TryGetValue(raw.Substring(1), out id)) return (3, id); if (int.TryParse(raw.Substring(1), out int fid)) return (3, fid); return (3, 0); }
            if (raw.StartsWith("$")) { if (_revSysFlagMap.TryGetValue(raw, out int id)) return (4, id); if (_revSysFlagMap.TryGetValue(raw.Substring(1), out id)) return (4, id); if (int.TryParse(raw.Substring(1), out int sid)) return (4, sid); return (4, 0); }
            if (raw.Contains(".") && float.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out float fVal)) return (1, BitConverter.ToInt32(BitConverter.GetBytes(fVal), 0));
            if (int.TryParse(raw, out int iVal)) return (0, iVal);
            return (0, 0);
        }

        private List<string> ParseCommand(string line)
        {
            var result = new List<string>();
            var sb = new StringBuilder();
            bool inQuote = false;
            int i = 0;
            while (i < line.Length && !char.IsWhiteSpace(line[i])) sb.Append(line[i++]);
            result.Add(sb.ToString());
            sb.Clear();
            while (i < line.Length && char.IsWhiteSpace(line[i])) i++;
            for (; i < line.Length; i++) { char c = line[i]; if (c == '"') { inQuote = !inQuote; sb.Append(c); } else if (c == ',' && !inQuote) { if (sb.Length > 0) result.Add(sb.ToString().Trim()); sb.Clear(); } else sb.Append(c); }
            if (sb.Length > 0) result.Add(sb.ToString().Trim());
            return result;
        }
    }
}