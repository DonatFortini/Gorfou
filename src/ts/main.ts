const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
var { PythonShell } = require("python-shell");

let mainWindow: {
  webContents: any;
  loadFile: (arg0: any) => void;
  on: (arg0: string, arg1: () => void) => void;
} | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "../resources/logo_gorfou.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  console.log("aaaa");

  let options: object = {
    mode: "text",
    pythonOptions: ["-u"],
  };

  PythonShell.run("src/gorfou_api/", options).then(function (messages: any) {
    // results is an array consisting of messages collected during execution
    console.log("results: %j", messages);
  });

  mainWindow!.loadFile(path.join(__dirname, "../index.html"));

  mainWindow!.on("closed", function () {
    mainWindow = null;
  });

  mainWindow!.webContents.openDevTools();
}

app.on("ready", createWindow);

ipcMain.on(
  "open-file-dialog",
  function (event: { reply: (arg0: string, arg1: any) => void }) {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ["openFile"],
        filters: [{ name: "CSV", extensions: ["csv"] }],
      })
      .then((result: { canceled: any; filePaths: string | any[] }) => {
        if (!result.canceled && result.filePaths.length > 0) {
          event.reply("selected-file", result.filePaths[0]);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
);

ipcMain.on("quit-app", function () {
  app.quit();
});
