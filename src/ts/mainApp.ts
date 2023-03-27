const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  dialog,
} = require("electron");
const path = require("path");
const { PythonShell } = require("python-shell");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let mainWindow: {
  webContents: any;
  loadFile: (arg0: any) => void;
  on: (arg0: string, arg1: () => void) => void;
} | null;

function createWindow() {
  PythonShell.run("../gorfou_api/");
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

ipcMain.on(
  "show-message-box",
  (
    event: { sender: { send: (arg0: string, arg1: any) => void } },
    arg: any
  ) => {
    const options = {
      type: "question",
      buttons: ["Oui", "Non"],
      message: "êtes-vous sûr de vouloir finaliser le notebook?",
      defaultId: 0,
      title: "Confirmation",
      cancelId: 1,
    };
    dialog.showMessageBox(options).then((result: { response: any }) => {
      if (result.response === 0) {
        event.sender.send("yes", result.response);
      }
      event.sender.send("message-box-closed", result.response);
    });
  }
);

ipcMain.on("quit-app", () => {
  app.quit();
});

ipcMain.on("menu-item", (event: any) => {
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "Settings",
      click: function () {
        console.log("Settings clicked");
      },
    })
  );
  menu.append(
    new MenuItem({
      label: "Settings",
      click: function () {
        console.log("Settings clicked");
      },
    })
  );
  menu.append(
    new MenuItem({
      label: "Settings",
      click: function () {
        console.log("Settings clicked");
      },
    })
  );
  menu.append(
    new MenuItem({
      label: "Settings",
      click: function () {
        console.log("Settings clicked");
      },
    })
  );
  menu.append(
    new MenuItem({
      label: "profil",
      click: function () {
        console.log("Settings clicked");
      },
    })
  );
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});
