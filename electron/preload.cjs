const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electron', {
  chatUserList: (streamerId) => ipcRenderer.invoke('chatUserList', streamerId),
  mainBroadList: (params) => ipcRenderer.invoke('mainBroadList', params),
});
