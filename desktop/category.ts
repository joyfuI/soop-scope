import { readFile } from 'node:fs/promises';
import { join } from '@std/path';

import type { CategoryList } from '../src/types.ts';

export const handleCategoryList = async (
  jsonPath: string,
): Promise<CategoryList> => {
  console.log('call categoryList', jsonPath);
  let text: string;
  if (Deno.args.includes('--dev')) {
    text = await readFile(join('.', jsonPath), 'utf8');
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
