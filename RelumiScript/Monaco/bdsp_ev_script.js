// RelumiScript/Monaco/bdsp_ev_script.js

class Command { constructor(id, name, description, dummy, animation, args) { this.id = id; this.name = name; this.description = description; this.dummy = dummy; this.animation = animation; this.args = args; } }
class Arg { constructor(name, description, type, optional) { this.name = name; this.description = description; this.type = type; this.optional = optional; } }
class Flag { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }
class SystemFlag { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }
class WorkVariable { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }

var commands = [], flags = [], sysflags = [], works = [];
var tokenRegistration, hoverRegistration, completionRegistration;

function initializeLanguageData(cmdData, flagData, sysData, workData) {
    try {
        commands = []; flags = []; sysflags = []; works = [];

        // Data comes in as objects now, but handle string fallback just in case
        var cData = (typeof cmdData === 'string') ? JSON.parse(cmdData) : cmdData;
        var fData = (typeof flagData === 'string') ? JSON.parse(flagData) : flagData;
        var sData = (typeof sysData === 'string') ? JSON.parse(sysData) : sysData;
        var wData = (typeof workData === 'string') ? JSON.parse(workData) : workData;

        if (cData) cData.forEach(d => {
            var args = d.Args ? d.Args.map(a => new Arg(a.TentativeName, a.Description, a.Type, a.Optional)) : [];
            commands.push(new Command(d.Id, d.Name, d.Description, d.Dummy, d.Animation, args));
        });
        if (fData) fData.forEach(d => flags.push(new Flag(d.Id, d.Name, d.Description)));
        if (sData) sData.forEach(d => sysflags.push(new SystemFlag(d.Id, d.Name, d.Description)));
        if (wData) wData.forEach(d => works.push(new WorkVariable(d.Id, d.Name, d.Description)));

        if (tokenRegistration) tokenRegistration.dispose();
        if (hoverRegistration) hoverRegistration.dispose();
        if (completionRegistration) completionRegistration.dispose();

        registerLanguageAndSyntax();

        if (window.editor) {
            var model = window.editor.getModel();
            monaco.editor.setModelLanguage(model, 'bdsp');
        }
    } catch (e) { console.error(e); }
}

function buildCommandDescription(c) {
    var desc = c.description || "";
    var args = (c.args && c.args.length > 0) ? c.args.map(a => `[${a.type}] **${a.name}**\n${a.description || ""}`).join('\n\n') : "None";
    return desc + "\n\n**Args:**\n" + args;
}

function registerLanguageAndSyntax() {
    var langs = monaco.languages.getLanguages();
    if (!langs.some(l => l.id === 'bdsp')) monaco.languages.register({ id: 'bdsp' });

    tokenRegistration = monaco.languages.setMonarchTokensProvider('bdsp', {
        commands: commands.map(c => c.name),
        flags: flags.map(f => f.name),
        sysflags: sysflags.map(s => s.name),
        works: works.map(w => w.name),

        tokenizer: {
            root: [
                [/cmd_-?\d+/, 'keyword'],
                [/flag_-?\d+/, 'type'],
                [/sys_-?\d+/, 'variable'],
                [/var_-?\d+/, 'regexp'],

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
            if (c) return { contents: [{ value: `**${c.name}**` }, { value: buildCommandDescription(c) }] };
            const f = flags.find(x => x.name == word.word);
            if (f) return { contents: [{ value: `**${f.name}**` }, { value: f.description || "" }] };
            return { contents: [] };
        }
    });

    completionRegistration = monaco.languages.registerCompletionItemProvider("bdsp", {
        provideCompletionItems: function (model, pos) {
            var word = model.getWordUntilPosition(pos);
            var range = { startLineNumber: pos.lineNumber, endLineNumber: pos.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };
            var suggestions = [];
            suggestions = suggestions.concat(commands.map(c => ({ label: c.name, kind: monaco.languages.CompletionItemKind.Function, documentation: { value: buildCommandDescription(c) }, insertText: c.name, range: range })));
            return { suggestions: suggestions };
        }
    });
}