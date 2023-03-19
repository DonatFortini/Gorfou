var PyShell = require("python-shell");
var formFileMultiple = document.getElementById("formFileMultiple");
formFileMultiple.addEventListener("change", function (e) {
    console.log(e.target["files"][0]);
});
