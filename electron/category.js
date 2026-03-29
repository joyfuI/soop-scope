export const handleCategoryList = async (_event, path) => {
  console.log('call getCategoryList');
  const response = await fetch(
    `https://raw.githubusercontent.com/joyfuI/soop-scope/refs/heads/main${path}`,
  );
  const text = await response.text();
  const json = JSON.parse(text);
  console.log('category', json);
  return json;
};
