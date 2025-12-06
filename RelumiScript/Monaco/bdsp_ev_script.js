// RelumiScript/Monaco/bdsp_ev_script.js

// 1. Setup Language
if (!monaco.languages.getLanguages().some(l => l.id === 'bdsp')) {
    monaco.languages.register({ id: 'bdsp' });
}

monaco.languages.setMonarchTokensProvider('bdsp', {
    tokenizer: {
        root: [
            [/cmd_-?\d+/, 'keyword'],
            [/flag_-?\d+/, 'type'],
            [/sys_-?\d+/, 'variable'],
            [/var_-?\d+/, 'regexp'],
            [/\d+/, 'number'],
            [/[;].*$/, 'comment'],
            [/"[^"]*"/, 'string']
        ]
    }
});

var loadedData = { commands: [], flags: [], sysflags: [], works: [] };

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
        loadedData.commands = safeMap(data.commands);
        loadedData.flags = safeMap(data.flags);
        loadedData.sysflags = safeMap(data.sysflags);
        loadedData.works = safeMap(data.works);

        console.log(`[JS] Cmds: ${loadedData.commands.length}`);

        monaco.languages.setMonarchTokensProvider('bdsp', {
            commands: loadedData.commands,
            flags: loadedData.flags,
            sysflags: loadedData.sysflags,
            works: loadedData.works,

            tokenizer: {
                root: [
                    // Dynamic Coloring
                    [/[a-zA-Z_][\w\-\.']*/, {
                        cases: {
                            '@commands': 'keyword',  // CHANGED: Purple/Blue (Stronger color)
                            '@flags': 'type',        // Green
                            '@sysflags': 'variable', // Blue
                            '@works': 'regexp',      // Red/Orange
                            '@default': 'identifier'
                        }
                    }],
                    // Fallbacks
                    [/cmd_-?\d+/, 'keyword'],
                    [/flag_-?\d+/, 'type'],
                    [/sys_-?\d+/, 'variable'],
                    [/var_-?\d+/, 'regexp'],
                    { include: '@whitespace' },
                    [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                    [/\d+/, 'number'],
                    [/"[^"]*"/, 'string'],
                    [/[,.]/, 'delimiter']
                ],
                whitespace: [
                    [/[ \t\r\n]+/, 'white'],
                    [/[;].*$/, 'comment'],
                    [/\/\/.*$/, 'comment']
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