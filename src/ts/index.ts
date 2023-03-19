const ipcRenderer = require("electron").ipcRenderer;

const button_import = document.getElementById("import");
const fichier_label = document.getElementById("fichier");

if (button_import && fichier_label) {
  button_import.addEventListener("click", function (event: any) {
    ipcRenderer.send("open-file-dialog");
  });

  ipcRenderer.on("selected-file", function (event: any, filePath: string) {
    const fileName = filePath.split("/").pop() ?? "Unknown file";
    if (fichier_label) {
      fichier_label.innerText = fileName;
      sessionStorage.setItem("label_text", fileName);
    }
  });
}

const button_transfo = document.getElementById("transf");
if (button_transfo) {
  button_transfo.addEventListener("click", function () {
    window.location.assign("importation_donnees.html");
  });
}

const button_creatio = document.getElementById("creati");
if (button_creatio) {
  button_creatio.addEventListener("click", function () {
    window.location.assign("main.html");
  });
}

const button_visual = document.getElementById("visual");
if (button_visual) {
  button_visual.addEventListener("click", function () {
    window.location.assign("main.html");
  });
}
