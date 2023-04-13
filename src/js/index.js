"use strict";
const ipcRenderer = require("electron").ipcRenderer;
const os = require("os");
const axios = require("axios");
const button_import = document.getElementById("import");
const fichier_label = document.getElementById("fichier");
/**
 * fonction envoyant les données au notebook par le biais de l'api gorfou
 * @param {string} fileName - nom du fichier
 * @param {string} filePath - chemin du fichier
 */
function importer_donnees(fileName, filePath) {
    axios
        .post("http://127.0.0.1:5000/import_data", {
        file_name: fileName,
        file_path: filePath,
    })
        .then(function (response) {
        console.log("It says: ", response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
}
// on vérifie si les boutons ne sont pas null bien on envoie un signal a Mainapp.ts avec ipcRenderer
if (button_import && fichier_label) {
    button_import.addEventListener("click", function (event) {
        ipcRenderer.send("open-file-dialog");
    });
    //on reçoit le signal de retour de Mainapp.ts
    ipcRenderer.on("selected-file", function (event, filePath) {
        var _a, _b;
        let fileName = "";
        // choix os
        if (os.type() == "Windows_NT") {
            fileName = (_a = filePath.split("\\").pop()) !== null && _a !== void 0 ? _a : "Unknown file";
        }
        else {
            fileName = (_b = filePath.split("/").pop()) !== null && _b !== void 0 ? _b : "Unknown file";
        }
        //on stock le nom pour pour l'envoyer a main.ts
        fichier_label.innerText = fileName;
        sessionStorage.setItem("label_text", fileName);
        //on envoie les données au notebook
        importer_donnees(fileName, filePath);
    });
}
//on envoi le numéro de la page dans l'url et on le récupère dans main.ts
// event listener pour le bouton de transformation
const button_transfo = document.getElementById("transf");
if (button_transfo) {
    button_transfo.addEventListener("click", function () {
        window.location.href = "main.html?menu=1";
    });
}
// event listener pour le bouton de création
const button_creatio = document.getElementById("creati");
if (button_creatio) {
    button_creatio.addEventListener("click", function () {
        window.location.href = "main.html?menu=2";
    });
}
// event listener pour le bouton de visualisation
const button_visual = document.getElementById("visual");
if (button_visual) {
    button_visual.addEventListener("click", function () {
        window.location.href = "main.html?menu=3";
    });
}
// event listener pour le bouton de paramètres
//on envoi le signal a mainApp.ts
const button_settings = document.querySelector("#settings");
if (button_settings) {
    button_settings.addEventListener("click", () => {
        ipcRenderer.send("menu-item");
    });
}
module.exports = {};
