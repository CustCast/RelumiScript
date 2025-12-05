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
    // Data classes must be public for JSON deserialization
    public class FileNode
    {
        public string Name { get; set; }
        public List<ScriptNode> Scripts { get; set; } = new List<ScriptNode>();
    }

    public class ScriptNode
    {
        public string Label { get; set; }
        public string Content { get; set; }
    }

    public class NameDef
    {
        [JsonProperty("Id")]
        public int Id { get; set; }
        [JsonProperty("Name")]
        public string Name { get; set; }
    }

    public class AssetBundleService
    {
        private AssetsManager _manager;

        // Dictionaries to map IDs to human-readable names
        private Dictionary<int, string> _commandMap = new Dictionary<int, string>();
        private Dictionary<int, string> _flagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _sysFlagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _workMap = new Dictionary<int, string>();

        public string InitLog { get; private set; } = "Not Initialized";

        // Helps debug if data was actually loaded
        public string InitSummary => $"Cmds: {_commandMap.Count}, Flags: {_flagMap.Count}, Sys: {_sysFlagMap.Count}, Work: {_workMap.Count}";

        public AssetBundleService()
        {
            _manager = new AssetsManager();
        }

        public void Initialize(string jsonDir)
        {
            try
            {
                // Clear previous data to prevent duplicates on re-init
                _commandMap.Clear();
                _flagMap.Clear();
                _sysFlagMap.Clear();
                _workMap.Clear();

                LoadMap(jsonDir, "commands.json", _commandMap);
                LoadMap(jsonDir, "flags.json", _flagMap);
                LoadMap(jsonDir, "sys_flags.json", _sysFlagMap);
                LoadMap(jsonDir, "work.json", _workMap);

                InitLog = $"Backend Initialized. {InitSummary}";
            }
            catch (Exception ex)
            {
                InitLog = "Backend Init Error: " + ex.Message;
            }
        }

        private void LoadMap(string dir, string filename, Dictionary<int, string> map)
        {
            // Priority: 1. CustomReference folder, 2. Root JSON folder
            string customPath = Path.Combine(dir, "CustomReference", filename);
            string defaultPath = Path.Combine(dir, filename);

            if (!TryLoadFile(customPath, map))
            {
                TryLoadFile(defaultPath, map);
            }
        }

        private bool TryLoadFile(string path, Dictionary<int, string> map)
        {
            if (!File.Exists(path)) return false;
            try
            {
                var json = File.ReadAllText(path);
                var defs = JsonConvert.DeserializeObject<List<NameDef>>(json);
                if (defs != null && defs.Count > 0)
                {
                    foreach (var def in defs)
                    {
                        // Use the first definition found for an ID
                        if (!map.ContainsKey(def.Id)) map[def.Id] = def.Name;
                    }
                    return true;
                }
            }
            catch { /* Ignore malformed files */ }
            return false;
        }

        public List<FileNode> LoadAndDecompile(string bundlePath)
        {
            var output = new List<FileNode>();

            try
            {
                _manager.UnloadAll();
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

                        var name = nameField.AsString;
                        // Skip camera or empty assets
                        if (string.IsNullOrEmpty(name) || name.StartsWith("EvCam")) continue;

                        // 1. Get String Table (Used for Argument Type 5)
                        var strListField = baseField["StrList"];
                        List<string> stringTable = new List<string>();
                        if (!strListField.IsDummy)
                        {
                            var data = (strListField.Children.Count == 1 && strListField.Children[0].FieldName == "Array")
                                ? strListField.Children[0] : strListField;
                            foreach (var s in data.Children) stringTable.Add(s.AsString);
                        }

                        // 2. Get Scripts
                        var scriptsField = baseField["Scripts"];
                        if (scriptsField.IsDummy) continue;
                        if (scriptsField.Children.Count == 1 && scriptsField.Children[0].FieldName == "Array")
                            scriptsField = scriptsField.Children[0];

                        var fileNode = new FileNode { Name = name };

                        for (int i = 0; i < scriptsField.Children.Count; i++)
                        {
                            var script = scriptsField[i];
                            var sb = new StringBuilder();

                            string label = $"{name}_seq_{i}";
                            var labelField = script["Label"];
                            if (!labelField.IsDummy && !string.IsNullOrEmpty(labelField.AsString))
                                label = labelField.AsString;

                            sb.AppendLine($"{label}:");

                            var commandsField = script["Commands"];
                            if (!commandsField.IsDummy)
                            {
                                if (commandsField.Children.Count == 1 && commandsField.Children[0].FieldName == "Array")
                                    commandsField = commandsField.Children[0];

                                for (int j = 0; j < commandsField.Children.Count; j++)
                                {
                                    var cmd = commandsField[j];
                                    var args = cmd["Arg"];

                                    if (!args.IsDummy)
                                    {
                                        if (args.Children.Count == 1 && args.Children[0].FieldName == "Array")
                                            args = args.Children[0];

                                        if (args.Children.Count > 0)
                                        {
                                            var arg0 = args[0]["data"];
                                            int cmdId = (!arg0.IsDummy) ? arg0.AsInt : 0;

                                            // Resolve Command Name
                                            string cmdName = _commandMap.ContainsKey(cmdId) ? _commandMap[cmdId] : $"cmd_{cmdId}";

                                            var argList = new List<string>();
                                            // Start at 1 because arg[0] is the Command ID
                                            for (int k = 1; k < args.Children.Count; k++)
                                            {
                                                var type = !args[k]["argType"].IsDummy ? args[k]["argType"].AsInt : 0;
                                                var val = !args[k]["data"].IsDummy ? args[k]["data"].AsInt : 0;

                                                argList.Add(FormatArg(type, val, stringTable));
                                            }

                                            // Formatting: Tab + Command + Space-separated Args
                                            sb.AppendLine($"\t{cmdName} {string.Join(" ", argList)}");
                                        }
                                    }
                                }
                            }

                            fileNode.Scripts.Add(new ScriptNode
                            {
                                Label = label,
                                Content = sb.ToString()
                            });
                        }

                        if (fileNode.Scripts.Count > 0)
                            output.Add(fileNode);
                    }
                    catch { continue; }
                }
            }
            catch (Exception ex)
            {
                var errNode = new FileNode { Name = "ERROR_LOG" };
                errNode.Scripts.Add(new ScriptNode { Label = "Log", Content = ex.ToString() + "\nInit Log: " + InitLog });
                output.Add(errNode);
            }

            return output;
        }

        private string FormatArg(int type, int val, List<string> stringTable)
        {
            switch (type)
            {
                case 1: // Number (Float conversion)
                    byte[] bytes = BitConverter.GetBytes(val);
                    float floatVal = BitConverter.ToSingle(bytes, 0);
                    return floatVal.ToString(CultureInfo.InvariantCulture);

                case 2: // Work Variable
                    return _workMap.ContainsKey(val) ? _workMap[val] : $"var_{val}";

                case 3: // Flag
                    return _flagMap.ContainsKey(val) ? _flagMap[val] : $"flag_{val}";

                case 4: // System Flag
                    return _sysFlagMap.ContainsKey(val) ? _sysFlagMap[val] : $"sys_{val}";

                case 5: // String
                    if (val >= 0 && val < stringTable.Count)
                    {
                        // [FIX] URL-Decode the string to handle characters like '(' (%28)
                        string encodedStr = stringTable[val];
                        // We must decode twice just in case, but usually once is enough for Unity URL encoding
                        string decodedStr = System.Uri.UnescapeDataString(encodedStr);
                        return $"\"{decodedStr}\"";
                    }
                    return $"\"<MISSING_STR_{val}>\"";

                default:
                    return val.ToString();
            }
        }
    }
}