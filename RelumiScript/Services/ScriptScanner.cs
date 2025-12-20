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
            public List<EventUsageInfo> Events { get; set; } = new List<EventUsageInfo>();
        }

        // Optimization 1: Compile Regexes once to avoid overhead in loops
        private static readonly Regex LabelRegex = new Regex(@"^([A-Za-z0-9_]+):$", RegexOptions.Compiled);
        private static readonly Regex CommandRegex = new Regex(@"^([A-Z_][A-Z0-9_]*)", RegexOptions.Compiled);
        private static readonly Regex FlagRegex = new Regex(@"([#$][A-Za-z0-9_]+)", RegexOptions.Compiled);
        private static readonly Regex WorkRegex = new Regex(@"(@[A-Za-z0-9_]+)", RegexOptions.Compiled);
        private static readonly Regex WordRegex = new Regex(@"\b[A-Za-z0-9_]+\b", RegexOptions.Compiled);

        private static readonly string[] LineSeparators = new[] { "\r\n", "\r", "\n" };

        public static async Task<ScanResult> ScanAllAsync(
            IEnumerable<object> nodes,
            Dictionary<int, string> knownFlags,
            Dictionary<int, string> knownSysFlags,
            Dictionary<int, string> knownWorks)
        {
            return await Task.Run(() =>
            {
                var result = new ScanResult();

                // Case-insensitive dictionaries
                var combinedFlags = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedWorks = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedCommands = new Dictionary<string, CommandUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedEvents = new Dictionary<string, EventUsageInfo>(StringComparer.OrdinalIgnoreCase);

                // 1. Pre-populate known definitions
                foreach (var kvp in knownFlags) AddPredefined(combinedFlags, kvp.Value, "#");
                foreach (var kvp in knownSysFlags) AddPredefined(combinedFlags, kvp.Value, "$");
                foreach (var kvp in knownWorks) AddPredefined(combinedWorks, kvp.Value, "@");

                // Optimization 2: Split content into lines ONCE and store it.
                // This prevents 2-3 extra splits per file later in the pipeline.
                var scriptsToScan = new List<(string[] Lines, string FileName, object NodeObj, int Offset)>(500);

                foreach (var node in nodes)
                {
                    if (node is FileNode fNode)
                    {
                        int currentOffset = 0;
                        foreach (var s in fNode.Scripts)
                        {
                            var lines = s.Content.Split(LineSeparators, StringSplitOptions.None);

                            scriptsToScan.Add((lines, fNode.Name, fNode, currentOffset));

                            // Optimization 3: Use array length directly
                            currentOffset += lines.Length;
                        }
                    }
                    else if (node is ScriptNode sNode)
                    {
                        var lines = sNode.Content.Split(LineSeparators, StringSplitOptions.None);
                        scriptsToScan.Add((lines, "Root", sNode, 0));
                    }
                }

                // 2. PASS ONE: Identify Event Declarations (Labels)
                foreach (var script in scriptsToScan)
                {
                    ScanForDeclarations(script.Lines, script.FileName, script.NodeObj, combinedEvents, script.Offset);
                }

                // 3. PASS TWO: Identify References
                foreach (var script in scriptsToScan)
                {
                    ScanContent(script.Lines, script.FileName, script.NodeObj, combinedFlags, combinedWorks, combinedCommands, combinedEvents, script.Offset);
                }

                // 4. Convert to Sorted Lists
                result.Flags = combinedFlags.Values.OrderByDescending(x => x.Locations.Count > 0).ThenBy(x => x.FlagName).ToList();
                result.Works = combinedWorks.Values.OrderByDescending(x => x.Locations.Count > 0).ThenBy(x => x.FlagName).ToList();
                result.Commands = combinedCommands.Values.OrderByDescending(x => x.Locations.Count > 0).ThenBy(x => x.CommandName).ToList();
                result.Events = combinedEvents.Values.OrderBy(x => x.EventName).ToList();

                return result;
            });
        }

        private static void AddPredefined(Dictionary<string, FlagUsageInfo> dict, string name, string prefix)
        {
            string key = name.StartsWith(prefix) ? name : $"{prefix}{name}";
            if (!dict.ContainsKey(key)) dict[key] = new FlagUsageInfo { FlagName = key };
        }

        private static void ScanForDeclarations(
            string[] lines,
            string fileName,
            object nodeObj,
            Dictionary<string, EventUsageInfo> events,
            int lineOffset)
        {
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i].Trim();
                if (string.IsNullOrWhiteSpace(line) || line.StartsWith("//") || line.StartsWith(";")) continue;

                // Optimization: Use compiled regex
                var labelMatch = LabelRegex.Match(line);
                if (labelMatch.Success)
                {
                    string labelName = labelMatch.Groups[1].Value;
                    if (!events.ContainsKey(labelName)) events[labelName] = new EventUsageInfo { EventName = labelName };

                    events[labelName].Locations.Add(new FlagLocation
                    {
                        LineNumber = i + 1 + lineOffset,
                        Command = "DEF",
                        Content = line,
                        FileName = fileName,
                        NodeObject = nodeObj,
                        IsDeclaration = true
                    });
                }
            }
        }

        private static void ScanContent(
            string[] lines,
            string fileName,
            object nodeObj,
            Dictionary<string, FlagUsageInfo> flags,
            Dictionary<string, FlagUsageInfo> works,
            Dictionary<string, CommandUsageInfo> commands,
            Dictionary<string, EventUsageInfo> events,
            int lineOffset)
        {
            for (int i = 0; i < lines.Length; i++)
            {
                string line = lines[i];
                string trimmed = line.Trim();
                if (string.IsNullOrWhiteSpace(line) || trimmed.StartsWith("//") || trimmed.StartsWith(";")) continue;

                if (trimmed.EndsWith(":")) continue;

                // 1. Identify Command
                string currentCmd = "UNK";
                var cmdMatch = CommandRegex.Match(trimmed);
                if (cmdMatch.Success)
                {
                    currentCmd = cmdMatch.Groups[1].Value;
                    if (!commands.ContainsKey(currentCmd)) commands[currentCmd] = new CommandUsageInfo { CommandName = currentCmd };
                    commands[currentCmd].Locations.Add(new FlagLocation
                    {
                        LineNumber = i + 1 + lineOffset,
                        Command = currentCmd,
                        Content = trimmed,
                        FileName = fileName,
                        NodeObject = nodeObj
                    });
                }

                // 2. Identify Flags (#), SysFlags ($), Works (@)
                foreach (Match m in FlagRegex.Matches(line))
                {
                    string f = m.Value;
                    if (!flags.ContainsKey(f)) flags[f] = new FlagUsageInfo { FlagName = f };
                    flags[f].Locations.Add(new FlagLocation { LineNumber = i + 1 + lineOffset, Command = currentCmd, Content = trimmed, FileName = fileName, NodeObject = nodeObj });
                }
                foreach (Match m in WorkRegex.Matches(line))
                {
                    string w = m.Value;
                    if (!works.ContainsKey(w)) works[w] = new FlagUsageInfo { FlagName = w };
                    works[w].Locations.Add(new FlagLocation { LineNumber = i + 1 + lineOffset, Command = currentCmd, Content = trimmed, FileName = fileName, NodeObject = nodeObj });
                }

                // 3. Identify Event References
                var words = WordRegex.Matches(line);
                foreach (Match match in words)
                {
                    string word = match.Value;
                    if (word == currentCmd) continue;

                    if (events.TryGetValue(word, out var evtInfo))
                    {
                        evtInfo.Locations.Add(new FlagLocation
                        {
                            LineNumber = i + 1 + lineOffset,
                            Command = currentCmd,
                            Content = trimmed,
                            FileName = fileName,
                            NodeObject = nodeObj,
                            IsDeclaration = false
                        });
                    }
                }
            }
        }
    }
}