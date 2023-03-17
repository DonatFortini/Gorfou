"use strict";
const ipcRenderer = require('electron').ipcRenderer;
const button_import = document.getElementById('import');
if (button_import) {
    button_import.addEventListener('click', function (event) {
        ipcRenderer.send('open-folder', 'src/datasets/test.csv');
    });
}
const button_transfo = document.getElementById('transf');
if (button_transfo) {
    button_transfo.addEventListener('click', function () {
        window.location.assign('test_drag_and_drop.html');
    });
}
const button_creatio = document.getElementById('creati');
if (button_creatio) {
    button_creatio.addEventListener('click', function () {
        window.location.assign('main.html');
    });
}
const button_visual = document.getElementById('visual');
if (button_visual) {
    button_visual.addEventListener('click', function () {
        window.location.assign('main.html');
    });
}
