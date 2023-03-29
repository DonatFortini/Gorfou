"use strict";
/* script lançant l'application gorfou*/
const { app, BrowserWindow, ipcMain, Menu, MenuItem, dialog, } = require("electron");
const path = require("path");
const { PythonShell } = require("python-shell");
/* permet de désactiver les warning de sécurité, à supprimer et étudier avant l'éventuelle mise en production*/
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
// on crée la fenêtre principale
let mainWindow;
function createWindow() {
    /**
     * fonction de création de la fenêtre principale
     */
    // création de l'objet contenant les options pour le shell python
    let options = {
        mode: "text",
    };
    // on créer l'objet shell python et on récupère les messages envoyés par le script python qui lance le serveur local flask
    let pyshell = new PythonShell("src/gorfou_api/server.py", options);
    pyshell.on("message", function (message) {
        // les messages reçus sont printés dans la console par flask
        console.log("from flask : " + message);
    });
    // on crée la fenêtre
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
        pyshell.end(function (err) {
            if (err)
                throw err;
            console.log("finished");
        });
        mainWindow = null;
    });
    mainWindow.webContents.openDevTools();
}
app.on("ready", createWindow);
//on attend le signal de main.ts
ipcMain.on("open-file-dialog", function (event) {
    dialog //avec le module dialog on ouvre une fenêtre
        .showOpenDialog(mainWindow, {
        properties: ["openFile"],
        filters: [{ name: "CSV", extensions: ["csv"] }], //on filtre pour les csv
    })
        .then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.reply("selected-file", result.filePaths[0]); //si l'user a choisis un fichier on répond a main.ts
        } //et on lui envoie le nom du fichier
    })
        .catch((err) => {
        console.log(err);
    });
});
//on attend le signal de main.ts
ipcMain.on("show-message-box", (event, arg) => {
    const options = {
        //on crée les options de la fenêtre
        type: "question",
        buttons: ["Oui", "Non"],
        message: "êtes-vous sûr de vouloir finaliser le notebook?",
        defaultId: 0,
        title: "Confirmation",
        cancelId: 1, //non
    };
    dialog.showMessageBox(options).then((result) => {
        //avec dialog on crée la fenêtre
        if (result.response === 0) {
            event.sender.send("yes", result.response); //si on clique sur oui on envoie la réponse a main.ts
        }
        event.sender.send("message-box-closed", result.response);
    });
});
ipcMain.on("quit-app", () => {
    app.quit();
});
//on crée un menu sur l'appel de main.ts
// améliorable
ipcMain.on("menu-item", (event) => {
    const menu = new Menu(); // on crée menu et on ajoute des item pour chaque options désirées
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
