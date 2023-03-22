"use strict";
var ipcRenderer = require("electron").ipcRenderer;
var { PythonShell } = require("python-shell");
var os = require("os");
const urlParams = new URLSearchParams(window.location.search);
const menuParam = urlParams.get('menu');
const but_menu1 = document.getElementById('menu_1');
const but_menu2 = document.getElementById('menu_2');
const but_menu3 = document.getElementById('menu_3');
function change(num) {
    let x = document.getElementsByClassName('page_active');
    for (let i = 0; i < x.length; i++) {
        x[i].classList.replace('page_active', 'page_');
    }
    const page = document.getElementById(num);
    if (page) {
        page.classList.remove('page_');
        page.classList.add('page_active');
    }
    let buttons = document.querySelectorAll('.menu button');
    buttons.forEach(button => button.classList.remove('active'));
    let clickedButton = document.getElementById(`menu_${num}`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}
if (menuParam != null) {
    change(menuParam);
}
if (but_menu1) {
    but_menu1.addEventListener('click', function () {
        change('1');
    });
}
if (but_menu2) {
    but_menu2.addEventListener('click', function () {
        change('2');
    });
}
if (but_menu3) {
    but_menu3.addEventListener('click', function () {
        change('3');
    });
}
const butt_import = document.getElementById('import');
const label = document.getElementById('fichier');
if (label) {
    const labelText = sessionStorage.getItem('label_text');
    if (labelText) {
        label.innerText = labelText;
    }
}
if (butt_import && label) {
    butt_import.addEventListener("click", function (event) {
        ipcRenderer.send("open-file-dialog");
    });
    ipcRenderer.on("selected-file", function (event, filePath) {
        let fileName = '';
        if (os.type() == 'Windows_NT') {
            fileName = filePath.split("\\").pop() ?? "Unknown file";
        }
        else {
            fileName = filePath.split("/").pop() ?? "Unknown file";
        }
        if (label) {
            label.innerText = fileName;
            sessionStorage.setItem("label_text", fileName);
        }
        let options = {
            mode: "text",
            pythonOptions: ["-u"],
            args: ["import_data", filePath, fileName],
        };
        PythonShell.run("src/gorfou_api/", options).then(function (messages) {
            // results is an array consisting of messages collected during execution
            console.log("results: %j", messages);
        });
    });
}
const butt_settings = document.getElementById('settings');
if (butt_settings) {
    butt_settings.addEventListener('click', () => {
        alert('ca marche');
    });
}
const button_preview = document.getElementById('preview');
if (button_preview) {
    button_preview.addEventListener('click', () => {
        window.open('');
    });
}
