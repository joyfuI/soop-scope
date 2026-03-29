import type { CategoryList, ChatUserList, MainBroadListParams } from './types';

declare global {
  interface Window {
    electron: {
      chatUserList: (streamerId: string) => Promise<ChatUserList>;
      mainBroadList: (params: MainBroadListParams) => Promise<Response>;
      categoryList: (path: string) => Promise<CategoryList>;
      quit: () => Promise<void>;
    };
  }
}
