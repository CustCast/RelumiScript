// 1. Define Default Theme (Fallback)
monaco.editor.defineTheme("bdsp-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "bdsp-scriptlabel", foreground: "569CD6", fontStyle: "bold" },
        { token: "bdsp-workvar", foreground: "FFD700" },
        { token: "bdsp-flag", foreground: "50FA7B" },
        { token: "bdsp-sysflag", foreground: "8BE9FD", fontStyle: "italic" },
        { token: "bdsp-command", foreground: "BD93F9", fontStyle: "bold" },
        { token: "bdsp-number", foreground: "FFB86C" },
        { token: "bdsp-string", foreground: "F1FA8C" },
        { token: "bdsp-comment", foreground: "6272A4" },
    ],
    colors: {
        "editor.background": "#282A36",
        "editor.foreground": "#F8F8F2",
    },
});

// 2. Create Editor
var editor = monaco.editor.create(document.getElementById("container"), {
    value: ";Scripts will appear here once they are loaded.",
    language: "bdsp",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    readOnly: true,
    theme: "bdsp-dark",
    minimap: {
        enabled: false
    },
    // Fix: Disable Unicode Highlighting to prevent warnings on smart quotes (’)
    unicodeHighlight: {
        ambiguousCharacters: false,
        invisibleCharacters: false,
    }
});

var model = editor.getModel();
model.setEOL(monaco.editor.EndOfLineSequence.LF);

window.addEventListener("resize", function () {
    editor.layout();
});

// Helper: Convert Avalonia Hex (#AARRGGBB) to CSS Hex (#RRGGBBAA)
function fixColor(hex) {
    if (!hex || typeof hex !== 'string') return hex;

    // Check for Avalonia 8-digit hex (#AARRGGBB)
    if (hex.length === 9 && hex.startsWith('#')) {
        var a = hex.substr(1, 2);
        var r = hex.substr(3, 2);
        var g = hex.substr(5, 2);
        var b = hex.substr(7, 2);

        // CSS expects #RRGGBBAA or #RRGGBB
        // If alpha is FF, just return RGB for cleaner CSS
        if (a.toLowerCase() === 'ff') {
            return '#' + r + g + b;
        }
        return '#' + r + g + b + a;
    }
    return hex;
}

// 3. New Function to Update Theme from JSON Settings
window.updateRelumiTheme = function (settings) {
    if (!settings || !settings.Syntax) {
        console.log("updateRelumiTheme: Invalid settings");
        return;
    }

    var s = settings.Syntax;
    var c = settings.Colors || {};

    var newRules = [];

    // Helper to map JSON setting to Monaco rule
    function pushRule(tokenName, styleConfig) {
        if (styleConfig && styleConfig.Color) {
            var rule = {
                token: tokenName,
                foreground: fixColor(styleConfig.Color)
            };
            if (styleConfig.Style) rule.fontStyle = styleConfig.Style;
            newRules.push(rule);
        }
    }

    pushRule("bdsp-scriptlabel", s.ScriptLabel);
    pushRule("bdsp-workvar", s.WorkVar);
    pushRule("bdsp-flag", s.Flag);
    pushRule("bdsp-sysflag", s.SysFlag);
    pushRule("bdsp-command", s.Command);
    pushRule("bdsp-number", s.Number);
    pushRule("bdsp-string", s.String);
    pushRule("bdsp-comment", s.Comment);

    monaco.editor.defineTheme("bdsp-custom", {
        base: "vs-dark",
        inherit: true,
        rules: newRules,
        colors: {
            "editor.background": fixColor(c.Background) || "#1E1E1E",
            "editor.foreground": fixColor(c.Foreground) || "#CCCCCC"
        }
    });

    monaco.editor.setTheme("bdsp-custom");
}