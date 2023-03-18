const { PythonShell } = require("python-shell");

let options: any = {
  mode: "text",
  pythonOptions: ["-u"],
  args: ["lancement_preview"],
};

PyShell.run("src/gorfou_api/", options).then(function (messages: any) {
  // results is an array consisting of messages collected during execution
  console.log("results: %j", messages);
});
