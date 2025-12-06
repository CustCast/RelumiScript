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
    public class FileNode { public string Name { get; set; } public List<ScriptNode> Scripts { get; set; } = new List<ScriptNode>(); }
    public class ScriptNode { public string Label { get; set; } public string Content { get; set; } }

    public class AssetBundleService
    {
        private AssetsManager _manager;
        private Dictionary<int, string> _commandMap = new Dictionary<int, string>();
        private Dictionary<int, string> _flagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _sysFlagMap = new Dictionary<int, string>();
        private Dictionary<int, string> _workMap = new Dictionary<int, string>();

        public string InitLog { get; private set; } = "Not Initialized";
        public string InitSummary => $"Cmds: {_commandMap.Count}, Flags: {_flagMap.Count}";

        public AssetBundleService() { _manager = new AssetsManager(); }

        public void Initialize(string jsonDir)
        {
            _commandMap.Clear(); _flagMap.Clear(); _sysFlagMap.Clear(); _workMap.Clear();
            try
            {
                // Strictly load from Root JSON folder
                LoadMap(jsonDir, "commands.json", _commandMap);
                LoadMap(jsonDir, "flags.json", _flagMap);
                LoadMap(jsonDir, "sys_flags.json", _sysFlagMap);
                LoadMap(jsonDir, "work.json", _workMap);
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
                        if (string.IsNullOrEmpty(name) || name.StartsWith("EvCam")) continue;

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

                        var fileNode = new FileNode { Name = name };

                        for (int i = 0; i < scriptsField.Children.Count; i++)
                        {
                            var script = scriptsField[i];
                            var sb = new StringBuilder();
                            string label = $"{name}_seq_{i}";
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

                        // 1. Convert the string to a byte array using Latin1/ISO-8859-1.
                        // This treats the string as a collection of raw bytes, preventing C# from discarding them.
                        byte[] rawBytes = Encoding.GetEncoding("iso-8859-1").GetBytes(rawString);

                        // 2. Convert the raw bytes back to a string using UTF-8.
                        // This forces the proper multi-byte decoding, fixing the '' characters.
                        string decodedString = Encoding.UTF8.GetString(rawBytes);

                        // 3. Apply URI unescaping (as originally intended).
                        return $"\"{stringTable[val]}\"";
                    }
                    return $"\"<MISSING_STR_{val}>\"";
                default: return val.ToString();
            }
        }
    }
}