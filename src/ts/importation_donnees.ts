const PyShell = require("python-shell");

const formFileMultiple: any | null =
  document.getElementById("formFileMultiple");

formFileMultiple.addEventListener(
  "change",
  (e: { target: { [x: string]: any[] } }) => {
    console.log(e.target["files"][0]);
  }
);
