using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using RelumiScript.Models;

namespace RelumiScript.Services
{
    public class ScriptScanner
    {
        public class ScanResult
        {
            public List<FlagUsageInfo> Flags { get; set; } = new List<FlagUsageInfo>();
            public List<FlagUsageInfo> Works { get; set; } = new List<FlagUsageInfo>();
            public List<CommandUsageInfo> Commands { get; set; } = new List<CommandUsageInfo>();
        }

        public static async Task<ScanResult> ScanAllAsync(
            IEnumerable<object> nodes,
            Dictionary<int, string> knownFlags,
            Dictionary<int, string> knownSysFlags,
            Dictionary<int, string> knownWorks)
        {
            return await Task.Run(() =>
            {
                var result = new ScanResult();

                // Case-insensitive dictionaries to handle inconsistencies (e.g., @SCWK_TEMP0 vs @scwk_temp0)
                var combinedFlags = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedWorks = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedCommands = new Dictionary<string, CommandUsageInfo>(StringComparer.OrdinalIgnoreCase);

                // 1. Pre-populate with known definitions
                foreach (var kvp in knownFlags) AddPredefined(combinedFlags, kvp.Value, "#");
                foreach (var kvp in knownSysFlags) AddPredefined(combinedFlags, kvp.Value, "$");
                foreach (var kvp in knownWorks) AddPredefined(combinedWorks, kvp.Value, "@");

                // 2. Scan Content
                foreach (var node in nodes)
                {
                    if (node is FileNode fNode)
                    {
                        int offset = 0;
                        foreach (var s in fNode.Scripts)
                        {
                            ScanContent(s.Content, fNode.Name, fNode, combinedFlags, combinedWorks, combinedCommands, offset);
                            offset += CountLines(s.Content);
                        }
                    }
                    else if (node is ScriptNode sNode)
                    {
                        ScanContent(sNode.Content, "Root", sNode, combinedFlags, combinedWorks, combinedCommands, 0);
                    }
                }

                // 3. Convert to Sorted Lists
                result.Flags = combinedFlags.Values
                    .OrderByDescending(x => x.Locations.Count > 0)
                    .ThenBy(x => x.FlagName)
                    .ToList();

                result.Works = combinedWorks.Values
                    .OrderByDescending(x => x.Locations.Count > 0)
                    .ThenBy(x => x.FlagName)
                    .ToList();

                result.Commands = combinedCommands.Values
                    .OrderByDescending(x => x.Locations.Count > 0)
                    .ThenBy(x => x.CommandName)
                    .ToList();

                return result;
            });
        }

        private static void AddPredefined(Dictionary<string, FlagUsageInfo> dict, string name, string prefix)
        {
            string key = name.StartsWith(prefix) ? name : $"{prefix}{name}";
            if (!dict.ContainsKey(key)) dict[key] = new FlagUsageInfo { FlagName = key };
        }

        private static int CountLines(string s) => s.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None).Length;

        private static void ScanContent(
            string content,
            string fileName,
            object nodeObj,
            Dictionary<string, FlagUsageInfo> flags,
            Dictionary<string, FlagUsageInfo> works,
            Dictionary<string, CommandUsageInfo> commands,
            int lineOffset)
        {
            var lines = content.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                if (string.IsNullOrWhiteSpace(line) || line.TrimStart().StartsWith("//") || line.TrimStart().StartsWith(";")) continue;

                // --- Command Detection ---
                string currentCmd = "UNK";
                var cmdMatch = Regex.Match(line.Trim(), @"^([A-Z_][A-Z0-9_]*)");
                if (cmdMatch.Success)
                {
                    currentCmd = cmdMatch.Groups[1].Value;
                    if (!line.Trim().StartsWith(currentCmd + ":")) // Ignore labels like Label_Name:
                    {
                        if (!commands.ContainsKey(currentCmd)) commands[currentCmd] = new CommandUsageInfo { CommandName = currentCmd };
                        commands[currentCmd].Locations.Add(new FlagLocation
                        {
                            LineNumber = i + 1 + lineOffset,
                            Command = currentCmd,
                            Content = line.Trim(),
                            FileName = fileName,
                            NodeObject = nodeObj
                        });
                    }
                }

                // --- Flag & Work Detection ---
                var flagMatches = Regex.Matches(line, @"([#$][A-Za-z0-9_]+)");
                var workMatches = Regex.Matches(line, @"(@[A-Za-z0-9_]+)");

                foreach (Match m in flagMatches)
                {
                    string f = m.Value;
                    if (!flags.ContainsKey(f)) flags[f] = new FlagUsageInfo { FlagName = f };
                    flags[f].Locations.Add(new FlagLocation { LineNumber = i + 1 + lineOffset, Command = currentCmd, Content = line.Trim(), FileName = fileName, NodeObject = nodeObj });
                }

                foreach (Match m in workMatches)
                {
                    string w = m.Value;
                    if (!works.ContainsKey(w)) works[w] = new FlagUsageInfo { FlagName = w };
                    works[w].Locations.Add(new FlagLocation { LineNumber = i + 1 + lineOffset, Command = currentCmd, Content = line.Trim(), FileName = fileName, NodeObject = nodeObj });
                }
            }
        }
    }
}