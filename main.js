const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 500,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

}

ipcMain.on('minimize-window', () => {
  win.minimize();
});

ipcMain.on('maximize-window', () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

ipcMain.on('close-window', () => {
  win.close();
});

ipcMain.on('open-external', (event, url) => {
  if (typeof url === 'string' && url.startsWith('http')) {
    shell.openExternal(url);
  }
});
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});