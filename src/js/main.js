"use strict";
const urlParams = new URLSearchParams(window.location.search);
const menuParam = urlParams.get("menu");
let current = menuParam;
const but_menu1 = document.getElementById("menu_1");
const but_menu2 = document.getElementById("menu_2");
const but_menu3 = document.getElementById("menu_3");
function change(num) {
    let x = document.getElementsByClassName("page_active");
    for (const element of x) {
        element.classList.replace("page_active", "page_");
    }
    const page = document.getElementById(num);
    if (page) {
        page.classList.remove("page_");
        page.classList.add("page_active");
    }
    let buttons = document.querySelectorAll(".menu button");
    buttons.forEach((button) => button.classList.remove("active"));
    let clickedButton = document.getElementById(`menu_${num}`);
    if (clickedButton) {
        clickedButton.classList.add("active");
    }
}
if (menuParam != null) {
    change(menuParam);
}
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
if (label) {
    const labelText = sessionStorage.getItem("label_text");
    if (labelText) {
        label.innerText = labelText;
    }
}
if (butt_import && label) {
    butt_import.addEventListener("click", function (event) {
        ipcRenderer.send("open-file-dialog");
    });
    ipcRenderer.on("selected-file", function (event, filePath) {
        var _a, _b;
        let fileName = "";
        if (os.type() == "Windows_NT") {
            fileName = (_a = filePath.split("\\").pop()) !== null && _a !== void 0 ? _a : "Unknown file";
        }
        else {
            fileName = (_b = filePath.split("/").pop()) !== null && _b !== void 0 ? _b : "Unknown file";
        }
        label.innerText = fileName;
        sessionStorage.setItem("label_text", fileName);
        let options = {
            mode: "text",
            pythonOptions: ["-u"],
            args: ["import_data", filePath, fileName],
        };
        PythonShell.run("src/gorfou_api/", options).then(function (messages) {
            console.log("results: %j", messages);
        });
    });
}
const butt_settings = document.getElementById("settings");
if (butt_settings) {
    butt_settings.addEventListener("click", () => {
        ipcRenderer.send("menu-item");
    });
}
const button_preview = document.getElementById("preview");
if (button_preview) {
    button_preview.addEventListener("click", () => {
        window.open("");
    });
}
const button_suite = document.getElementById("suite");
if (button_suite) {
    button_suite.addEventListener("click", () => {
        if (current == "3") {
            finaliser();
        }
        else {
            current = String(eval(current) + 1);
            change(current);
        }
    });
}
function finaliser() {
    ipcRenderer.send("show-message-box");
    ipcRenderer.on("yes", () => {
        window.location.assign("./final.html");
    });
}
const button_final = document.getElementById("final");
if (button_final) {
    button_final.addEventListener("click", () => {
        finaliser();
    });
}
