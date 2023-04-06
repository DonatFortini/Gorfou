/* module gérant les bouton du header et du navigateur */

// permet d'indiquer que le fichier est un module
export = {};

const axios = require("axios");
const os = require("os");
const ipcRenderer = require("electron").ipcRenderer;

//on récupère la page désirée dans l'url
const urlParams = new URLSearchParams(window.location.search);
const menuParam = urlParams.get("menu");

//permet de garder trace de la page active
let current = menuParam;

const but_menu1 = document.getElementById("menu_1");
const but_menu2 = document.getElementById("menu_2");
const but_menu3 = document.getElementById("menu_3");

//la fonction prend le page que l'on veut rendre active
function change(num: string) {
  //on remet toute les page a zero
  let x = document.getElementsByClassName("page_active");
  for (const element of x) {
    element.classList.replace("page_active", "page_");
  }
  //on cherche la page désirée et on lui ajoute active pour la rendre active
  const page = document.getElementById(num);
  if (page) {
    page.classList.remove("page_");
    page.classList.add("page_active");
  }

  let buttons = document.querySelectorAll(".menu button");
  buttons.forEach((button) => button.classList.remove("active"));
  // et on fais la même chose pour le menu associé à la page pour changer la couleur du bouton
  let clickedButton = document.getElementById(`menu_${num}`);
  if (clickedButton) {
    clickedButton.classList.add("active");
  }
}

//on change dès l'arrivé sur la page pour avoir la bonne page et le bon menu coloré
if (menuParam) {
  change(menuParam);
}

//on update current puis on utilise change pour changer de page
if (but_menu1) {
  but_menu1.addEventListener("click", function () {
    current = "1";
    change("1");
  });
}
if (but_menu2) {
  but_menu2.addEventListener("click", function () {
    current = "2";
    change("2");
  });
}
if (but_menu3) {
  but_menu3.addEventListener("click", function () {
    current = "3";
    change("3");
  });
}

const butt_import = document.getElementById("import");
const label = document.getElementById("fichier");

//si un fichier a été importé dans la page index.ts on récupère son nom stocké précédemment et l'affiche
if (label) {
  const labelText = sessionStorage.getItem("label_text");
  if (labelText) {
    label.innerText = labelText;
  }
}

//on envoie a mainApp.ts le signal
if (butt_import && label) {
  butt_import.addEventListener("click", function (event: any) {
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
    label.innerText = fileName;
    sessionStorage.setItem("label_text", fileName);
    //on envoie les données au notebook
    importer_donnees(fileName, filePath);
  });
}

/**
 * fonction envoyant les données au notebook par le biais de l'api gorfou
 * @param {string} fileName - nom du fichier
 * @param {string} filePath - chemin du fichier
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

// event listener pour le bouton paramètres
const butt_settings = document.getElementById("settings");
if (butt_settings) {
  butt_settings.addEventListener("click", () => {
    ipcRenderer.send("menu-item");
  });
}

let active: boolean = false;

// event listener pour le bouton prévisualisation
const button_preview = document.getElementById("preview");
if (button_preview) {
  button_preview.addEventListener("click", () => {
    if (!active) {
      button_preview.style.backgroundColor = "red";
      active = true;
      lancement_preview();
    } else {
      button_preview.style.backgroundColor = "#f38ba8";
      active = false;
    }
  });
}

/**
 *  Fonction qui envoie au notebook le signal de lancement de la prévisualisation
 */
function lancement_preview() {
  axios
    .post("http://127.0.0.1:5000/lancement_preview", {})
    .then(function (response: any) {
      console.log("It says: ", response.data);
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

const button_suite = document.getElementById("suite");
if (button_suite) {
  button_suite.addEventListener("click", () => {
    if (current == "3") {
      //si on est sur la dernière page on finalise le notebook
      finaliser();
    } else {
      current = String(eval(current!) + 1);
      change(current);
    }
  });
}

/**
 *
 */
function finaliser() {
  ipcRenderer.send("show-message-box");
  ipcRenderer.on("yes", () => {
    axios
    .post("http://127.0.0.1:5000/finaliser", {})
    .then(function (response: any) {
      console.log("It says: ", response.data);
    })
    .catch(function (error: any) {
      console.log(error);
    });
    window.location.assign("./final.html");
  });
}

// event listener pour le bouton finaliser
const button_final = document.getElementById("final");
if (button_final) {
  button_final.addEventListener("click", () => {
    finaliser();
  });
}
