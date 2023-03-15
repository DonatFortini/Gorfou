import { PythonShell } from "python-shell";

PythonShell.runString("x=1+1;print(x)").then((messages) => {
  console.log("finished");
});
