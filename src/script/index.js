const { shell } = require('electron');

const button_import = document.getElementById("import");
button_import.addEventListener("click", function(event){
  shell.showItemInFolder('/home/donat/Téléchargements');
});


const button_transfo = document.getElementById("transf");
button_transfo.addEventListener("click", function () {
  window.location.assign("test_drag_and_drop.html");
});


const button_creatio = document.getElementById("creati");
button_creatio.addEventListener("click", function () {
  window.location.assign("main.html");
});


const button_visual = document.getElementById("visual");
button_visual.addEventListener("click", function () {
  window.location.assign("main.html");
});

