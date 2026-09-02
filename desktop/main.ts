/// <reference no-default-lib="true" />
/// <reference lib="deno.desktop" />

import { serveDir } from '@std/http/file-server';
import { join } from '@std/path';

import { handleCategoryList } from './category.ts';
import { handleChatUserList, handleMainBroadList } from './soop.ts';

const distPath = join(import.meta.dirname ?? Deno.cwd(), '..', 'dist');

Deno.serve((request) => serveDir(request, { fsRoot: distPath }));

const win = new Deno.BrowserWindow({
  title: 'SOOP 스코프',
  width: 800,
  height: 800,
});

win.bind('chatUserList', handleChatUserList);
win.bind('mainBroadList', handleMainBroadList);
win.bind('categoryList', handleCategoryList);
win.bind('openExternal', async (rawUrl: string) => {
  const url = new URL(rawUrl);

  if (url.origin !== 'https://play.sooplive.com') {
    throw new Error('허용되지 않은 외부 URL입니다.');
  }

  const process = new Deno.Command('rundll32.exe', {
    args: ['url.dll,FileProtocolHandler', url.href],
  }).spawn();

  await process.status;
});
win.bind('quit', () => Deno.exit(0));

win.addEventListener('close', () => Deno.exit(0));
