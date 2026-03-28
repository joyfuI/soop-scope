import type { ChatUserList, MainBroadListParams } from './types';

declare global {
  interface Window {
    electron: {
      chatUserList: (streamerId: string) => Promise<ChatUserList>;
      mainBroadList: (params: MainBroadListParams) => Promise<Response>;
    };
  }
}
