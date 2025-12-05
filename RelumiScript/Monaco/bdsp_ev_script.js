// RelumiScript/Monaco/bdsp_ev_script.js

// --- 1. IMMEDIATE SETUP: Register Language ID & Basic Syntax ---
// This runs as soon as the file is loaded, so the editor knows 'bdsp' exists.
if (!monaco.languages.getLanguages().some(l => l.id === 'bdsp')) {
    monaco.languages.register({ id: 'bdsp' });
}

// Set a default "fallback" tokenizer immediately.
// This ensures 'cmd_123' and comments are colored even if data loading fails or takes time.
monaco.languages.setMonarchTokensProvider('bdsp', {
    tokenizer: {
        root: [
            [/cmd_-?\d+/, 'keyword'],
            [/flag_-?\d+/, 'type'],
            [/sys_-?\d+/, 'variable'],
            [/var_-?\d+/, 'regexp'],
            [/\d+/, 'number'],
            [/[;].*$/, 'comment'],
            [/"[^"]*"/, 'string'] // Added string support
        ]
    }
});

// --- 2. DATA HANDLING ---
// Data structures to hold our loaded keywords
var loadedData = {
    commands: [],
    flags: [],
    sysflags: [],
    works: []
};

// Called by C# to trigger the data load
function loadSyntaxFromFile(filename) {
    console.log("Injecting syntax data file: " + filename);
    var script = document.createElement('script');
    script.src = filename;
    script.onload = function () {
        if (window.RELUMI_DATA) {
            applySyntaxData(window.RELUMI_DATA);
        }
    };
    document.head.appendChild(script);
}

// Process the raw JSON data into our highlighter
function applySyntaxData(data) {
    try {
        console.log("Applying syntax data...");

        // Map raw JSON to simple string arrays for the Tokenizer
        // This is much faster than creating class instances for just coloring
        if (data.commands) loadedData.commands = data.commands.map(c => c.Name);
        if (data.flags) loadedData.flags = data.flags.map(f => f.Name);
        if (data.sysflags) loadedData.sysflags = data.sysflags.map(f => f.Name);
        if (data.works) loadedData.works = data.works.map(w => w.Name);

        // --- 3. DYNAMIC UPDATE: Re-Register Tokenizer with Keywords ---
        updateTokenizer();

        // Force editor to repaint
        if (window.editor) {
            var model = window.editor.getModel();
            var oldVal = model.getValue();
            model.setValue(oldVal); // Simple hack to force re-tokenization
        }

        console.log("Syntax Highlighting Updated. Commands: " + loadedData.commands.length);
    } catch (e) {
        console.error("Syntax Error: " + e);
    }
}

function updateTokenizer() {
    monaco.languages.setMonarchTokensProvider('bdsp', {
        // These lists are injected into the tokenizer
        commands: loadedData.commands,
        flags: loadedData.flags,
        sysflags: loadedData.sysflags,
        works: loadedData.works,

        tokenizer: {
            root: [
                // 1. Match specific Keywords (The "Context" you were missing)
                // This regex looks for words and checks if they exist in the lists above
                [/[a-zA-Z_][\w\-\.']*/, {
                    cases: {
                        '@commands': 'keyword',
                        '@flags': 'type',
                        '@sysflags': 'variable',
                        '@works': 'regexp',
                        '@default': 'identifier' // White text if not in list
                    }
                }],

                // 2. Match Fallback Patterns (cmd_XXX)
                [/cmd_-?\d+/, 'keyword'],
                [/flag_-?\d+/, 'type'],
                [/sys_-?\d+/, 'variable'],
                [/var_-?\d+/, 'regexp'],

                // 3. Common types
                { include: '@whitespace' },
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/\d+/, 'number'],
                [/"[^"]*"/, 'string'], // Strings in cyan/orange
                [/[,.]/, 'delimiter']
            ],
            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/[;].*$/, 'comment']
            ]
        }
    });
}