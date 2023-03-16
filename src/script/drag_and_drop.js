"use strict";
var python_shell_1 = require("python-shell");
var formFileMultiple = document.getElementById("formFileMultiple");
formFileMultiple.addEventListener("change", function (e) {
  console.log(e.target["files"][0]);
  var options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: ["lancement_preview"],
  };
  python_shell_1.PythonShell.run("src/gorfou_api/__main__.py", options).then(
    function (messages) {
      // results is an array consisting of messages collected during execution
      console.log("aaaaaa");
    }
  );
});
