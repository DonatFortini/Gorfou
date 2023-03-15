"use strict";
exports.__esModule = true;
var python_shell_1 = require("python-shell");
python_shell_1.PythonShell.runString("x=1+1;print(x)").then(function (messages) {
    console.log("finished");
});
