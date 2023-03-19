var ipcRenderer = require("electron").ipcRenderer;
var button_import = document.getElementById("import");
var fichier_label = document.getElementById("fichier");
if (button_import && fichier_label) {
    button_import.addEventListener("click", function (event) {
        ipcRenderer.send("open-file-dialog");
    });
    ipcRenderer.on("selected-file", function (event, filePath) {
        var _a;
        var fileName = (_a = filePath.split("/").pop()) !== null && _a !== void 0 ? _a : "Unknown file";
        if (fichier_label) {
            fichier_label.innerText = fileName;
            sessionStorage.setItem("label_text", fileName);
        }
    });
}
var button_transfo = document.getElementById("transf");
if (button_transfo) {
    button_transfo.addEventListener("click", function () {
        window.location.assign("importation_donnees.html");
    });
}
var button_creatio = document.getElementById("creati");
if (button_creatio) {
    button_creatio.addEventListener("click", function () {
        window.location.assign("main.html");
    });
}
var button_visual = document.getElementById("visual");
if (button_visual) {
    button_visual.addEventListener("click", function () {
        window.location.assign("main.html");
    });
}
