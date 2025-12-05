// RelumiScript/Monaco/bdsp_ev_script.js

class Command {
    constructor(id, name, description, dummy, animation, args) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dummy = dummy;
        this.animation = animation;
        this.args = args;
    }
}

class Arg {
    constructor(name, description, type, optional) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.optional = optional;
    }
}

class Flag {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

class SystemFlag {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

class WorkVariable {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

var commands = [];
var flags = [];
var sysflags = [];
var works = [];

var tokenRegistration;
var hoverRegistration;
var completionRegistration;

// We do NOT call syntaxReload() immediately. 
// We wait for C# to call initializeLanguageData().

function initializeLanguageData(cmdData, flagData, sysData, workData) {
    // Reset arrays
    commands = [];
    flags = [];
    sysflags = [];
    works = [];

    // Parse inputs if they are strings (JSON), otherwise assume they are objects
    var cData = (typeof cmdData === 'string') ? JSON.parse(cmdData) : cmdData;
    var fData = (typeof flagData === 'string') ? JSON.parse(flagData) : flagData;
    var sData = (typeof sysData === 'string') ? JSON.parse(sysData) : sysData;
    var wData = (typeof workData === 'string') ? JSON.parse(workData) : workData;

    if (tokenRegistration) tokenRegistration.dispose();
    if (hoverRegistration) hoverRegistration.dispose();
    if (completionRegistration) completionRegistration.dispose();

    handleCommands(cData);
    handleFlags(fData);
    handleSysFlags(sData);
    handleWork(wData);

    registerLanguageAndSyntax();

    // Refresh the tokens in the editor if it exists
    if (window.editor) {
        var model = window.editor.getModel();
        monaco.editor.setModelLanguage(model, 'bdsp');
    }
}

function handleCommands(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        // Safe check for args to prevent crashes on partial data
        var args = data[i].Args ? data[i].Args.map(a => new Arg(a.TentativeName, a.Description, a.Type, a.Optional)) : [];

        var command = new Command(data[i].Id, data[i].Name, data[i].Description, data[i].Dummy, data[i].Animation, args);
        commands.push(command);
    }
}

function handleFlags(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        var flag = new Flag(data[i].Id, data[i].Name, data[i].Description);
        flags.push(flag);
    }
}

function handleSysFlags(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        var sysFlag = new SystemFlag(data[i].Id, data[i].Name, data[i].Description);
        sysflags.push(sysFlag);
    }
}

function handleWork(data) {
    if (!data) return;
    for (var i = 0; i < data.length; i++) {
        var work = new WorkVariable(data[i].Id, data[i].Name, data[i].Description);
        works.push(work);
    }
}

function buildCommandDescription(command) {
    var descriptionItems = [];
    if (command.animation) descriptionItems.push("[Animation command]");
    if (command.dummy) descriptionItems.push("This command is dummied out and does nothing.");
    else descriptionItems.push(!command.description ? "This command is not documented yet." : command.description);

    var description = descriptionItems.join(" ");
    var args = "No arguments.";

    if (command.args && command.args.length > 0) {
        args = command.args.map(a => {
            var types = a.type ? a.type.join(", ") : "Unknown";
            var optional = a.optional ? "(Optional) " : "";
            return "[" + types + "] **" + a.name + "** - " + optional + a.description;
        }).join('\n\n');
    }
    return description + "\n\nArguments:\n\n" + args;
}

function registerLanguageAndSyntax() {
    // Check if language exists to avoid duplicate errors
    var langs = monaco.languages.getLanguages();
    var exists = false;
    for (var i = 0; i < langs.length; i++) {
        if (langs[i].id === 'bdsp') exists = true;
    }

    if (!exists) {
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

                [/[a-zA-Z_][\w\-\.']*/, {
                    cases: {
                        '@commands': 'keyword',
                        '@flags': 'type.keyword',
                        '@sysflags': 'annotation',
                        '@works': 'regexp',
                        '@default': 'identifier'
                    }
                }],
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

    hoverRegistration = monaco.languages.registerHoverProvider("bdsp", {
        provideHover: function (model, position) {
            const word = model.getWordAtPosition(position);
            if (word) {
                const command = commands.find(c => c.name == word.word);
                if (command) {
                    return { contents: [{ value: '**Command ' + command.id + ' - ' + command.name + '**' }, { value: buildCommandDescription(command) }] };
                }
                const flag = flags.find(f => f.name == word.word);
                if (flag) {
                    return { contents: [{ value: '**Flag ' + flag.id + ' - ' + flag.name + '**' }, { value: flag.description }] };
                }
                const sysflag = sysflags.find(s => s.name == word.word);
                if (sysflag) {
                    return { contents: [{ value: '**System Flag ' + sysflag.id + ' - ' + sysflag.name + '**' }, { value: sysflag.description }] };
                }
                const work = works.find(w => w.name == word.word);
                if (work) {
                    return { contents: [{ value: '**Work ' + work.id + ' - ' + work.name + '**' }, { value: work.description }] };
                }
            }
            return { contents: [] };
        }
    });

    completionRegistration = monaco.languages.registerCompletionItemProvider("bdsp", {
        provideCompletionItems: function (model, position) {
            var word = model.getWordUntilPosition(position);
            var range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };

            var suggestions = [];

            // Suggest commands
            suggestions = suggestions.concat(commands.map(c => {
                return {
                    label: c.name,
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: { value: buildCommandDescription(c) },
                    insertText: c.name,
                    range: range
                }
            }));

            // Suggest flags, etc
            suggestions = suggestions.concat(flags.map(f => {
                return { label: f.name, kind: monaco.languages.CompletionItemKind.Field, documentation: f.description, insertText: f.name, range: range };
            }));
            suggestions = suggestions.concat(sysflags.map(s => {
                return { label: s.name, kind: monaco.languages.CompletionItemKind.Property, documentation: s.description, insertText: s.name, range: range };
            }));
            suggestions = suggestions.concat(works.map(w => {
                return { label: w.name, kind: monaco.languages.CompletionItemKind.Variable, documentation: w.description, insertText: w.name, range: range };
            }));

            return { suggestions: suggestions };
        }
    });
}