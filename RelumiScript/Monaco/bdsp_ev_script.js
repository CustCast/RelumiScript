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

        // Find any hint config for this command (we only need to know if we should show specific lists)
        const activeConfig = hintConfigs.find(h => h.Cmd === ctx.cmd.Name);

        let showPokemon = false;
        let showItems = false;
        let showForms = false;
        let activeParam = null;

        if (activeConfig && activeConfig.Params) {
            activeParam = activeConfig.Params.find(p => p.Index === ctx.argIndex);
            if (activeParam) {
                if (activeParam.Type === "Pokemon") showPokemon = true;
                if (activeParam.Type === "Item") showItems = true;
                if (activeParam.Type === "Form") showForms = true;
            }
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

        if (showForms && activeParam && activeParam.DependsOn !== undefined) {
            const args = getSiblingArgs(model, position.lineNumber, ctx.cmd.Name);
            const pokeIdStr = args[activeParam.DependsOn];

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
// Updated to generate sentence-style comments at the end of the line
monaco.languages.registerInlayHintsProvider("bdsp", {
    provideInlayHints: function (model, range, token) {
        let hints = [];

        if (!hintConfigs || hintConfigs.length === 0) return { hints: [] };

        for (let i = range.startLineNumber; i <= range.endLineNumber; i++) {
            const lineContent = model.getLineContent(i);

            // Iterate through the GLOBAL hintConfigs
            hintConfigs.forEach(config => {
                // Regex to match the command and capture ALL args inside parens
                const pattern = `\\b${config.Cmd}\\s*\\(([^)]*)`;
                const regex = new RegExp(pattern, "g");

                let match;
                while ((match = regex.exec(lineContent)) !== null) {
                    const argsStr = match[1];
                    const rawArgs = argsStr.split(',');
                    const args = rawArgs.map(s => s.trim());

                    // Store resolved values for variable interpolation
                    let resolvedVars = {};
                    let resolvedRaw = {}; // Store raw values to support "ShowZero" toggle
                    let hasResolved = false;

                    if (config.Params) {
                        config.Params.forEach(param => {
                            if (param.Index < args.length) {
                                let val = args[param.Index];

                                // Resolve based on Type
                                if (param.Type === "Pokemon" && pokeMap[val]) {
                                    resolvedVars[param.Ref] = pokeMap[val];
                                    resolvedRaw[param.Ref] = val;
                                    hasResolved = true;
                                }
                                else if (param.Type === "Item" && itemMap[val]) {
                                    resolvedVars[param.Ref] = itemMap[val];
                                    resolvedRaw[param.Ref] = val;
                                    hasResolved = true;
                                }
                                else if (param.Type === "Ball" && ballMap[val]) {
                                    const itemId = ballMap[val];
                                    if (itemMap[itemId]) {
                                        resolvedVars[param.Ref] = itemMap[itemId];
                                        resolvedRaw[param.Ref] = val;
                                        hasResolved = true;
                                    }
                                }
                                else if (param.Type === "Form" && param.DependsOn !== undefined) {
                                    if (param.DependsOn < args.length) {
                                        const pokeVal = args[param.DependsOn];
                                        const formKey = `${pokeVal}_${val}`;
                                        if (formMap[formKey]) {
                                            let displayText = formMap[formKey];
                                            // Trim base name if present
                                            if (pokeMap[pokeVal]) {
                                                const baseName = pokeMap[pokeVal];
                                                if (displayText.includes(baseName)) {
                                                    displayText = displayText.replace(baseName, "").trim();
                                                }
                                            }
                                            resolvedVars[param.Ref] = displayText;
                                            resolvedRaw[param.Ref] = val;
                                            hasResolved = true;
                                        }
                                    }
                                }
                                else if (param.Type === "Value") {
                                    resolvedVars[param.Ref] = val;
                                    resolvedRaw[param.Ref] = val;
                                    hasResolved = true;
                                }
                            }
                        });
                    }

                    // Build the sentence
                    if (hasResolved && config.Sentence) {
                        let finalString = ";";
                        let validSentence = false;

                        config.Sentence.forEach(part => {
                            // Check condition
                            if (part.Check) {
                                let val = resolvedVars[part.Check];

                                // Strict check for undefined/null
                                if (val === undefined || val === null) return;

                                // Check for "0" or 0
                                // If val is 0, we only proceed if ShowZero is explicitly true
                                const raw = resolvedRaw[part.Check];
                                if ((raw === "0" || raw === 0) && part.ShowZero !== true) {
                                    return;
                                }
                            }

                            let text = part.Text;
                            // Interpolate variables {var}
                            text = text.replace(/\{(\w+)\}/g, (m, key) => {
                                if (resolvedVars[key] !== undefined && resolvedVars[key] !== null) {
                                    return resolvedVars[key];
                                }
                                return m;
                            });

                            finalString += text;
                            validSentence = true;
                        });

                        if (validSentence) {
                            hints.push({
                                kind: monaco.languages.InlayHintKind.Type,
                                position: { lineNumber: i, column: model.getLineMaxColumn(i) },
                                label: finalString,
                                paddingLeft: true,
                                tooltip: "Auto-generated comment",
                            });
                        }
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
        // We now expect the JSON to match the new schema directly
        hintConfigs = [];
        if (data.hints && Array.isArray(data.hints)) {
            hintConfigs = data.hints;
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