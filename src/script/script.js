"use strict";
const icp = require('electron').ipcRenderer;
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
    butt_import.addEventListener('click', function (event) {
        icp.send('open-file-dialog');
    });
    icp.on('selected-file', function (event, filePath) {
        const file = filePath.split('/').pop() ?? 'Unknown file';
        if (label) {
            label.innerText = file;
            sessionStorage.setItem('label_text', file);
        }
    });
}
