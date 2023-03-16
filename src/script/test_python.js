"use strict";
exports.__esModule = true;
var python_shell_1 = require("python-shell");
var options = {
  mode: "text",
  pythonOptions: ["-u"],
};
python_shell_1.PythonShell.run("src/gorfou_api/", options).then(function (
  messages
) {
  console.log("results: %j", messages);
});
