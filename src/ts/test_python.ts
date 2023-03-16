import { PythonShell } from "python-shell";

let options = {
  mode: "text",
  pythonOptions: ["-u"],
};

PythonShell.run("src/gorfou_api/").then(function (messages) {
  // results is an array consisting of messages collected during execution
  console.log("results: %j", messages);
});
