const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { PythonShell } = require("python-shell");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let mainWindow: {
  webContents: any;
  loadFile: (arg0: any) => void;
  on: (arg0: string, arg1: () => void) => void;
} | null;

function createWindow() {
  PythonShell.run("src/gorfou_api/").then(function (messages: any) {
    console.log("results: %j", messages);
  });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../resources/logo_gorfou.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      allowEval: false,
    },
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
