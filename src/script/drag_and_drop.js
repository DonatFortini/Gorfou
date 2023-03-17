"use strict";
const PyShell = require("python-shell");
const formFileMultiple = document.getElementById("formFileMultiple");
formFileMultiple.addEventListener("change", (e) => {
    console.log(e.target["files"][0]);
    let options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["lancement_preview"],
    };
    PyShell.run("src/gorfou_api/", options).then(function (messages) {
        // results is an array consisting of messages collected during execution
        console.log("results: %j", messages);
    });
});
