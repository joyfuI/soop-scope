import type {
  CategoryList,
  ChatUserList,
  MainBroadListParams,
  MainBroadListResponse,
} from './types.ts';

interface DesktopBindings {
  chatUserList(streamerId: string): Promise<ChatUserList>;
  mainBroadList(params: MainBroadListParams): Promise<MainBroadListResponse>;
  categoryList(path: string): Promise<CategoryList>;
  openExternal(url: string): Promise<void>;
  quit(): Promise<void>;
}

declare global {
  const bindings: DesktopBindings;
}
