// RelumiScript Monaco Editor Initialization

// THEME DEFINITION - Single source of truth for token colors
// Token types are referenced in bdsp_ev_script.js (applySyntaxData function)
// To change colors, modify the 'foreground' values below
monaco.editor.defineTheme("bdsp-dark", {
  base: "vs-dark", // Inherit from standard dark mode
  inherit: true,
  rules: [
    // BDSP Script Syntax Highlighting Colors
    { token: "bdsp-scriptlabel", foreground: "569CD6", fontStyle: "bold" }, // Script labels: ev_c02r0101_woman6: (Blue)
    { token: "bdsp-workvar", foreground: "FFD700" }, // @Work variables: @SCWK_TEMP2 (Gold)
    { token: "bdsp-flag", foreground: "50FA7B" }, // #Flags: #FlagName (Green)
    { token: "bdsp-sysflag", foreground: "8BE9FD", fontStyle: "italic" }, // $SysFlags: $SysFlagName (Cyan)
    { token: "bdsp-command", foreground: "BD93F9", fontStyle: "bold" }, // Commands: _TALK_OBJ_START (Purple)
    { token: "bdsp-number", foreground: "FFB86C" }, // Numbers: 123 (Orange)
    { token: "bdsp-string", foreground: "F1FA8C" }, // Strings: "label" (Yellow)
    { token: "bdsp-comment", foreground: "6272A4" }, // Comments: ; // (Grey-Blue)
  ],
  colors: {
    "editor.background": "#282A36", // Dracula-style background
    "editor.foreground": "#F8F8F2",
  },
});

// 2. Create the editor using your new theme
var editor = monaco.editor.create(document.getElementById("container"), {
  value: ";Scripts will appear here once they are loaded.",
  language: "bdsp",
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  readOnly: true,
  theme: "bdsp-dark", // <--- USE YOUR NEW THEME HERE
});

var model = editor.getModel();
model.setEOL(monaco.editor.EndOfLineSequence.LF);

window.addEventListener("resize", function () {
  editor.layout();
});
