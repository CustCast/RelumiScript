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
var eventLookup = {};
var pokeMap = {};
var pokeReverseMap = {};
var itemMap = {};
var formMap = {};
var ballMap = {};

var hintConfigs = [];

// --- PROVIDER MANAGEMENT (FIX FOR DUPLICATION) ---
// If providers were already registered in this window session, dispose them first.
// This prevents "stacking" hints if the script is re-run.
if (window.BDSP_DISPOSABLES) {
    console.log("Disposing " + window.BDSP_DISPOSABLES.length + " existing providers.");
    window.BDSP_DISPOSABLES.forEach(d => d.dispose());
}
window.BDSP_DISPOSABLES = [];

// --- HELPERS ---

function detectArgType(argStr) {
    if (argStr === undefined || argStr === null) return "Unknown";
    argStr = argStr.trim();
    if (argStr.length === 0) return "Unknown";

    if (argStr.startsWith("@")) return "Work";
    if (argStr.startsWith("#")) return "Flag";
    if (argStr.startsWith("$")) return "SysFlag";
    if (!isNaN(argStr)) return "Value";
    if (argStr.startsWith("'") || argStr.startsWith('"')) return "String";
    return "Value";
}

function resolveValue(val, type, allArgs, dependsOnIndex) {
    if (type === "Pokemon" && pokeMap[val]) return pokeMap[val];
    if (type === "Item" && itemMap[val]) return itemMap[val];

    if (type === "Ball" && ballMap[val]) {
        const itemId = ballMap[val];
        if (itemMap[itemId]) return itemMap[itemId];
    }

    if (type === "Form" && dependsOnIndex !== undefined && dependsOnIndex !== null) {
        if (dependsOnIndex < allArgs.length) {
            const pokeVal = allArgs[dependsOnIndex];
            const formKey = `${pokeVal}_${val}`;
            if (formMap[formKey]) {
                let displayText = formMap[formKey];
                if (pokeMap[pokeVal]) {
                    const baseName = pokeMap[pokeVal];
                    if (displayText.includes(baseName)) {
                        displayText = displayText.replace(baseName, "").trim();
                    }
                }
                return displayText;
            }
        }
    }
    return val;
}

function getCommandDefinitionData(cmdName) {
    const hint = hintConfigs.find(h => h.Cmd === cmdName);
    const cmd = commandLookup[cmdName];

    if (!hint && !cmd) return null;

    let signature = cmdName;
    let desc = (hint && hint.Description) ? hint.Description : (cmd ? cmd.Description : "No description.");
    let params = [];
    let paramDocs = "";

    if (hint && hint.Params && hint.Params.length > 0) {
        const paramNames = hint.Params.map(p => p.Ref || `arg${p.Index}`);
        signature += `(${paramNames.join(", ")})`;

        params = hint.Params.map(p => {
            const typeStr = Array.isArray(p.Type) ? p.Type.join(" | ") : p.Type;
            return {
                label: p.Ref || `arg${p.Index}`,
                documentation: (p.Description ? p.Description : "") + ` (\`${typeStr}\`)`
            };
        });

        paramDocs = hint.Params.map(p => {
            const typeStr = Array.isArray(p.Type) ? p.Type.join(" | ") : p.Type;
            let line = `${p.Index}\\. **${p.Ref}** (\`${typeStr}\`)`;
            if (p.Description) line += ` *${p.Description}*`;
            return line;
        }).join("\n\n");

    } else if (cmd && cmd.Args) {
        const paramNames = cmd.Args.map(a => a.TentativeName || "arg");
        signature += `(${paramNames.join(", ")})`;

        params = cmd.Args.map(a => ({
            label: a.TentativeName || "arg",
            documentation: (a.Description || "") + ` (${a.Type || "Value"})`
        }));

        paramDocs = cmd.Args.map((a, i) => {
            let typeStr = "Value";
            if (a.Type) typeStr = Array.isArray(a.Type) ? a.Type.join(" | ") : a.Type;
            let line = `${i}\\. **${a.TentativeName}** (\`${typeStr}\`)`;
            if (a.Description) line += ` *${a.Description}*`;
            return line;
        }).join("\n\n");

    } else {
        signature += `()`;
    }

    return {
        name: cmdName,
        signature: signature,
        description: desc,
        parameters: params,
        paramDocsMarkdown: paramDocs
    };
}

function getActiveContext(model, position) {
    if (!model || !position) return null;

    let depth = 0;
    let commas = 0;
    // Look back up to 50 lines to find the start of the command
    // This allows identifying "Cmd(\n  arg\n)" properly
    const maxLines = 50;

    for (let i = 0; i < maxLines; i++) {
        let lineNum = position.lineNumber - i;
        if (lineNum < 1) break;

        let text = model.getLineContent(lineNum);

        // If on the current line, we only care about text BEFORE the cursor
        if (i === 0) {
            text = text.substring(0, position.column - 1);
        }

        // Scan backwards through the text
        for (let c = text.length - 1; c >= 0; c--) {
            const char = text[c];

            if (char === ')') {
                depth++;
            }
            else if (char === '(') {
                if (depth > 0) {
                    depth--;
                } else {
                    // Match found!
                    // The command name is the word immediately preceding this '('
                    // Regex: Word boundary at end of string
                    const textPre = text.substring(0, c).trimEnd();
                    const match = textPre.match(/([a-zA-Z0-9_]+)$/);

                    if (match) {
                        const cmdName = match[1];
                        const cmd = commandLookup[cmdName];
                        const effectiveCmd = cmd || { Name: cmdName, Args: [] };
                        return { cmd: effectiveCmd, argIndex: commas };
                    } else {
                        // Found a paren, but no command name? (e.g. math grouping)
                        return null;
                    }
                }
            }
            else if (char === ',') {
                if (depth === 0) {
                    commas++;
                }
            }
        }
    }
    return null;
}

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

window.BDSP_DISPOSABLES.push(monaco.languages.registerDocumentSymbolProvider("bdsp", {
    provideDocumentSymbols: function (model) {
        const symbols = [];
        const lines = model.getLineCount();
        const labelRegex = /^\s*([a-zA-Z0-9_]+)\s*:/;

        let currentLabel = null;
        let startLine = 0;
        let startCol = 0;

        for (let i = 1; i <= lines; i++) {
            const content = model.getLineContent(i);
            const match = content.match(labelRegex);

            if (match) {
                if (currentLabel) {
                    const endLine = Math.max(startLine, i - 1);
                    symbols.push({
                        name: currentLabel,
                        detail: "Script Label",
                        kind: monaco.languages.SymbolKind.Function,
                        range: {
                            startLineNumber: startLine,
                            startColumn: 1,
                            endLineNumber: endLine,
                            endColumn: model.getLineMaxColumn(endLine)
                        },
                        selectionRange: {
                            startLineNumber: startLine,
                            startColumn: startCol,
                            endLineNumber: startLine,
                            endColumn: startCol + currentLabel.length
                        }
                    });
                }
                currentLabel = match[1];
                startLine = i;
                startCol = content.indexOf(currentLabel) + 1;
            }
        }

        if (currentLabel) {
            symbols.push({
                name: currentLabel,
                detail: "Script Label",
                kind: monaco.languages.SymbolKind.Function,
                range: {
                    startLineNumber: startLine,
                    startColumn: 1,
                    endLineNumber: lines,
                    endColumn: model.getLineMaxColumn(lines)
                },
                selectionRange: {
                    startLineNumber: startLine,
                    startColumn: startCol,
                    endLineNumber: startLine,
                    endColumn: startCol + currentLabel.length
                }
            });
        }

        return symbols;
    }
}));

window.BDSP_DISPOSABLES.push(monaco.languages.registerCompletionItemProvider("bdsp", {
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

        if (ctx) {
            const activeConfig = hintConfigs.find(h => h.Cmd === ctx.cmd.Name);
            const rawCmd = commandLookup[ctx.cmd.Name];

            let totalArgs = 0;
            if (activeConfig && activeConfig.Params && activeConfig.Params.length > 0) {
                totalArgs = activeConfig.Params.length;
            } else if (rawCmd && rawCmd.Args) {
                totalArgs = rawCmd.Args.length;
            }

            const suffix = (ctx.argIndex < totalArgs - 1) ? ", " : "";

            // FIX: Ensure correct spacing if the user manually typed a comma
            let prefix = "";
            const textBefore = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: range.startColumn
            });
            if (textBefore.trimEnd().endsWith(",") && !textBefore.endsWith(" ")) {
                prefix = " ";
            }

            let showPokemon = false;
            let showItems = false;
            let showForms = false;
            let showBalls = false;
            let activeParam = null;

            if (activeConfig && activeConfig.Params) {
                activeParam = activeConfig.Params.find(p => p.Index === ctx.argIndex);
                if (activeParam) {
                    const types = Array.isArray(activeParam.Type) ? activeParam.Type : [activeParam.Type];
                    if (types.includes("Pokemon")) showPokemon = true;
                    if (types.includes("Item")) showItems = true;
                    if (types.includes("Form")) showForms = true;
                    if (types.includes("Ball")) showBalls = true;
                }
            }

            // FIX: Trigger 'triggerSuggest' instead of 'triggerParameterHints' to auto-open next list
            const triggerCmd = { id: 'editor.action.triggerSuggest', title: 'Trigger Suggestions' };

            if (showPokemon) {
                var suggestions = Object.keys(pokeReverseMap)
                    .filter(name => !name.startsWith("?") && name !== "???")
                    .map((name) => ({
                        label: name,
                        kind: monaco.languages.CompletionItemKind.EnumMember,
                        detail: `ID: ${pokeReverseMap[name]}`,
                        documentation: `Insert ID for ${name}`,
                        insertText: prefix + pokeReverseMap[name].toString() + suffix,
                        range: range,
                        command: triggerCmd
                    }));
                return { suggestions: suggestions };
            }

            if (showItems) {
                var suggestions = Object.keys(itemMap)
                    .filter(id => {
                        const name = itemMap[id];
                        return name && !name.startsWith("?") && name !== "???";
                    })
                    .map((id) => ({
                        label: itemMap[id],
                        kind: monaco.languages.CompletionItemKind.EnumMember,
                        detail: `ID: ${id}`,
                        documentation: `Insert ID for ${itemMap[id]}`,
                        insertText: prefix + id.toString() + suffix,
                        range: range,
                        sortText: itemMap[id],
                        command: triggerCmd
                    }));
                return { suggestions: suggestions };
            }

            if (showBalls) {
                var suggestions = Object.keys(ballMap)
                    .map((ballId) => {
                        const itemId = ballMap[ballId];
                        const name = itemMap[itemId] || `Ball_${ballId}`;
                        if (name.startsWith("?") || name === "???") return null;

                        return {
                            label: name,
                            kind: monaco.languages.CompletionItemKind.EnumMember,
                            detail: `Ball ID: ${ballId} (Item ID: ${itemId})`,
                            documentation: `Insert Ball ID for ${name}`,
                            insertText: prefix + ballId.toString() + suffix,
                            range: range,
                            sortText: name,
                            command: triggerCmd
                        };
                    })
                    .filter(x => x !== null);
                return { suggestions: suggestions };
            }

            if (showForms && activeParam && activeParam.DependsOn !== undefined) {
                const args = getSiblingArgs(model, position.lineNumber, ctx.cmd.Name);
                const pokeIdStr = args[activeParam.DependsOn];
                if (pokeIdStr && /^\d+$/.test(pokeIdStr)) {
                    const prefixId = `${parseInt(pokeIdStr)}_`;
                    var suggestions = Object.keys(formMap)
                        .filter(k => k.startsWith(prefixId))
                        .map(key => {
                            const formId = key.split('_')[1];
                            const name = formMap[key];
                            if (name.startsWith("?") || name === "???") return null;

                            return {
                                label: name,
                                kind: monaco.languages.CompletionItemKind.EnumMember,
                                detail: `Form ID: ${formId}`,
                                insertText: prefix + formId + suffix,
                                range: range,
                                sortText: formId,
                                command: triggerCmd
                            };
                        })
                        .filter(x => x !== null);
                    return { suggestions: suggestions };
                }
            }
            return { suggestions: [] };
        }

        const allCmdNames = new Set([
            ...Object.keys(commandLookup),
            ...hintConfigs.map(h => h.Cmd)
        ]);

        var suggestions = Array.from(allCmdNames).map((cmdName) => {
            const data = getCommandDefinitionData(cmdName);
            if (!data) return null;

            let insertText = `${cmdName}($0)`;

            let mdDocs = { value: "" };
            if (data.description) mdDocs.value += `**${data.description}**\n\n`;
            if (data.paramDocsMarkdown) mdDocs.value += `**Arguments**\n\n${data.paramDocsMarkdown}`;

            return {
                label: cmdName,
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: mdDocs,
                insertText: insertText,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: data.signature,
                range: range,
                command: {
                    id: 'editor.action.triggerParameterHints',
                    title: 'Trigger Parameter Hints'
                }
            };
        }).filter(x => x !== null);

        return { suggestions: suggestions };
    },
}));

window.BDSP_DISPOSABLES.push(monaco.languages.registerHoverProvider("bdsp", {
    provideHover: function (model, position) {
        const word = model.getWordAtPosition(position);
        if (!word) return;

        const data = getCommandDefinitionData(word.word);
        if (data) {
            const contents = [];
            contents.push({ value: "```bdsp\n" + data.signature + "\n```" });

            if (data.description) {
                contents.push({ value: `**Description:**\n${data.description}` });
            }

            if (data.paramDocsMarkdown) {
                contents.push({ value: "**Arguments**\n\n" + data.paramDocsMarkdown });
            }

            return { contents: contents };
        }

        const evt = eventLookup[word.word];
        if (evt) {
            const contents = [];
            contents.push({ value: `**Event**: \`${word.word}\`` });
            contents.push({ value: `Defined in **${evt.File}** at Line **${evt.Line}**` });
            if (evt.Snippet) {
                contents.push({ value: "```bdsp\n" + evt.Snippet + "\n```" });
            }
            return { contents: contents };
        }
    },
}));

window.BDSP_DISPOSABLES.push(monaco.languages.registerDefinitionProvider("bdsp", {
    provideDefinition: function (model, position) {
        const word = model.getWordAtPosition(position);
        if (!word) return;

        const matches = model.findMatches(`^${word.word}:`, true, true, false, null, true);
        if (matches && matches.length > 0) {
            return { uri: model.uri, range: matches[0].range };
        }

        const evt = eventLookup[word.word];
        if (evt) {
            return {
                uri: monaco.Uri.file(evt.File),
                range: { startLineNumber: evt.Line, startColumn: 1, endLineNumber: evt.Line, endColumn: 1 }
            };
        }
    }
}));

window.BDSP_DISPOSABLES.push(monaco.languages.registerSignatureHelpProvider("bdsp", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position, token, context) {
        const ctx = getActiveContext(model, position);
        if (!ctx) return { value: null, dispose: () => { } };

        const data = getCommandDefinitionData(ctx.cmd.Name);
        if (!data) return { value: null, dispose: () => { } };

        let activeIdx = Math.min(ctx.argIndex, data.parameters.length - 1);

        return {
            value: {
                signatures: [
                    {
                        label: data.signature,
                        documentation: { value: data.description },
                        parameters: data.parameters,
                    },
                ],
                activeSignature: 0,
                activeParameter: activeIdx,
            },
            dispose: () => { },
        };
    },
}));

// --- DYNAMIC INLAY HINTS ---
window.BDSP_DISPOSABLES.push(monaco.languages.registerInlayHintsProvider("bdsp", {
    provideInlayHints: function (model, range, token) {
        let hints = [];
        if (!hintConfigs || hintConfigs.length === 0) return { hints: [] };

        for (let i = range.startLineNumber; i <= range.endLineNumber; i++) {
            const lineContent = model.getLineContent(i);

            hintConfigs.forEach(config => {
                // NEW: Toggle check
                if (config.IsEnabled === false) return;

                const pattern = `\\b${config.Cmd}\\s*\\(([^)]*)`;
                const regex = new RegExp(pattern, "g");
                let match;

                while ((match = regex.exec(lineContent)) !== null) {
                    const argsStr = match[1];
                    const rawArgs = argsStr.split(',').map(s => s.trim());

                    let resolvedParams = {};

                    if (config.Params) {
                        config.Params.forEach(param => {
                            if (param.Index < rawArgs.length) {
                                const rawVal = rawArgs[param.Index];
                                const basicType = detectArgType(rawVal);

                                // Normalize Key to Lowercase for consistent lookups
                                const refKey = param.Ref ? param.Ref.trim().toLowerCase() : `arg${param.Index}`;

                                // Strict Fragment Type Determination
                                let fragmentType = basicType;
                                if (param.Type) {
                                    if (Array.isArray(param.Type) && param.Type.length === 1) {
                                        fragmentType = param.Type[0];
                                    } else if (!Array.isArray(param.Type)) {
                                        fragmentType = param.Type;
                                    } else if (basicType === "Value") {
                                        const priorities = ["Pokemon", "Item", "Ball", "Form", "SysFlag", "Flag", "Work"];
                                        const allowedTypes = Array.isArray(param.Type) ? param.Type : [param.Type];
                                        for (const t of priorities) {
                                            if (allowedTypes.includes(t)) {
                                                fragmentType = t;
                                                break;
                                            }
                                        }
                                    }
                                }

                                // Show/Hide Zero Logic
                                const isZero = (rawVal == 0 && rawVal !== "");
                                const allowedZeros = param.ShowZero || [];
                                const shouldHide = isZero && !allowedZeros.includes(fragmentType);

                                if (shouldHide) {
                                    resolvedParams[refKey] = null; // Mark as explicitly hidden
                                }
                                else {
                                    // Resolve Fragment
                                    let fragment = null;
                                    if (param.Fragments) {
                                        fragment = param.Fragments[fragmentType];
                                        if (!fragment && fragmentType !== "Value") {
                                            fragment = param.Fragments["Value"];
                                        }
                                    }
                                    if (!fragment) fragment = "{Value}";

                                    let resolvedFragment = fragment.replace(/\{(\w+)\}/g, (m, key, offset, fullStr) => {
                                        key = key.toLowerCase();
                                        let val = null;

                                        if (key === "value" || key === "val") {
                                            val = resolveValue(rawVal, fragmentType, rawArgs, param.DependsOn);
                                        } else if (key === "work") val = rawVal;
                                        else if (key === "flag") val = rawVal;

                                        if (val === null || val === undefined) return m;

                                        let replacement = val.toString();

                                        // Auto-Spacing Logic
                                        // 1. Prefix (Before {Value})
                                        if (offset > 0) {
                                            const charBefore = fullStr[offset - 1];
                                            if (charBefore !== ' ' && !['(', '[', '{', '"', "'"].includes(charBefore)) {
                                                replacement = " " + replacement;
                                            }
                                        }

                                        // 2. Suffix (After {Value})
                                        const endPos = offset + m.length;
                                        if (endPos < fullStr.length) {
                                            const charAfter = fullStr[endPos];
                                            // Regex for punctuation/closers
                                            if (charAfter !== ' ' && !/[.,:;!?\])}"' ]/.test(charAfter)) {
                                                replacement = replacement + " ";
                                            }
                                        }

                                        return replacement;
                                    });
                                    resolvedParams[refKey] = resolvedFragment;
                                }
                            }
                        });
                    }

                    if (config.Sentence) {
                        let finalString = "; ";
                        let validSentence = false;

                        config.Sentence.forEach(part => {
                            // 1. Explicit Check
                            if (part.Check) {
                                const checkKey = part.Check.trim().toLowerCase();
                                if (resolvedParams[checkKey] === null) return;
                                if (resolvedParams[checkKey] === undefined) return;
                            }

                            // 2. Safe Replacement
                            let text = part.Text;
                            text = text.replace(/\{(\w+)\}/g, (m, key) => {
                                const val = resolvedParams[key.toLowerCase()];
                                if (val === null) return "";
                                return (val !== undefined) ? val : m;
                            });

                            // --- NEW: Dynamic Spacing Logic ---
                            if (validSentence) {
                                // Add space if previous char wasn't space AND new char isn't space AND new char isn't punctuation
                                if (!finalString.endsWith(" ") && !text.startsWith(" ") && !/^[.,:;!?]/.test(text)) {
                                    finalString += " ";
                                }
                            }

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
}));

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
    loadedData.commands = safeMap(data.commands);
    loadedData.flags = safeMap(data.flags);
    loadedData.sysflags = safeMap(data.sysflags);
    loadedData.works = safeMap(data.works);

    if (data.commands && Array.isArray(data.commands)) {
        data.commands.forEach((cmd) => {
            if (cmd && cmd.Name) commandLookup[cmd.Name] = cmd;
        });
    }

    try {
        pokeMap = data.pokes || {};
        itemMap = data.items || {};
        formMap = data.forms || {};
        ballMap = data.balls || {};
        eventLookup = data.events || {};

        console.log("Syntax Loaded. Pokemon:", Object.keys(pokeMap).length);

        pokeReverseMap = {};
        for (let id in pokeMap) {
            if (pokeMap.hasOwnProperty(id)) pokeReverseMap[pokeMap[id]] = parseInt(id);
        }

        // FIX: Deduplicate hints by Command Name to prevent double-display
        hintConfigs = [];
        if (data.hints && Array.isArray(data.hints)) {
            const uniqueHints = new Map();
            data.hints.forEach(h => {
                if (h.Cmd) uniqueHints.set(h.Cmd, h);
            });
            hintConfigs = Array.from(uniqueHints.values());
        }

    } catch (e) {
        console.error("Map loading error:", e);
    }

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
                // FIXED REGEX
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

    if (window.editor) {
        var m = window.editor.getModel();
        monaco.editor.setModelLanguage(m, "plaintext");
        setTimeout(() => monaco.editor.setModelLanguage(m, "bdsp"), 10);
    }
}