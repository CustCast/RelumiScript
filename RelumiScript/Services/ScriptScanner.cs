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

        // Compiled Regexes
        private static readonly Regex LabelRegex = new Regex(@"^([A-Za-z0-9_]+):$", RegexOptions.Compiled);
        private static readonly Regex CommandRegex = new Regex(@"^([A-Z_][A-Z0-9_]*)", RegexOptions.Compiled);
        private static readonly Regex FlagRegex = new Regex(@"([#$][A-Za-z0-9_]+)", RegexOptions.Compiled);
        private static readonly Regex WorkRegex = new Regex(@"(@[A-Za-z0-9_]+)", RegexOptions.Compiled);
        private static readonly Regex WordRegex = new Regex(@"\b[A-Za-z0-9_]+\b", RegexOptions.Compiled);

        public static async Task<ScanResult> ScanAllAsync(
            IEnumerable<object> nodes,
            Dictionary<int, string> knownFlags,
            Dictionary<int, string> knownSysFlags,
            Dictionary<int, string> knownWorks)
        {
            return await Task.Run(() =>
            {
                var result = new ScanResult();

                var combinedFlags = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedWorks = new Dictionary<string, FlagUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedCommands = new Dictionary<string, CommandUsageInfo>(StringComparer.OrdinalIgnoreCase);
                var combinedEvents = new Dictionary<string, EventUsageInfo>(StringComparer.OrdinalIgnoreCase);

                // 1. Pre-populate known definitions
                foreach (var kvp in knownFlags) AddPredefined(combinedFlags, kvp.Value, "#");
                foreach (var kvp in knownSysFlags) AddPredefined(combinedFlags, kvp.Value, "$");
                foreach (var kvp in knownWorks) AddPredefined(combinedWorks, kvp.Value, "@");

                // 2. Identify Scripts to Scan
                // We flatten FileNodes into individual ScriptNodes + Context
                // UPDATED: Now storing 'NodeContext' to pass the FileNode if available
                var tasks = new List<(ScriptNode Script, string FileName, int LineOffset, object NodeContext)>();

                foreach (var node in nodes)
                {
                    if (node is FileNode fNode)
                    {
                        int currentOffset = 0;
                        foreach (var s in fNode.Scripts)
                        {
                            // Pass fNode as the context
                            tasks.Add((s, fNode.Name, currentOffset, fNode));
                            // Estimate line count for offset without splitting
                            currentOffset += CountLines(s.Content);
                        }
                    }
                    else if (node is ScriptNode sNode)
                    {
                        // Pass sNode itself if it's a root script
                        tasks.Add((sNode, "Root", 0, sNode));
                    }
                }

                // 3. Scan Content
                // Pass 1: Declarations
                foreach (var task in tasks)
                {
                    ScanScriptForDeclarations(task.Script, task.FileName, task.LineOffset, task.NodeContext, combinedEvents);
                }

                // Pass 2: References
                foreach (var task in tasks)
                {
                    ScanScriptContent(task.Script, task.FileName, task.LineOffset, task.NodeContext, combinedFlags, combinedWorks, combinedCommands, combinedEvents);
                }

                // 4. Convert to Sorted Lists
                result.Flags = combinedFlags.Values.OrderByDescending(x => x.Locations.Count > 0).ThenBy(x => x.FlagName).ToList();
                result.Works = combinedWorks.Values.OrderByDescending(x => x.Locations.Count > 0).ThenBy(x => x.FlagName).ToList();
                result.Commands = combinedCommands.Values.OrderByDescending(x => x.Locations.Count > 0).ThenBy(x => x.CommandName).ToList();
                result.Events = combinedEvents.Values.OrderBy(x => x.EventName).ToList();

                return result;
            });
        }

        private static int CountLines(string text)
        {
            if (string.IsNullOrEmpty(text)) return 0;
            int count = 1;
            for (int i = 0; i < text.Length; i++) if (text[i] == '\n') count++;
            return count;
        }

        private static void AddPredefined(Dictionary<string, FlagUsageInfo> dict, string name, string prefix)
        {
            string key = name.StartsWith(prefix) ? name : $"{prefix}{name}";
            if (!dict.ContainsKey(key)) dict[key] = new FlagUsageInfo { FlagName = key };
        }

        // Helper to iterate lines without allocating string arrays
        private static IEnumerable<(string Line, int StartIndex, int Length)> IterateLines(string text)
        {
            if (string.IsNullOrEmpty(text)) yield break;

            int index = 0;
            while (index < text.Length)
            {
                int nextR = text.IndexOf('\r', index);
                int nextN = text.IndexOf('\n', index);

                int lineEnd;
                int newlineLen;

                if (nextR != -1 && nextN == nextR + 1) // \r\n
                {
                    lineEnd = nextR;
                    newlineLen = 2;
                }
                else if (nextR != -1 && (nextN == -1 || nextR < nextN)) // \r only
                {
                    lineEnd = nextR;
                    newlineLen = 1;
                }
                else if (nextN != -1) // \n only
                {
                    lineEnd = nextN;
                    newlineLen = 1;
                }
                else // End of string
                {
                    lineEnd = text.Length;
                    newlineLen = 0;
                }

                int len = lineEnd - index;
                yield return (text.Substring(index, len), index, len);

                index = lineEnd + newlineLen;
            }
        }

        private static void ScanScriptForDeclarations(
            ScriptNode script,
            string fileName,
            int lineOffset,
            object nodeContext,
            Dictionary<string, EventUsageInfo> events)
        {
            int lineIdx = 0;
            foreach (var (line, start, len) in IterateLines(script.Content))
            {
                string trimmed = line.Trim();
                if (!string.IsNullOrWhiteSpace(trimmed) && !trimmed.StartsWith("//") && !trimmed.StartsWith(";"))
                {
                    var labelMatch = LabelRegex.Match(trimmed);
                    if (labelMatch.Success)
                    {
                        string labelName = labelMatch.Groups[1].Value;
                        if (!events.ContainsKey(labelName)) events[labelName] = new EventUsageInfo { EventName = labelName };

                        events[labelName].Locations.Add(new FlagLocation
                        {
                            LineNumber = lineIdx + 1 + lineOffset,
                            Command = "DEF",
                            StartIndex = start,
                            Length = len,
                            FileName = fileName,
                            NodeObject = nodeContext, // Store NodeContext (FileNode) for dynamic lookup
                            IsDeclaration = true
                        });
                    }
                }
                lineIdx++;
            }
        }

        private static void ScanScriptContent(
            ScriptNode script,
            string fileName,
            int lineOffset,
            object nodeContext,
            Dictionary<string, FlagUsageInfo> flags,
            Dictionary<string, FlagUsageInfo> works,
            Dictionary<string, CommandUsageInfo> commands,
            Dictionary<string, EventUsageInfo> events)
        {
            int lineIdx = 0;
            foreach (var (line, start, len) in IterateLines(script.Content))
            {
                string trimmed = line.Trim();
                if (string.IsNullOrWhiteSpace(trimmed) || trimmed.StartsWith("//") || trimmed.StartsWith(";"))
                {
                    lineIdx++;
                    continue;
                }

                if (trimmed.EndsWith(":"))
                {
                    lineIdx++;
                    continue;
                }

                // 1. Identify Command
                string currentCmd = "UNK";
                var cmdMatch = CommandRegex.Match(trimmed);
                if (cmdMatch.Success)
                {
                    currentCmd = cmdMatch.Groups[1].Value;
                    if (!commands.ContainsKey(currentCmd)) commands[currentCmd] = new CommandUsageInfo { CommandName = currentCmd };
                    commands[currentCmd].Locations.Add(new FlagLocation
                    {
                        LineNumber = lineIdx + 1 + lineOffset,
                        Command = currentCmd,
                        StartIndex = start,
                        Length = len,
                        FileName = fileName,
                        NodeObject = nodeContext
                    });
                }

                // 2. Identify Flags (#)
                foreach (Match m in FlagRegex.Matches(line))
                {
                    string f = m.Value;
                    if (!flags.ContainsKey(f)) flags[f] = new FlagUsageInfo { FlagName = f };
                    flags[f].Locations.Add(new FlagLocation
                    {
                        LineNumber = lineIdx + 1 + lineOffset,
                        Command = currentCmd,
                        StartIndex = start,
                        Length = len,
                        FileName = fileName,
                        NodeObject = nodeContext
                    });
                }

                // 3. Identify Works (@)
                foreach (Match m in WorkRegex.Matches(line))
                {
                    string w = m.Value;
                    if (!works.ContainsKey(w)) works[w] = new FlagUsageInfo { FlagName = w };
                    works[w].Locations.Add(new FlagLocation
                    {
                        LineNumber = lineIdx + 1 + lineOffset,
                        Command = currentCmd,
                        StartIndex = start,
                        Length = len,
                        FileName = fileName,
                        NodeObject = nodeContext
                    });
                }

                // 4. Identify Event References
                var words = WordRegex.Matches(line);
                foreach (Match match in words)
                {
                    string word = match.Value;
                    if (word == currentCmd) continue;

                    if (events.TryGetValue(word, out var evtInfo))
                    {
                        evtInfo.Locations.Add(new FlagLocation
                        {
                            LineNumber = lineIdx + 1 + lineOffset,
                            Command = currentCmd,
                            StartIndex = start,
                            Length = len,
                            FileName = fileName,
                            NodeObject = nodeContext,
                            IsDeclaration = false
                        });
                    }
                }
                lineIdx++;
            }
        }
    }
}