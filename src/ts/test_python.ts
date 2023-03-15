import { PythonShell } from "python-shell";

var python_shell_1 = require("python-shell");
var options = {
  mode: "text",
  pythonOptions: ["-u"],
};
python_shell_1.PythonShell.run("src/gorfou_api/", options).then(function (
  messages
) {
  // results is an array consisting of messages collected during execution
  console.log("results: %j", messages);
});
