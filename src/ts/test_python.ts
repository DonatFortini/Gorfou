import { PythonShell } from "python-shell";

let options = {
  pythonOptions: ["-u"], // get print results in real-time
};

PythonShell.run("src/gorfou_api/test.py", options).then((messages) => {
  let results;
  // results is an array consisting of messages collected during execution
  console.log("results: %j", results);
});
