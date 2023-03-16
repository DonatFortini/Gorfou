var dropzone = document.getElementById("dropzone");
dropzone.addEventListener("dragover", function (e) {
    e.stopPropagation();
    e.preventDefault();
});
dropzone.addEventListener("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
});
