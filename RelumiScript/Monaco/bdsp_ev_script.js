// ... [Keep your existing class definitions for Command, Arg, Flag, etc. at the top] ...
// Or just replace the whole file with this block:

class Command { constructor(id, name, description, dummy, animation, args) { this.id = id; this.name = name; this.description = description; this.dummy = dummy; this.animation = animation; this.args = args; } }
class Arg { constructor(name, description, type, optional) { this.name = name; this.description = description; this.type = type; this.optional = optional; } }
class Flag { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }
class SystemFlag { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }
class WorkVariable { constructor(id, name, description) { this.id = id; this.name = name; this.description = description; } }

var commands = [];
var flags = [];
var sysflags = [];
var works = [];

var tokenRegistration;
var hoverRegistration;
var completionRegistration;

syntaxReload();

function syntaxReload() {
    commands = []; flags = []; sysflags = []; works = [];

    if (tokenRegistration) tokenRegistration.dispose();
    if (hoverRegistration) hoverRegistration.dispose();
    if (completionRegistration) completionRegistration.dispose();

    loadFiles()
        .then(registerLanguageAndSyntax)
        .catch(function (err) {
            console.log('Error while loading JSON: ' + err);
        });
}

async function loadFiles() {
    // FIX: Point to the correct build output location
    const jsonPath = '../JSON/';

    const fetchJson = async (filename, handler) => {
        try {
            // Try standard path
            let response = await fetch(jsonPath + filename);
            if (!response.ok) {
                // Fallback: Try looking in a CustomReference subfolder if it exists
                response = await fetch(jsonPath + 'CustomReference/' + filename);
            }
            if (!response.ok) throw new Error(response.statusText);

            const data = await response.json();
            handler(data);
        } catch (e) {
            console.warn(`Failed to load ${filename}:`, e);
        }
    };

    // Load all necessary files in parallel
    return Promise.all([
        fetchJson('commands.json', handleCommands),
        fetchJson('flags.json', handleFlags),
        fetchJson('sys_flags.json', handleSysFlags),
        fetchJson('work.json', handleWork)
    ]);
}

function handleCommands(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        if (!commands.map(c => c.id).includes(data[i].Id)) {
            var command = new Command(data[i].Id, data[i].Name, data[i].Description, data[i].Dummy, data[i].Animation, data[i].Args.map(a => new Arg(a.TentativeName, a.Description, a.Type, a.Optional)));
            commands.push(command);
        }
    }
}

function handleFlags(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        if (!flags.map(f => f.id).includes(data[i].Id)) {
            var flag = new Flag(data[i].Id, data[i].Name, data[i].Description);
            flags.push(flag);
        }
    }
}

function handleSysFlags(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        if (!sysflags.map(s => s.id).includes(data[i].Id)) {
            var sysFlag = new SystemFlag(data[i].Id, data[i].Name, data[i].Description);
            sysflags.push(sysFlag);
        }
    }
}

function handleWork(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        if (!works.map(w => w.id).includes(data[i].Id)) {
            var work = new WorkVariable(data[i].Id, data[i].Name, data[i].Description);
            works.push(work);
        }
    }
}

function buildCommandDescription(command) {
    var descriptionItems = [];
    if (command.animation) descriptionItems.push("[Animation command]");
    if (command.dummy) descriptionItems.push("This command is dummied out and does nothing.");
    else descriptionItems.push(command.description == "" ? "This command is not documented yet." : command.description);

    var args = "";
    if (!command.args || command.args.length == 0) args = "No arguments.";
    else {
        args = command.args.map(a => {
            var types = a.type ? a.type.join(", ") : "Unknown";
            var optional = a.optional ? "(Optional) " : "";
            return "[" + types + "] **" + a.name + "** - " + optional + a.description;
        }).join('\n\n');
    }
    return descriptionItems.join(" ") + "\n\nArguments:\n\n" + args;
}

function registerLanguageAndSyntax() {
    // Ensure we don't register twice if the page refreshes
    const languages = monaco.languages.getLanguages();
    if (!languages.some(l => l.id === 'bdsp')) {
        monaco.languages.register({ id: 'bdsp' });
    }

    tokenRegistration = monaco.languages.setMonarchTokensProvider('bdsp', {
        commands: commands.map(c => c.name),
        flags: flags.map(f => f.name),
        sysflags: sysflags.map(s => s.name),
        works: works.map(w => w.name),

        tokenizer: {
            root: [
                [/cmd_-?\d+/, 'keyword'],
                [/flag_-?\d+/, 'type.keyword'],
                [/sys_-?\d+/, 'annotation'],
                [/var_-?\d+/, 'regexp'],
                [/[a-zA-Z_][\w\-\.']*/, { cases: { '@commands': 'keyword', '@flags': 'type.keyword', '@sysflags': 'annotation', '@works': 'regexp', '@default': 'identifier' } }],
                { include: '@whitespace' },
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/\d+/, 'number'],
                [/[,.]/, 'delimiter'],
            ],
            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/;.*$/, 'comment'],
            ],
        }
    });

    // Register Hover Provider (Tooltips)
    hoverRegistration = monaco.languages.registerHoverProvider("bdsp", {
        provideHover: function (model, position) {
            const word = model.getWordAtPosition(position);
            if (word) {
                const command = commands.find(c => c.name == word.word);
                if (command) return { contents: [{ value: '**Command ' + command.id + ' - ' + command.name + '**' }, { value: buildCommandDescription(command) }] };

                const flag = flags.find(f => f.name == word.word);
                if (flag) return { contents: [{ value: '**Flag ' + flag.id + ' - ' + flag.name + '**' }, { value: flag.description }] };

                const sysflag = sysflags.find(s => s.name == word.word);
                if (sysflag) return { contents: [{ value: '**System Flag ' + sysflag.id + ' - ' + sysflag.name + '**' }, { value: sysflag.description }] };

                const work = works.find(w => w.name == word.word);
                if (work) return { contents: [{ value: '**Work ' + work.id + ' - ' + work.name + '**' }, { value: work.description }] };
            }
            return { contents: [] };
        }
    });

    // Register Autocomplete
    completionRegistration = monaco.languages.registerCompletionItemProvider("bdsp", {
        provideCompletionItems: function (model, position) {
            let line = model.getLineContent(position.lineNumber);
            let lineTrimmed = line.trimStart();
            var word = model.getWordUntilPosition(position);
            var range = { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber, startColumn: word.startColumn, endColumn: word.endColumn };

            // If at the start of the line (command position)
            if (position.column <= (line.length - lineTrimmed.length) + word.word.length + 1) {
                return { suggestions: commands.map(c => ({ label: c.name, kind: monaco.languages.CompletionItemKind.Function, documentation: buildCommandDescription(c), insertText: c.name, range: range })) };
            } else {
                // Argument position (Flags, SysFlags, Vars)
                var suggestions = flags.map(f => ({ label: f.name, kind: monaco.languages.CompletionItemKind.Field, documentation: f.description, insertText: f.name, range: range }))
                    .concat(sysflags.map(s => ({ label: s.name, kind: monaco.languages.CompletionItemKind.Property, documentation: s.description, insertText: s.name, range: range })),
                        works.map(w => ({ label: w.name, kind: monaco.languages.CompletionItemKind.Variable, documentation: w.description, insertText: w.name, range: range })));
                return { suggestions: suggestions };
            }
        }
    });
}