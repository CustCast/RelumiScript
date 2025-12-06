// 1. Define your custom theme
monaco.editor.defineTheme('bdsp-dark', {
    base: 'vs-dark', // Inherit from standard dark mode
    inherit: true,
    rules: [
        // Define your custom token names and their colors
        { token: 'bdsp-work', foreground: 'FF5555', fontStyle: 'bold' }, // !Works (Red)
        { token: 'bdsp-flag', foreground: '50FA7B' }, // #Flags (Green)
        { token: 'bdsp-sysflag', foreground: '8BE9FD', fontStyle: 'italic' }, // $SysFlags (Cyan)
        { token: 'bdsp-label', foreground: 'F1FA8C' }, // @Labels (Yellow)
        { token: 'bdsp-command', foreground: 'BD93F9', fontStyle: 'bold' }, // _COMMAND (Purple)
        { token: 'bdsp-number', foreground: 'FFB86C' }, // Numbers (Orange)
        { token: 'bdsp-string', foreground: 'F1FA8C' }, // Strings (Yellow)
        { token: 'bdsp-comment', foreground: '6272A4' } // Comments (Grey-Blue)
    ],
    colors: {
        'editor.background': '#282A36', // Dracula-style background
        'editor.foreground': '#F8F8F2'
    }
});

// 2. Create the editor using your new theme
var editor = monaco.editor.create(document.getElementById('container'), {
    value: ';Scripts will appear here once they are loaded.',
    language: 'bdsp',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    readOnly: true,
    theme: 'bdsp-dark' // <--- USE YOUR NEW THEME HERE
});

var model = editor.getModel();
model.setEOL(monaco.editor.EndOfLineSequence.LF);

window.addEventListener('resize', function () {
    editor.layout();
});