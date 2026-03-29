import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, ipcMain, shell } from 'electron/main';

import { handleCategoryList } from './category.js';
import { handleChatUserList, handleMainBroadList } from './soop.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isSafeExternalUrl = (url) => {
  try {
    const u = new URL(url);
    return u.host === 'play.sooplive.com';
  } catch {
    return false;
  }
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: { preload: path.join(__dirname, 'preload.cjs') },
    icon: path.join(__dirname, 'assets', 'icon.png'),
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } else {
    win.loadURL('http://localhost:5173');
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isSafeExternalUrl(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
};

app.setPath('appData', process.env.PORTABLE_EXECUTABLE_DIR ?? __dirname);

app.whenReady().then(() => {
  ipcMain.handle('chatUserList', handleChatUserList);
  ipcMain.handle('mainBroadList', handleMainBroadList);
  ipcMain.handle('categoryList', handleCategoryList);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
