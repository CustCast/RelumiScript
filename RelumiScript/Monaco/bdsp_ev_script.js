// RelumiScript/Monaco/bdsp_ev_script.js

// 1. Setup Language
if (!monaco.languages.getLanguages().some(l => l.id === 'bdsp')) {
    monaco.languages.register({ id: 'bdsp' });
}

// 2. Tokenizer for New Syntax
monaco.languages.setMonarchTokensProvider('bdsp', {
    tokenizer: {
        root: [
            // Function Call: _COMMAND(
            [/[A-Z_][\w]*\s*(?=\()/, 'keyword'],

            // Prefixed Arguments
            [/![a-zA-Z0-9_]+/, 'regexp'],    // !Work     -> Red/Orange
            [/@[a-zA-Z0-9_]+/, 'string'],    // @Label    -> String Color
            [/#[a-zA-Z0-9_]+/, 'type'],      // #Flag     -> Green
            [/\$[a-zA-Z0-9_]+/, 'variable'], // $SysFlag  -> Blue

            // Strings & Numbers
            [/"[^"]*"/, 'string'],
            [/\d+/, 'number'],

            // Delimiters
            [/[(),]/, 'delimiter'],

            // Comments
            [/[;].*$/, 'comment'],
            [/\/\/.*$/, 'comment']
        ]
    }
});

var loadedData = { commands: [], flags: [], sysflags: [], works: [] };
var commandLookup = {}; // New: Cache full definitions for the converter

function safeMap(array) {
    if (!array || !Array.isArray(array)) return [];
    return array.map(item => item.Name || item.name).filter(n => n);
}

function loadSyntaxFromFile(filename) {
    console.log("[JS] Loading: " + filename);
    var old = document.getElementById('syntax_script');
    if (old) old.remove();

    var script = document.createElement('script');
    script.id = 'syntax_script';
    script.src = filename;

    script.onload = function () {
        if (window.RELUMI_DATA) applySyntaxData(window.RELUMI_DATA);
    };
    document.head.appendChild(script);
}

function applySyntaxData(data) {
    try {
        // 1. Store full data for tokenizer
        loadedData.commands = safeMap(data.commands);
        loadedData.flags = safeMap(data.flags);
        loadedData.sysflags = safeMap(data.sysflags);
        loadedData.works = safeMap(data.works);

        // 2. Store full definitions for the Converter
        if (data.commands) {
            data.commands.forEach(cmd => {
                commandLookup[cmd.Name] = cmd;
            });
        }

        console.log(`[JS] Cmds: ${loadedData.commands.length}`);

        // 3. Update Tokenizer dynamically
        monaco.languages.setMonarchTokensProvider('bdsp', {
            commands: loadedData.commands,
            // ... (keep flags/sysflags/works arrays) ...

            tokenizer: {
                root: [
                    // 1. Commands
                    [/[a-zA-Z_][\w\-\.]*(?=\()/, {
                        cases: {
                            '@commands': 'bdsp-command', // Was 'keyword'
                            '@default': 'identifier'
                        }
                    }],

                    // 2. Prefixed Arguments (Mapped to your new theme)
                    [/![a-zA-Z0-9_\-]+/, 'bdsp-work'],    // Was 'regexp'
                    [/@[a-zA-Z0-9_\-]+/, 'bdsp-label'],   // Was 'string'
                    [/#[a-zA-Z0-9_\-]+/, 'bdsp-flag'],    // Was 'type'
                    [/\$[a-zA-Z0-9_\-]+/, 'bdsp-sysflag'],// Was 'variable'

                    // 3. Fallbacks / Standard formatting
                    { include: '@whitespace' },
                    [/\d*\.\d+([eE][\-+]?\d+)?/, 'bdsp-number'],
                    [/\d+/, 'bdsp-number'],
                    [/"[^"]*"/, 'bdsp-string'],
                    [/[,()]/, 'delimiter']
                ],
                whitespace: [
                    [/[ \t\r\n]+/, 'white'],
                    [/[;].*$/, 'bdsp-comment'],
                    [/\/\/.*$/, 'bdsp-comment']
                ]
            }
        });

        // Force Refresh
        if (window.editor) {
            var m = window.editor.getModel();
            monaco.editor.setModelLanguage(m, 'plaintext');
            setTimeout(() => monaco.editor.setModelLanguage(m, 'bdsp'), 10);
        }

    } catch (e) { console.error(e); }
}

// --- NEW: Legacy Converter ---
// Call this function when loading file content from C# / Backend
window.formatLegacyScript = function (text) {
    if (!text) return "";

    return text.split('\n').map(line => {
        const trimmed = line.trim();
        // Skip comments/empty lines/labels
        if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('//') || trimmed.endsWith(':')) {
            return line;
        }

        const match = trimmed.match(/^([A-Z_][A-Z0-9_]*)(?:\s+(.*))?$/);
        if (!match) return line;

        const cmdName = match[1];
        const argsStr = match[2];
        const cmdDef = commandLookup[cmdName];

        if (!cmdDef) return line;

        if (!argsStr) {
            const indent = line.match(/^\s*/)[0];
            return `${indent}${cmdName}()`;
        }

        // Parse Args (Naive split respecting quotes)
        const args = [];
        const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|[^\s]+/g;
        let m;
        while ((m = regex.exec(argsStr)) !== null) {
            args.push(m[0]);
        }

        const formattedArgs = args.map((arg, index) => {
            const argDef = (cmdDef.Args && cmdDef.Args[index]) ? cmdDef.Args[index] : null;
            if (!argDef) return arg; // Extra args? Leave raw

            const types = argDef.Type || [];

            // 1. Is it a Number? (e.g. 0, 1, -5)
            if (/^-?\d+$/.test(arg)) {
                // If command specifically accepts Numbers, keep it raw (e.g. Compare to 0)
                if (types.includes("Number")) return arg;
                // Otherwise apply prefixes for IDs
                if (types.includes("Work")) return "!" + arg;
                if (types.includes("Flag") || types.includes("SysFlag")) return "#" + arg;
                return arg;
            }

            // 2. Is it a Quoted String?
            if (arg.startsWith('"') || arg.startsWith("'")) {
                const unquoted = arg.slice(1, -1);
                // Heuristic: "EQ", "GT" are operators, not labels
                if (unquoted.length <= 4 && unquoted === unquoted.toUpperCase()) return arg;

                // If it accepts labels, convert string to label syntax
                if (types.includes("Label")) return "@" + unquoted;
                return arg;
            }

            // 3. Flag Logic
            if (types.includes("Flag") || types.includes("System") || types.includes("SysFlag")) {
                return "#" + arg;
            }

            // 4. Ambiguity Resolution (Work vs Label)
            // _IFVAL_JUMP accepts [Work, Number, Label]. We need to guess.
            if (types.includes("Work") && types.includes("Label")) {
                // Heuristic: Jump targets usually start with 'ev_' or 'lbl_'
                if (arg.startsWith("ev_") || arg.startsWith("lbl_") || arg.startsWith("common_")) {
                    return "@" + arg;
                }
                // Variables are usually 'SCWK_ANSWER', 'VAR_SPECIAL', or local 'WK_TEMP'
                return "!" + arg;
            }

            // 5. Default Fallbacks
            if (types.includes("Work")) return "!" + arg;
            if (types.includes("Label")) return "@" + arg;

            return arg;
        });

        const indent = line.match(/^\s*/)[0];
        return `${indent}${cmdName}(${formattedArgs.join(', ')})`;

    }).join('\n');
};