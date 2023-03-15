
const button_import = document.getElementById('import');
button_import.addEventListener('click', () => {
  remote.showOpenDialog({
    properties: ['openDirectory'],
    title: 'Select Folder'
  }).then(result => {
    console.log(result.filePaths);
  }).catch(err => {
    console.log(err);
  });
});

const button_transfo = document.getElementById('transf');
button_transfo.addEventListener('click',function(){window.location.assign("main.html")});

const button_creatio = document.getElementById('creati');
button_creatio.addEventListener('click',function(){window.location.assign("main.html")});

const button_visual = document.getElementById('visual');
button_visual.addEventListener('click',function(){window.location.assign("main.html")});