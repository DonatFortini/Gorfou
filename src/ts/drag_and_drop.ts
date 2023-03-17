const  PyShell  =require("python-shell");

const formFileMultiple:any | null = document.getElementById("formFileMultiple");

formFileMultiple.addEventListener("change", (e: { target: { [x: string]: any[]; }; }) => {
  console.log(e.target["files"][0]);

  let options: any = {
    mode: "text",
    pythonOptions: ["-u"],
    args: ["lancement_preview"],
  };

  PyShell.run("src/gorfou_api/", options).then(function (messages: any) {
    // results is an array consisting of messages collected during execution
    console.log("results: %j", messages);
  });
});
