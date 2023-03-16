const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      contentSecurityPolicy:
        "default-src 'self'; style-src 'self' https://example.com",
    },
  });

  win.loadFile("src/index.html");

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
