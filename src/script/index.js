const openFolder = () => {
  const { shell } = require('electron');
  const path = require('path');
  const folderPath = path.join(__dirname, '../datasets/');
  shell.showItemInFolder(folderPath);
};

const button_import = document.getElementById('import');
button_import.addEventListener('click', openFolder);

const button_transfo = document.getElementById('transf');
button_transfo.addEventListener('click', () => { window.location.assign('main.html') });

const button_creatio = document.getElementById('creati');
button_creatio.addEventListener('click', () => { window.location.assign('main.html') });

const button_visual = document.getElementById('visual');
button_visual.addEventListener('click', () => { window.location.assign('main.html') });
