import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { IpcMainInvokeEvent } from 'electron';

import type { CategoryList } from '../src/types';

export const handleCategoryList = async (
  _event: IpcMainInvokeEvent,
  jsonPath: string,
): Promise<CategoryList> => {
  console.log('call categoryList', jsonPath);
  let text: string;
  if (process.env.VITE_DEV_SERVER_URL) {
    text = await readFile(path.join(process.env.APP_ROOT, jsonPath), 'utf8');
  } else {
    const response = await fetch(
      `https://raw.githubusercontent.com/joyfuI/soop-scope/refs/heads/main${jsonPath}`,
    );
    text = await response.text();
  }
  const json = JSON.parse(text);
  console.log('category', json);
  return json;
};
