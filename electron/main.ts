import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, ipcMain, shell } from 'electron';

import { handleCategoryList } from './category';
import { handleChatUserList, handleMainBroadList } from './soop';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

const isSafeExternalUrl = (url: string): boolean => {
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
    webPreferences: { preload: path.join(__dirname, 'preload.mjs') },
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isSafeExternalUrl(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
};

app.setPath(
  'appData',
  process.env.PORTABLE_EXECUTABLE_DIR ?? process.env.APP_ROOT,
);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

ipcMain.handle('chatUserList', handleChatUserList);
ipcMain.handle('mainBroadList', handleMainBroadList);
ipcMain.handle('categoryList', handleCategoryList);
ipcMain.on('quit', () => app.quit());
