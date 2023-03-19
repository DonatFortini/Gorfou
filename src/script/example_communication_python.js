"use strict";
const { PythonShell } = require("python-shell");
let options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: ["lancement_preview"],
};
PyShell.run("src/gorfou_api/", options).then(function (messages) {
    // results is an array consisting of messages collected during execution
    console.log("results: %j", messages);
});
