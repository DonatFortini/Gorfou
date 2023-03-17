"use strict";
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
ipcMain.on('open-file-dialog', function (event) {
    dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{ name: 'CSV', extensions: ['csv'] }]
    }).then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.reply('selected-file', result.filePaths[0]);
        }
    }).catch((err) => {
        console.log(err);
    });
});
ipcMain.on('quit-app', function () {
    app.quit();
});
