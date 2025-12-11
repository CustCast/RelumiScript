// RelumiScript/Monaco/bdsp_ev_script.js

// 1. Setup Language
if (!monaco.languages.getLanguages().some((l) => l.id === "bdsp")) {
  monaco.languages.register({ id: "bdsp" });
}

// 2. Define Language Configuration
monaco.languages.setLanguageConfiguration("bdsp", {
  brackets: [
    ["(", ")"],
    ['"', '"'],
  ],
  autoClosingPairs: [
    { open: "(", close: ")" },
    { open: '"', close: '"', notIn: ["string"] },
  ],
  surroundingPairs: [
    { open: "(", close: ")" },
    { open: '"', close: '"' },
  ],
});

// Note: Tokenizer is set dynamically in applySyntaxData() after JSON data loads
// This allows the tokenizer to include command names for proper highlighting

// --- GLOBAL STATE ---
var loadedData = { commands: [], flags: [], sysflags: [], works: [] };
var commandLookup = {};
var pokeMap = {}; // ID -> Name
var pokeReverseMap = {}; // Name -> ID

// --- INTELLISENSE HELPERS ---

function getParamDocs(arg) {
  let typeStr = arg.Type ? arg.Type.join(" | ") : "Any";
  let doc = `**Type**: \`${typeStr}\``;
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

  // Match "COMMAND (" looking backwards
  const match = textUntilPosition.match(/([a-zA-Z0-9_]+)\s*\(/g);
  if (!match) return null;

  const lastMatch = match[match.length - 1];
  const cmdName = lastMatch.replace("(", "").trim();

  const openParenIndex = textUntilPosition.lastIndexOf("(");
  const textAfterOpenParen = textUntilPosition.substring(openParenIndex);
  if (textAfterOpenParen.includes(")")) return null;

  const cmd = commandLookup[cmdName];
  if (!cmd) return null;

  const commas = (textAfterOpenParen.match(/,/g) || []).length;

  return { cmd, argIndex: commas };
}

// --- PROVIDERS REGISTRATION ---

// 4. Completion Item Provider
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

    // A. POKEMON SUGGESTIONS
    if (ctx) {
      const activeArg =
        ctx.cmd.Args && ctx.cmd.Args[ctx.argIndex]
          ? ctx.cmd.Args[ctx.argIndex]
          : null;

      // SPECIAL LOGIC: Suggest Pokemon for _ADD_POKEMON_UI_EXTRA (Arg 0), _POKEMON_NAME_FORM (Arg 1 via Monsno check), or explicit types
      if (
        activeArg &&
        ((ctx.cmd.Name === "_ADD_POKEMON_UI_EXTRA" && ctx.argIndex === 0) ||
          activeArg.TentativeName === "Monsno" ||
          activeArg.TentativeName === "Species")
      ) {
        var suggestions = Object.keys(pokeReverseMap).map((name) => {
          let id = pokeReverseMap[name];
          return {
            label: name,
            kind: monaco.languages.CompletionItemKind.EnumMember,
            detail: `ID: ${id}`,
            documentation: `Insert ID for ${name}`,
            insertText: id.toString(), // Always insert ID to keep script valid
            range: range,
          };
        });
        return { suggestions: suggestions };
      }
    }

    // B. COMMAND SUGGESTIONS
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
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: sigData.signature,
        range: range,
      };
    });

    return { suggestions: suggestions };
  },
});

// 5. Hover Provider
monaco.languages.registerHoverProvider("bdsp", {
  provideHover: function (model, position) {
    const word = model.getWordAtPosition(position);
    if (!word) return;

    // Command Hover
    const cmd = commandLookup[word.word];
    if (cmd) {
      const data = getSignatureData(cmd);
      return {
        contents: [
          { value: "```bdsp\n" + data.signature + "\n```" },
          { value: data.documentation },
        ],
      };
    }

    // Pokemon ID Hover
    if (/^\d+$/.test(word.word)) {
      const id = parseInt(word.word);
      const ctx = getActiveContext(model, position);
      if (ctx && pokeMap[id]) {
        const activeArg =
          ctx.cmd.Args && ctx.cmd.Args[ctx.argIndex]
            ? ctx.cmd.Args[ctx.argIndex]
            : null;
        if (
          activeArg &&
          (activeArg.TentativeName === "Monsno" ||
            activeArg.TentativeName === "Species")
        ) {
          return {
            contents: [
              { value: `**Pokémon**: ${pokeMap[id]}` },
              { value: `ID: ${id}` },
            ],
          };
        }
      }
    }
  },
});

// 6. Signature Help Provider
monaco.languages.registerSignatureHelpProvider("bdsp", {
  signatureHelpTriggerCharacters: ["(", ","],
  provideSignatureHelp: function (model, position, token, context) {
    const ctx = getActiveContext(model, position);
    if (!ctx) return { value: null, dispose: () => {} };

    const data = getSignatureData(ctx.cmd);
    let activeIdx = Math.min(ctx.argIndex, data.parameters.length - 1);
    if (activeIdx >= 0) {
      let p = data.parameters[activeIdx];
      let argDef = ctx.cmd.Args[activeIdx];

      if (
        argDef &&
        (argDef.TentativeName === "Monsno" ||
          argDef.TentativeName === "Species")
      ) {
        p.documentation.value +=
          "\n\n💡 **Hint**: Type a Pokémon name to autocomplete.";
      }
    }

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
      dispose: () => {},
    };
  },
});

// 7. Inlay Hints Provider
monaco.languages.registerInlayHintsProvider("bdsp", {
  provideInlayHints: function (model, range, token) {
    let hints = [];

    // Helper to add hint
    const addHint = (idStr, endColumn, lineNum) => {
      const id = parseInt(idStr);
      const name = pokeMap[id];
      if (name) {
        hints.push({
          kind: monaco.languages.InlayHintKind.Type,
          position: { lineNumber: lineNum, column: endColumn },
          label: `: ${name}`,
          paddingLeft: true,
          tooltip: `ID ${id} is ${name}`,
        });
      }
    };

    for (let i = range.startLineNumber; i <= range.endLineNumber; i++) {
      const lineContent = model.getLineContent(i);

      // 1. _ADD_POKEMON_UI_EXTRA( ID )
      // Capture Group 1: ID
      const regexAdd = /_ADD_POKEMON_UI_EXTRA\s*\(\s*(\d+)/g;
      let match;
      while ((match = regexAdd.exec(lineContent)) !== null) {
        // Position after the ID
        const endCol = match.index + match[0].length + 1;
        addHint(match[1], endCol, i);
      }

      // 2. _POKEMON_NAME_FORM( Tag, ID )
      // Skips first arg (non-comma chars), captures second arg (digits)
      const regexName = /_POKEMON_NAME_FORM\s*\(\s*[^,]+,\s*(\d+)/g;
      while ((match = regexName.exec(lineContent)) !== null) {
        // Position after the ID
        const endCol = match.index + match[0].length + 1;
        addHint(match[1], endCol, i);
      }
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
      try {
        applySyntaxData(window.RELUMI_DATA);
      } catch (e) {
        console.error("[bdsp_ev_script] Failed to apply syntax data:", e);
      }
    }
  };

  script.onerror = function () {
    console.error("[bdsp_ev_script] Failed to load syntax file:", filename);
  };

  document.head.appendChild(script);
}

function applySyntaxData(data) {
  try {
    if (!data) {
      console.warn("[bdsp_ev_script] No data provided to applySyntaxData");
      return;
    }

    loadedData.commands = safeMap(data.commands);
    loadedData.flags = safeMap(data.flags);
    loadedData.sysflags = safeMap(data.sysflags);
    loadedData.works = safeMap(data.works);

    if (data.commands && Array.isArray(data.commands)) {
      data.commands.forEach((cmd) => {
        if (cmd && cmd.Name) {
          commandLookup[cmd.Name] = cmd;
        }
      });
    }

    pokeMap = data.pokes || {};
    pokeReverseMap = {};
    for (let id in pokeMap) {
      if (pokeMap.hasOwnProperty(id)) {
        pokeReverseMap[pokeMap[id]] = parseInt(id);
      }
    }

    // Register the BDSP tokenizer with syntax highlighting rules
    // This is the authoritative tokenizer definition that includes loaded command names
    // Theme colors are defined in editor_init.js (bdsp-dark theme)
    monaco.languages.setMonarchTokensProvider("bdsp", {
      commands: loadedData.commands,
      tokenizer: {
        root: [
          [/^[a-zA-Z0-9_]+:/, "bdsp-scriptlabel"], // Script labels: ev_label: → Blue (bold)
          [
            /[A-Z_][\w\-\.]*(?=\()/,
            {
              cases: {
                "@commands": "bdsp-command", // _COMMAND(...) → Purple (bold)
                "@default": "identifier",
              },
            },
          ],
          [/@[a-zA-Z0-9_\-]+/, "bdsp-workvar"], // @Work variables → Gold
          [/#[a-zA-Z0-9_\-]+/, "bdsp-flag"], // #Flag → Green
          [/\$[a-zA-Z0-9_\-]+/, "bdsp-sysflag"], // $SysFlag → Cyan (italic)
          { include: "@whitespace" },
          [/\d*\.\d+([eE][\-+]?\d+)?/, "bdsp-number"], // Numbers → Orange
          [/\d+/, "bdsp-number"],
          [/"[^"]*"/, "bdsp-string"], // Strings → Yellow
          [/[,()]/, "delimiter"],
        ],
        whitespace: [
          [/[ \t\r\n]+/, "white"],
          [/[;].*$/, "bdsp-comment"],
          [/\/\/.*$/, "bdsp-comment"],
        ],
      },
    });

    // Refresh model to trigger inlay hints
    if (window.editor) {
      var m = window.editor.getModel();
      monaco.editor.setModelLanguage(m, "plaintext");
      setTimeout(() => monaco.editor.setModelLanguage(m, "bdsp"), 10);
    }
  } catch (e) {
    console.error(e);
  }
}

// --- LEGACY CONVERTER ---
window.formatLegacyScript = function (text) {
  if (!text) return "";
  return text
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (
        !trimmed ||
        trimmed.startsWith(";") ||
        trimmed.startsWith("//") ||
        trimmed.endsWith(":")
      ) {
        return line;
      }
      const match = trimmed.match(/^([A-Z_][A-Z0-9_]*)(?:\s+(.*))?$/);
      if (!match) return line;
      const cmdName = match[1];
      const argsStr = match[2];
      const cmdDef = commandLookup[cmdName];
      if (!cmdDef) return line;
      if (!argsStr) {
        const indent = line.match(/^\s*/)[0];
        return `${indent}${cmdName}()`;
      }
      const args = [];
      const regex =
        /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|[^\s]+/g;
      let m;
      while ((m = regex.exec(argsStr)) !== null) {
        args.push(m[0]);
      }
      const formattedArgs = args.map((arg, index) => {
        const argDef =
          cmdDef.Args && cmdDef.Args[index] ? cmdDef.Args[index] : null;
        if (!argDef) return arg;
        const types = argDef.Type || [];
        if (/^-?\d+$/.test(arg)) {
          if (types.includes("Number")) return arg;

          if (types.includes("Work")) return "@" + arg;
          if (types.includes("Flag") || types.includes("SysFlag"))
            return "#" + arg;
          return arg;
        }
        if (arg.startsWith('"') || arg.startsWith("'")) {
          const unquoted = arg.slice(1, -1);
          if (unquoted.length <= 4 && unquoted === unquoted.toUpperCase())
            return arg;
          if (types.includes("Label")) return '"' + unquoted + '"';
          return arg;
        }
        // Check if already prefixed before adding
        if (
          types.includes("Flag") ||
          types.includes("System") ||
          types.includes("SysFlag")
        ) {
          if (arg.startsWith("#") || arg.startsWith("$")) return arg;
          if (types.includes("SysFlag")) return "$" + arg;
          return "#" + arg;
        }
        if (types.includes("Work") && types.includes("Label")) {
          if (
            arg.startsWith("ev_") ||
            arg.startsWith("lbl_") ||
            arg.startsWith("common_")
          )
                return '"' + arg + '"';

            if (arg.startsWith("@")) return arg;
          return "@" + arg;
        }
        if (types.includes("Work")) {
          if (arg.startsWith("@")) return arg;
          return "@" + arg;
        }
        if (types.includes("Label")) {
          if (arg.startsWith('"') || arg.startsWith("'")) return arg;
          return '"' + arg + '"';
        }
        return arg;
      });
      const indent = line.match(/^\s*/)[0];
      return `${indent}${cmdName}(${formattedArgs.join(", ")})`;
    })
    .join("\n");
};
