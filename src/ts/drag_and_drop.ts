const dropzone = document.getElementById("dropzone");

dropzone.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

dropzone.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();

  console.log(e);
});
