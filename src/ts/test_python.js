"use strict";
exports.__esModule = true;
var python_shell_1 = require("python-shell");
var options = {
    pythonOptions: ["-u"]
};
python_shell_1.PythonShell.run("src/gorfou_api/test.py", options).then(function (messages) {
    var results;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
});
