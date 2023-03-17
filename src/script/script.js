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
if (butt_import) {
    butt_import.addEventListener('click', function (event) {
        icp.send('open-folder', 'src/datasets/test.csv');
    });
}
