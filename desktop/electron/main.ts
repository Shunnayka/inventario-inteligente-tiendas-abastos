import { app, BrowserWindow, session } from 'electron';
import path from 'node:path';

const isDev = !app.isPackaged;
const devServerUrl = process.env.DESKTOP_DEV_SERVER_URL || 'http://localhost:5173';

function crearVentana(): void {
  const ventana = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Sin esto, Electron deniega getUserMedia por defecto y la cámara/micrófono
  // del escáner de códigos y los comandos de voz no funcionan.
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    const permitidos = ['media', 'camera', 'microphone'];
    callback(permitidos.includes(permission));
  });
  session.defaultSession.setPermissionCheckHandler((_webContents, permission) => {
    const permitidos = ['media', 'camera', 'microphone'];
    return permitidos.includes(permission);
  });

  if (isDev) {
    ventana.loadURL(devServerUrl);
    ventana.webContents.openDevTools({ mode: 'detach' });
  } else {
    ventana.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  crearVentana();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) crearVentana();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
