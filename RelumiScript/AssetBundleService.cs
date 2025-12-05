using AssetsTools.NET;
using AssetsTools.NET.Extra;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace RelumiScript
{
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

    public class CommandDef { public int Id { get; set; } public string Name { get; set; } }

    public class AssetBundleService
    {
        private AssetsManager _manager;
        private Dictionary<int, string> _commandMap;
        public string InitLog { get; private set; } = "Not Initialized";

        public AssetBundleService()
        {
            _manager = new AssetsManager();
            _commandMap = new Dictionary<int, string>();
        }

        public void Initialize(string jsonDir)
        {
            string cmdPath = Path.Combine(jsonDir, "commands.json");
            LoadCommands(cmdPath);
            InitLog = "Backend Initialized";
        }

        private void LoadCommands(string path)
        {
            if (!File.Exists(path))
            {
                InitLog = "Warning: commands.json not found at " + path;
                return;
            }

            try
            {
                var json = File.ReadAllText(path);
                var cmds = JsonConvert.DeserializeObject<List<CommandDef>>(json);
                if (cmds != null)
                {
                    foreach (var cmd in cmds)
                        if (!_commandMap.ContainsKey(cmd.Id)) _commandMap[cmd.Id] = cmd.Name;
                }
            }
            catch (Exception ex)
            {
                InitLog = "Error loading commands: " + ex.Message;
            }
        }

        public List<FileNode> LoadAndDecompile(string bundlePath)
        {
            var output = new List<FileNode>();

            try
            {
                // Unload previous to prevent conflicts if reloading
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

                        var scriptsField = baseField["Scripts"];
                        if (scriptsField.IsDummy) continue;

                        // Unity Array Unwrapping
                        if (scriptsField.Children.Count == 1 && scriptsField.Children[0].FieldName == "Array")
                        {
                            scriptsField = scriptsField.Children[0];
                        }

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
                                            string cmdName = _commandMap.ContainsKey(cmdId) ? _commandMap[cmdId] : $"_UNK_{cmdId}";

                                            var argList = new List<string>();
                                            for (int k = 1; k < args.Children.Count; k++)
                                            {
                                                var type = !args[k]["argType"].IsDummy ? args[k]["argType"].AsInt : 0;
                                                var val = !args[k]["data"].IsDummy ? args[k]["data"].AsInt : 0;
                                                argList.Add(FormatArg(type, val));
                                            }
                                            sb.AppendLine($"\t{cmdName}({string.Join(", ", argList)})");
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
                InitLog += " | Load Error: " + ex.Message;
            }

            return output;
        }

        private string FormatArg(int type, int val) => type switch { 2 => $"@{val}", 3 => $"#{val}", 4 => $"${val}", _ => val.ToString() };
    }
}