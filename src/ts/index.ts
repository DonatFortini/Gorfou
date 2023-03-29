/* module contenant la programmation événementielle lié à l'index*/

const ipcRenderer = require("electron").ipcRenderer;
const os = require("os");
const axios = require("axios");
const button_import = document.getElementById("import");
const fichier_label = document.getElementById("fichier");

/**
 *
 * @param fileName
 * @param filePath
 */
function importer_donnees(fileName: string, filePath: string) {
  axios
    .post("http://127.0.0.1:5000/import_data", {
      file_name: fileName,
      file_path: filePath,
    })
    .then(function (response: any) {
      console.log("It says: ", response.data);
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

// on vérifie si les boutons ne sont pas null bien on envoie un signal a Mainapp.ts avec ipcRenderer
if (button_import && fichier_label) {
  button_import.addEventListener("click", function (event: any) {
    ipcRenderer.send("open-file-dialog");
  });
  //on reçoit le signal de retour de Mainapp.ts
  ipcRenderer.on("selected-file", function (event: any, filePath: string) {
    let fileName = "";
    // choix os
    if (os.type() == "Windows_NT") {
      fileName = filePath.split("\\").pop() ?? "Unknown file";
    } else {
      fileName = filePath.split("/").pop() ?? "Unknown file";
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
const button_settings = document.getElementById("settings");
if (button_settings) {
  button_settings.addEventListener("click", () => {
    ipcRenderer.send("menu-item");
  });
}
