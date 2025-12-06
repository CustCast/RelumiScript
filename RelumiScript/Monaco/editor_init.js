var editor = monaco.editor.create(document.getElementById('container'), {
    value: ';Scripts will appear here once they are loaded.',
    language: 'bdsp',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true, // Attempt auto-resize
    readOnly: true,
    theme: 'vs-dark'
});

var model = editor.getModel();
model.setEOL(monaco.editor.EndOfLineSequence.LF);

// Explicitly handle window resizing to force Monaco to fit the container
window.addEventListener('resize', function () {
    editor.layout();
});