// RelumiScript/Monaco/bdsp_ev_script.js

// 1. Data Structures
class Command { constructor(id, name, description, dummy, animation, args) { this.id = id; this.name = name; this.description = description; this.dummy = dummy; this.animation = animation; this.args = args; } }
class Arg { constructor(name, description, type, optional) { this.name = name; this.description = description; this.type = type; this.optional = optional; } }
class Flag { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }
class SystemFlag { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }
class WorkVariable { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }

// 2. Global State
var commands = [];
var flags = [];
var sysflags = [];
var works = [];
var tokenRegistration, hoverRegistration, completionRegistration;

// 3. Loader Function (Called from C#)
function loadSyntaxFromFile(filename) {
    console.log("Loading syntax from: " + filename);

    var script = document.createElement('script');
    script.src = filename;
    script.onload = function () {
        // Data is now available in window.RELUMI_DATA
        if (window.RELUMI_DATA) {
            processData(window.RELUMI_DATA);
        } else {
            console.error("RELUMI_DATA not found in loaded file.");
        }
    };
    script.onerror = function () { console.error("Failed to load syntax script."); };
    document.head.appendChild(script);
}

function processData(data) {
    try {
        commands = []; flags = []; sysflags = []; works = [];

        // Parse Commands
        if (data.commands) data.commands.forEach(d => {
            if (!commands.some(c => c.id === d.Id)) {
                var args = d.Args ? d.Args.map(a => new Arg(a.TentativeName, a.Description, a.Type, a.Optional)) : [];
                commands.push(new Command(d.Id, d.Name, d.Description, d.Dummy, d.Animation, args));
            }
        });

        // Parse Flags/Works
        if (data.flags) data.flags.forEach(d => { if (!flags.some(x => x.id === d.Id)) flags.push(new Flag(d.Id, d.Name, d.Description)); });
        if (data.sysflags) data.sysflags.forEach(d => { if (!sysflags.some(x => x.id === d.Id)) sysflags.push(new SystemFlag(d.Id, d.Name, d.Description)); });
        if (data.works) data.works.forEach(d => { if (!works.some(x => x.id === d.Id)) works.push(new WorkVariable(d.Id, d.Name, d.Description)); });

        // Register new providers with populated lists
        if (tokenRegistration) tokenRegistration.dispose();
        if (hoverRegistration) hoverRegistration.dispose();
        if (completionRegistration) completionRegistration.dispose();

        registerLanguageAndSyntax();

        // [CRITICAL] Force Re-Tokenization
        if (window.editor) {
            var model = window.editor.getModel();
            monaco.editor.setModelLanguage(model, 'plaintext');
            monaco.editor.setModelLanguage(model, 'bdsp');
        }
        console.log("Syntax loaded. Cmds: " + commands.length);

    } catch (e) { console.error("Process Data Error: " + e); }
}

function buildDescription(c) {
    var args = (c.args && c.args.length) ? c.args.map(a => `[${a.type}] **${a.name}**`).join('\n') : "No Args";
    return (c.description || "") + "\n\n" + args;
}

function registerLanguageAndSyntax() {
    if (!monaco.languages.getLanguages().some(l => l.id === 'bdsp')) {
        monaco.languages.register({ id: 'bdsp' });
    }

    tokenRegistration = monaco.languages.setMonarchTokensProvider('bdsp', {
        // [CRITICAL] These arrays define what gets colored!
        commands: commands.map(c => c.name),
        flags: flags.map(f => f.name),
        sysflags: sysflags.map(s => s.name),
        works: works.map(w => w.name),

        tokenizer: {
            root: [
                // Fallback Regex rules
                [/cmd_-?\d+/, 'keyword'],
                [/flag_-?\d+/, 'type'],
                [/sys_-?\d+/, 'variable'],
                [/var_-?\d+/, 'regexp'],

                // Keyword list rules (This colors _SET_WEATHER, etc.)
                [/[a-zA-Z_][\w\-\.']*/, {
                    cases: {
                        '@commands': 'keyword',
                        '@flags': 'type',
                        '@sysflags': 'variable',
                        '@works': 'regexp',
                        '@default': 'identifier'
                    }
                }],
                { include: '@whitespace' },
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/\d+/, 'number'],
                [/[,.]/, 'delimiter'],
            ],
            whitespace: [[/[ \t\r\n]+/, 'white'], [/;.*$/, 'comment'], [/\/\/.*$/, 'comment']]
        }
    });

    hoverRegistration = monaco.languages.registerHoverProvider("bdsp", {
        provideHover: function (model, pos) {
            const word = model.getWordAtPosition(pos);
            if (!word) return { contents: [] };
            const c = commands.find(x => x.name == word.word);
            if (c) return { contents: [{ value: `**${c.name}**` }, { value: buildDescription(c) }] };
            const f = flags.find(x => x.name == word.word);
            if (f) return { contents: [{ value: `**${f.name}**` }, { value: f.description || "" }] };
            return { contents: [] };
        }
    });

    completionRegistration = monaco.languages.registerCompletionItemProvider("bdsp", {
        provideCompletionItems: function (model, pos) {
            var word = model.getWordUntilPosition(pos);
            var range = { startLineNumber: pos.lineNumber, endLineNumber: pos.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };
            var suggestions = commands.map(c => ({
                label: c.name,
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: { value: buildDescription(c) },
                insertText: c.name,
                range: range
            }));
            return { suggestions: suggestions };
        }
    });
}