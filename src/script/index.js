"use strict";
const ipcRenderer = require('electron').ipcRenderer;
const { dialog } = require('electron');
const button_import = document.getElementById('import');
const fichier_label = document.getElementById('fichier');
if (button_import && fichier_label) {
    button_import.addEventListener('click', function (event) {
        dialog.showOpenDialog({ properties: ['openFile'] }).then((result) => {
            if (!result.canceled && result.filePaths.length > 0) {
                ipcRenderer.send('selected-file', result.filePaths[0]);
            }
        });
    });
    ipcRenderer.on('selected-file', function (event, filePath) {
        const fileName = filePath.split('/').pop() ?? 'Unknown file';
        if (fichier_label) {
            fichier_label.innerText = fileName;
        }
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
