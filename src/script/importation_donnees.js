"use strict";

var python_shell_1 = require("python-shell");
var formFileMultiple = document.getElementById("formFileMultiple");
formFileMultiple.addEventListener("change", function (e) {
  var path_to_data = e.target["files"][0]["path"];
  var file_name = e.target["files"][0]["name"];
  console.log(
    "path_to_data = ".concat(path_to_data, "\n file_name = ").concat(file_name)
  );
  var options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: ["import_data", path_to_data, file_name],
  };
  python_shell_1.PythonShell.run("src/gorfou_api/", options).then(function (
    messages
  ) {
    // results is an array consisting of messages collected during execution
    console.log("results: %j", messages);
  });
});
