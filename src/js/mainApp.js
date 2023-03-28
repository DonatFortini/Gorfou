"use strict";
const { app, BrowserWindow, ipcMain, Menu, MenuItem, dialog, } = require("electron");
const path = require("path");
const { PythonShell } = require("python-shell");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let mainWindow;
function createWindow() {
    PythonShell.run("src/gorfou_api/").then(function (messages) {
        console.log("results: %j", messages);
    });
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, "../resources/logo_gorfou.png"),
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
//on attend le signal de main.ts
ipcMain.on("open-file-dialog", function (event) {
    dialog //avec le module dialog on ouvre une fenetre 
        .showOpenDialog(mainWindow, {
        properties: ["openFile"],
        filters: [{ name: "CSV", extensions: ["csv"] }], //on filtre pour les csv
    })
        .then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.reply("selected-file", result.filePaths[0]); //si l'user a choisis un fichier on repond a main.ts
        } //et on lui envoit le nom du fichier
    })
        .catch((err) => {
        console.log(err);
    });
});
//on attend le signal de main.ts
ipcMain.on("show-message-box", (event, arg) => {
    const options = {
        type: "question",
        buttons: ["Oui", "Non"],
        message: "êtes-vous sûr de vouloir finaliser le notebook?",
        defaultId: 0,
        title: "Confirmation",
        cancelId: 1, //non
    };
    dialog.showMessageBox(options).then((result) => {
        if (result.response === 0) {
            event.sender.send("yes", result.response); //si on clique sur oui on envoit la reponse a main.ts
        }
        event.sender.send("message-box-closed", result.response);
    });
});
ipcMain.on("quit-app", () => {
    app.quit();
});
//on cree un menu sur l'appel de main.ts
ipcMain.on("menu-item", (event) => {
    const menu = new Menu(); // on crée menu et on ajoute des item pour chaque options desirées
    menu.append(new MenuItem({
        label: "Settings",
        click: function () {
            console.log("Settings clicked");
        },
    }));
    menu.append(new MenuItem({
        label: "Settings",
        click: function () {
            console.log("Settings clicked");
        },
    }));
    menu.append(new MenuItem({
        label: "Settings",
        click: function () {
            console.log("Settings clicked");
        },
    }));
    menu.append(new MenuItem({
        label: "Settings",
        click: function () {
            console.log("Settings clicked");
        },
    }));
    menu.append(new MenuItem({
        label: "profil",
        click: function () {
            console.log("Settings clicked");
        },
    }));
    menu.popup(BrowserWindow.fromWebContents(event.sender));
});
