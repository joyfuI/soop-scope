import type { IpcMainInvokeEvent } from 'electron';

import type { CategoryList } from '../src/types';

export const handleCategoryList = async (
  _event: IpcMainInvokeEvent,
  path: string,
): Promise<CategoryList> => {
  const response = await fetch(
    `https://raw.githubusercontent.com/joyfuI/soop-scope/refs/heads/main${path}`,
  );
  const text = await response.text();
  const json = JSON.parse(text);
  console.log('category', json);
  return json;
};
