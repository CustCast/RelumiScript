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
var pokeMap = {};
var pokeReverseMap = {};
var itemMap = {};

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
    // Create a dummy command object if not found to ensure context is valid
    const effectiveCmd = cmd || { Name: cmdName, Args: [] };

    const commas = (textAfterOpenParen.match(/,/g) || []).length;

    return { cmd: effectiveCmd, argIndex: commas };
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

        // --- 1. DETERMINE SUGGESTION TYPE FROM CONFIG ---
        // Relies solely on hintConfigs (User JSON only)
        const activeHint = hintConfigs.find(h => h.Cmd === ctx.cmd.Name && h.ArgIndex === ctx.argIndex);

        let showPokemon = false;
        let showItems = false;

        if (activeHint) {
            if (activeHint.Type === "Pokemon") showPokemon = true;
            if (activeHint.Type === "Item") showItems = true;
        }

        // --- 2. GENERATE SUGGESTIONS ---

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
                    sortText: name // Ensure sorting by Name, not ID
                };
            });
            return { suggestions: suggestions };
        }

        // --- 3. COMMAND SUGGESTIONS (Standard) ---
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
    },
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

        const addHint = (idStr, endColumn, lineNum, map, labelType) => {
            if (!/^\d+$/.test(idStr)) return;
            const id = parseInt(idStr);
            const name = map ? map[id] : null;

            if (name) {
                hints.push({
                    kind: monaco.languages.InlayHintKind.Type,
                    position: { lineNumber: lineNum, column: endColumn },
                    label: `: ${name}`,
                    paddingLeft: true,
                    tooltip: `${labelType} ID ${id}: ${name}`,
                });
            }
        };

        // If no configs loaded yet, skip
        if (!hintConfigs || hintConfigs.length === 0) return { hints: [] };

        for (let i = range.startLineNumber; i <= range.endLineNumber; i++) {
            const lineContent = model.getLineContent(i);

            // Iterate through the GLOBAL hintConfigs populated by applySyntaxData
            hintConfigs.forEach(config => {
                if (!config.Map) return; // Skip if map resolution failed

                // Use Word Boundary (\b) to prevent partial matches (e.g., ADD_ITEM matching inside _ADD_ITEM)
                const pattern = `\\b${config.Cmd}\\s*\\(\\s*(?:[^,)]*,\\s*){${config.ArgIndex}}(\\d+)`;
                const regex = new RegExp(pattern, "g");

                let match;
                while ((match = regex.exec(lineContent)) !== null) {
                    const endCol = match.index + match[0].length + 1;
                    addHint(match[1], endCol, i, config.Map, config.Label);
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

        console.log("Syntax Loaded. Pokemon:", Object.keys(pokeMap).length, "Items:", Object.keys(itemMap).length);

        pokeReverseMap = {};
        for (let id in pokeMap) {
            if (pokeMap.hasOwnProperty(id)) pokeReverseMap[pokeMap[id]] = parseInt(id);
        }

        // Process Hints Configuration from JSON
        hintConfigs = [];
        if (data.hints && Array.isArray(data.hints)) {
            data.hints.forEach(h => {
                let mapRef = null;
                if (h.Type === "Pokemon") mapRef = pokeMap;
                else if (h.Type === "Item") mapRef = itemMap;

                if (mapRef) {
                    hintConfigs.push({
                        Cmd: h.Cmd,
                        ArgIndex: h.ArgIndex,
                        Label: h.Label,
                        Map: mapRef,
                        Type: h.Type
                    });
                }
            });
        }

        // Removed default hints injection as requested. 
        // Logic relies solely on JSON content now.

    } catch (e) {
        console.error("Map loading error:", e);
    }

    // 3. Register Tokenizer (Must run even if maps fail)
    // IMPORTANT: Default to empty array if undefined to prevent crash
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