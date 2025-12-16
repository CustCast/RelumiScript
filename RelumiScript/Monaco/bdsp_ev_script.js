//
// 1. Setup Language
if (!monaco.languages.getLanguages().some((l) => l.id === "bdsp")) {
    monaco.languages.register({ id: "bdsp" });
}

// 2. Define Language Configuration
monaco.languages.setLanguageConfiguration("bdsp", {
    brackets: [
        ["(", ")"],
        ["'", "'"],
    ],
    autoClosingPairs: [
        { open: "(", close: ")" },
        { open: "'", close: "'", notIn: ["string"] },
    ],
    surroundingPairs: [
        { open: "(", close: ")" },
        { open: "'", close: "'" },
    ],
});

// --- GLOBAL STATE ---
var loadedData = { commands: [], flags: [], sysflags: [], works: [] };
var commandLookup = {};
var eventLookup = {}; // New: Look up for event definitions
var pokeMap = {};
var pokeReverseMap = {};
var itemMap = {};
var formMap = {};
var ballMap = {};

// The active hint configuration (populated from JSON)
var hintConfigs = [];

// --- INTELLISENSE HELPERS ---

function getParamDocs(arg) {
    let typeStr = arg.Type ? arg.Type.join(" | ") : "Any";
    let doc = `(\`${typeStr}\`)`;
    if (arg.Optional) doc += ` (Optional)`;
    if (arg.Description) doc += `\n\n${arg.Description}`;
    return doc;
}

function getSignatureData(cmd) {
    if (!cmd) return null;

    let args = cmd.Args || [];
    let params = args.map((arg) => ({
        label: arg.TentativeName || "arg",
        documentation: { value: getParamDocs(arg) },
    }));

    let paramLabels = params.map((p) => p.label);
    let signature = `${cmd.Name}(${paramLabels.join(", ")})`;

    return {
        signature: signature,
        parameters: params,
        documentation: cmd.Description || "No description available.",
    };
}

function getActiveContext(model, position) {
    if (!model || !position) return null;

    const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
    });

    const match = textUntilPosition.match(/([a-zA-Z0-9_]+)\s*\(/g);
    if (!match) return null;

    const lastMatch = match[match.length - 1];
    const cmdName = lastMatch.replace("(", "").trim();

    const openParenIndex = textUntilPosition.lastIndexOf("(");
    const textAfterOpenParen = textUntilPosition.substring(openParenIndex);
    if (textAfterOpenParen.includes(")")) return null;

    const cmd = commandLookup[cmdName];
    const effectiveCmd = cmd || { Name: cmdName, Args: [] };

    const commas = (textAfterOpenParen.match(/,/g) || []).length;

    return { cmd: effectiveCmd, argIndex: commas };
}

// Helper to extract all argument values from the current line's command
function getSiblingArgs(model, lineNumber, cmdName) {
    const lineContent = model.getLineContent(lineNumber);
    const regex = new RegExp(`\\b${cmdName}\\s*\\(([^)]*)`);
    const match = lineContent.match(regex);

    if (match && match[1]) {
        return match[1].split(',').map(s => s.trim());
    }
    return [];
}

// --- PROVIDERS REGISTRATION ---

monaco.languages.registerCompletionItemProvider("bdsp", {
    triggerCharacters: ["(", ","],
    provideCompletionItems: function (model, position) {
        var word = model.getWordUntilPosition(position);
        var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };

        const ctx = getActiveContext(model, position);
        if (!ctx) return { suggestions: [] };

        const activeHint = hintConfigs.find(h => h.Cmd === ctx.cmd.Name && h.ArgIndex === ctx.argIndex);

        let showPokemon = false;
        let showItems = false;
        let showForms = false;

        if (activeHint) {
            if (activeHint.Type === "Pokemon") showPokemon = true;
            if (activeHint.Type === "Item") showItems = true;
            if (activeHint.Type === "Form") showForms = true;
        }

        // --- GENERATE SUGGESTIONS ---

        if (showPokemon) {
            var suggestions = Object.keys(pokeReverseMap).map((name) => {
                let id = pokeReverseMap[name];
                return {
                    label: name,
                    kind: monaco.languages.CompletionItemKind.EnumMember,
                    detail: `ID: ${id}`,
                    documentation: `Insert ID for ${name}`,
                    insertText: id.toString(),
                    range: range,
                };
            });
            return { suggestions: suggestions };
        }

        if (showItems) {
            var suggestions = Object.keys(itemMap).map((id) => {
                let name = itemMap[id];
                return {
                    label: name,
                    kind: monaco.languages.CompletionItemKind.EnumMember,
                    detail: `ID: ${id}`,
                    documentation: `Insert ID for ${name}`,
                    insertText: id.toString(),
                    range: range,
                    sortText: name
                };
            });
            return { suggestions: suggestions };
        }

        if (showForms && activeHint.PokemonArgIndex !== undefined) {
            const args = getSiblingArgs(model, position.lineNumber, ctx.cmd.Name);
            const pokeIdStr = args[activeHint.PokemonArgIndex];

            if (pokeIdStr && /^\d+$/.test(pokeIdStr)) {
                const pokeId = parseInt(pokeIdStr);
                const prefix = `${pokeId}_`;

                var suggestions = Object.keys(formMap)
                    .filter(k => k.startsWith(prefix))
                    .map(key => {
                        const formId = key.split('_')[1];
                        const name = formMap[key];
                        return {
                            label: name,
                            kind: monaco.languages.CompletionItemKind.EnumMember,
                            detail: `Form ID: ${formId}`,
                            documentation: `Insert Form ID for ${name}`,
                            insertText: formId,
                            range: range,
                            sortText: formId
                        };
                    });
                return { suggestions: suggestions };
            }
        }

        // --- COMMAND SUGGESTIONS (Fallback) ---
        var suggestions = Object.values(commandLookup).map((cmd) => {
            let sigData = getSignatureData(cmd);
            let snippetArgs = (cmd.Args || [])
                .map((arg, i) => {
                    return `\${${i + 1}:${arg.TentativeName || "arg"}}`;
                })
                .join(", ");

            return {
                label: cmd.Name,
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: { value: cmd.Description },
                insertText: `${cmd.Name}(${snippetArgs})`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: sigData.signature,
                range: range,
            };
        });

        return { suggestions: suggestions };
    },
});

monaco.languages.registerHoverProvider("bdsp", {
    provideHover: function (model, position) {
        const word = model.getWordAtPosition(position);
        if (!word) return;

        // 1. Check for Command
        const cmd = commandLookup[word.word];
        if (cmd) {
            const data = getSignatureData(cmd);
            const contents = [];
            contents.push({ value: "```bdsp\n" + data.signature + "\n```" });

            if (data.documentation) {
                contents.push({ value: `**Description:**\n\n${data.documentation}` });
            }

            if (data.parameters && data.parameters.length > 0) {
                const argLines = data.parameters.map((p, i) => {
                    const doc = (p.documentation && p.documentation.value)
                        ? p.documentation.value.replace(/\r?\n+/g, " ")
                        : "";
                    return `Arg ${i + 1}. **${p.label}**: ${doc}`;
                });
                contents.push({ value: "**Arguments:**\n\n" + argLines.join("\n\n") });
            }

            return { contents: contents };
        }

        // 2. Check for Event Definition (Peek)
        const evt = eventLookup[word.word];
        if (evt) {
            const contents = [];

            // Header: Definition Location
            contents.push({ value: `**Event**: \`${word.word}\`` });
            contents.push({ value: `Defined in **${evt.File}** at Line **${evt.Line}**` });

            // Body: Code Snippet
            if (evt.Snippet) {
                contents.push({ value: "```bdsp\n" + evt.Snippet + "\n```" });
            } else {
                contents.push({ value: "_(No preview available)_" });
            }

            return { contents: contents };
        }
    },
});

// New: Go to Definition Provider
monaco.languages.registerDefinitionProvider("bdsp", {
    provideDefinition: function (model, position) {
        const word = model.getWordAtPosition(position);
        if (!word) return;

        // 1. Check for local definition (in current file)
        // We use regex to find "LabelName:" at the start of the line.
        const matches = model.findMatches(`^${word.word}:`, true, true, false, null, true);
        if (matches && matches.length > 0) {
            return {
                uri: model.uri,
                range: matches[0].range
            };
        }

        // 2. Check Global Lookup (external files)
        const evt = eventLookup[word.word];
        if (evt) {
            // We return a URI constructed from the file path. 
            // The editor_init.js service override will intercept this URI 
            // and send a message to C# to load the file.
            return {
                uri: monaco.Uri.file(evt.File),
                range: {
                    startLineNumber: evt.Line,
                    startColumn: 1,
                    endLineNumber: evt.Line,
                    endColumn: 1
                }
            };
        }
    }
});

monaco.languages.registerSignatureHelpProvider("bdsp", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position, token, context) {
        const ctx = getActiveContext(model, position);
        if (!ctx) return { value: null, dispose: () => { } };

        const data = getSignatureData(ctx.cmd);
        let activeIdx = Math.min(ctx.argIndex, data.parameters.length - 1);

        return {
            value: {
                signatures: [
                    {
                        label: data.signature,
                        documentation: data.documentation,
                        parameters: data.parameters,
                    },
                ],
                activeSignature: 0,
                activeParameter: activeIdx,
            },
            dispose: () => { },
        };
    },
});

// 7. Dynamic Inlay Hints Provider
monaco.languages.registerInlayHintsProvider("bdsp", {
    provideInlayHints: function (model, range, token) {
        let hints = [];

        const addHint = (text, endColumn, lineNum, tooltip) => {
            hints.push({
                kind: monaco.languages.InlayHintKind.Type,
                position: { lineNumber: lineNum, column: endColumn },
                // Clean label without ": " prefix (visual separation handled by paddingLeft)
                label: `${text}`,
                paddingLeft: true,
                tooltip: tooltip,
            });
        };

        if (!hintConfigs || hintConfigs.length === 0) return { hints: [] };

        for (let i = range.startLineNumber; i <= range.endLineNumber; i++) {
            const lineContent = model.getLineContent(i);

            // Iterate through the GLOBAL hintConfigs populated by applySyntaxData
            hintConfigs.forEach(config => {
                // Regex to match the command and capture ALL args inside parens
                const pattern = `\\b${config.Cmd}\\s*\\(([^)]*)`;
                const regex = new RegExp(pattern, "g");

                let match;
                while ((match = regex.exec(lineContent)) !== null) {
                    // match[1] is the content inside parens: "21, 1, 5"
                    const argsStr = match[1];
                    // Split args to calculate precise offsets
                    const rawArgs = argsStr.split(',');
                    const args = rawArgs.map(s => s.trim());

                    // Find start index of arguments relative to the line
                    // match.index is start of Cmd. match[0].indexOf('(') gets us to the paren.
                    let currentOffset = match.index + match[0].indexOf('(') + 1;

                    // Iterate through arguments to find position of OUR target arg
                    for (let k = 0; k < rawArgs.length; k++) {
                        const rawArg = rawArgs[k];
                        const trimmedVal = rawArg.trim();

                        // Calculate where the value strictly ends
                        // Pre-space is distance to first non-space char
                        const preSpace = rawArg.indexOf(trimmedVal);

                        // Valid index check
                        if (k === config.ArgIndex && trimmedVal.length > 0) {
                            // Column = Start + PreSpace + Length + 1 (Monaco is 1-based)
                            const endCol = currentOffset + preSpace + trimmedVal.length + 1;

                            if (config.Type === "Pokemon" && pokeMap[trimmedVal]) {
                                addHint(pokeMap[trimmedVal], endCol, i, `Pokemon ID ${trimmedVal}`);
                            }
                            else if (config.Type === "Item" && itemMap[trimmedVal]) {
                                addHint(itemMap[trimmedVal], endCol, i, `Item ID ${trimmedVal}`);
                            }
                            else if (config.Type === "Form" && config.PokemonArgIndex !== undefined) {
                                // Safe check for dependency argument
                                if (args.length > config.PokemonArgIndex) {
                                    const pokeVal = args[config.PokemonArgIndex];
                                    const formKey = `${pokeVal}_${trimmedVal}`;
                                    if (formMap[formKey]) {
                                        let displayText = formMap[formKey];

                                        // Attempt to trim the base Pokemon name from the Form name for cleaner UI
                                        // Example: "Hisuian Voltorb" -> "Hisuian" if base is "Voltorb"
                                        if (pokeMap[pokeVal]) {
                                            const baseName = pokeMap[pokeVal];
                                            if (displayText.includes(baseName)) {
                                                displayText = displayText.replace(baseName, "").trim();
                                            }
                                        }

                                        addHint(displayText, endCol, i, `Form: ${formMap[formKey]}`);
                                    }
                                }
                            }
                            else if (config.Type === "Ball" && ballMap[trimmedVal]) {
                                const itemId = ballMap[trimmedVal];
                                if (itemMap[itemId]) {
                                    addHint(itemMap[itemId], endCol, i, `Ball ID ${trimmedVal} -> Item ID ${itemId}`);
                                }
                            }
                        }

                        // Advance offset: Length of raw arg + 1 for comma
                        currentOffset += rawArg.length + 1;
                    }
                }
            });
        }
        return { hints: hints };
    },
});

// --- DATA LOADING ---

function safeMap(array) {
    if (!array || !Array.isArray(array)) return [];
    return array.map((item) => item.Name || item.name).filter((n) => n);
}

function loadSyntaxFromFile(filename) {
    var old = document.getElementById("syntax_script");
    if (old) old.remove();

    var script = document.createElement("script");
    script.id = "syntax_script";
    script.src = filename;

    script.onload = function () {
        if (window.RELUMI_DATA) {
            applySyntaxData(window.RELUMI_DATA);
        }
    };
    script.onerror = function () { console.error("Syntax load error"); };
    document.head.appendChild(script);
}

function applySyntaxData(data) {
    // 1. Load Core Data
    loadedData.commands = safeMap(data.commands);
    loadedData.flags = safeMap(data.flags);
    loadedData.sysflags = safeMap(data.sysflags);
    loadedData.works = safeMap(data.works);

    if (data.commands && Array.isArray(data.commands)) {
        data.commands.forEach((cmd) => {
            if (cmd && cmd.Name) commandLookup[cmd.Name] = cmd;
        });
    }

    // 2. Load Maps and Hints (Fail-safe)
    try {
        pokeMap = data.pokes || {};
        itemMap = data.items || {};
        formMap = data.forms || {};
        ballMap = data.balls || {};

        // Load Events Data
        eventLookup = data.events || {};

        console.log("Syntax Loaded. Pokemon:", Object.keys(pokeMap).length, "Items:", Object.keys(itemMap).length, "Events:", Object.keys(eventLookup).length);

        pokeReverseMap = {};
        for (let id in pokeMap) {
            if (pokeMap.hasOwnProperty(id)) pokeReverseMap[pokeMap[id]] = parseInt(id);
        }

        // Process Hints Configuration from JSON
        hintConfigs = [];
        if (data.hints && Array.isArray(data.hints)) {
            data.hints.forEach(h => {
                hintConfigs.push({
                    Cmd: h.Cmd,
                    ArgIndex: h.ArgIndex,
                    Label: h.Label,
                    Type: h.Type,
                    PokemonArgIndex: h.PokemonArgIndex
                });
            });
        }

    } catch (e) {
        console.error("Map loading error:", e);
    }

    // 4. Register Tokenizer
    const commandList = loadedData.commands || [];

    monaco.languages.setMonarchTokensProvider("bdsp", {
        commands: commandList,
        tokenizer: {
            root: [
                [/^[a-zA-Z0-9_]+:/, "bdsp-scriptlabel"],
                [
                    /[A-Z_][\w\-\.]*(?=\()/,
                    {
                        cases: {
                            "@commands": "bdsp-command",
                            "@default": "identifier",
                        },
                    },
                ],
                [/@[a-zA-Z0-9_\-]+/, "bdsp-workvar"],
                [/#[a-zA-Z0-9_\-]+/, "bdsp-flag"],
                [/\$[a-zA-Z0-9_\-]+/, "bdsp-sysflag"],
                { include: "@whitespace" },
                [/\d*\.\d+([eE][\-+]?\d+)?/, "bdsp-number"],
                [/\d+/, "bdsp-number"],
                [/'[^']*'/, "bdsp-string"],
                [/[,()]/, "delimiter"],
            ],
            whitespace: [
                [/[ \t\r\n]+/, "white"],
                [/[;].*$/, "bdsp-comment"],
                [/\/\/.*$/, "bdsp-comment"],
            ],
        },
    });

    // Refresh model
    if (window.editor) {
        var m = window.editor.getModel();
        monaco.editor.setModelLanguage(m, "plaintext");
        setTimeout(() => monaco.editor.setModelLanguage(m, "bdsp"), 10);
    }
}