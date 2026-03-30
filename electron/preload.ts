import { contextBridge, ipcRenderer } from 'electron';

import type {
  CategoryList,
  ChatUserList,
  MainBroadListParams,
  MainBroadListResponse,
} from '../src/types';

const electronApi = {
  chatUserList: (streamerId: string): Promise<ChatUserList> =>
    ipcRenderer.invoke('chatUserList', streamerId),
  mainBroadList: (
    params: MainBroadListParams,
  ): Promise<MainBroadListResponse> =>
    ipcRenderer.invoke('mainBroadList', params),
  categoryList: (path: string): Promise<CategoryList> =>
    ipcRenderer.invoke('categoryList', path),
  quit: () => ipcRenderer.send('quit'),
};

contextBridge.exposeInMainWorld('electron', electronApi);

export type ElectronApi = typeof electronApi;
