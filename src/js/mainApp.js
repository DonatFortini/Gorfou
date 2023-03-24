"use strict";
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "../resources/logo_gorfou.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
    mainWindow.webContents.openDevTools();
}
app.on("ready", createWindow);
ipcMain.on("open-file-dialog", function (event) {
    dialog
        .showOpenDialog(mainWindow, {
        properties: ["openFile"],
        filters: [{ name: "CSV", extensions: ["csv"] }],
    })
        .then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.reply("selected-file", result.filePaths[0]);
        }
    })
        .catch((err) => {
        console.log(err);
    });
});
ipcMain.on('show-message-box', (event, arg) => {
    const options = {
        type: 'question',
        buttons: ['Oui', 'Non'],
        message: 'êtes-vous sûr de vouloir finaliser le notebook?',
        defaultId: 0,
        title: 'Confirmation',
        cancelId: 1
    };
    dialog.showMessageBox(options).then((result) => {
        if (result.response === 0) {
            event.sender.send('yes', result.response);
        }
        event.sender.send('message-box-closed', result.response);
    });
});
ipcMain.on("quit-app", function () {
    app.quit();
});
let settingsWindow;
function createSettingsWindow() {
    settingsWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    settingsWindow.loadFile(path.join(__dirname, "../settings.html"));
    settingsWindow.on("closed", () => {
        settingsWindow = null;
    });
}
ipcMain.on("open-settings-window", () => {
    if (settingsWindow) {
        settingsWindow.focus();
    }
    else {
        createSettingsWindow();
    }
});
