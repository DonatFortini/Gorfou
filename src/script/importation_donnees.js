"use strict";
const { PythonShell } = require("python-shell");
const formFileMultiple = document.getElementById("formFileMultiple");
formFileMultiple.addEventListener("change", (e) => {
    const path_to_data = e.target["files"][0]["path"];
    const file_name = e.target["files"][0]["name"];
    console.log(`path_to_data = ${path_to_data}\n file_name = ${file_name}`);
    let options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["import_data", path_to_data, file_name],
    };
    PythonShell.run("src/gorfou_api/", options).then(function (messages) {
        // results is an array consisting of messages collected during execution
        console.log("results: %j", messages);
    });
});