import { useQuery } from '@tanstack/react-query';

const useCategoryListQuery = (path: string) => {
  return useQuery({
    queryKey: ['category'],
    queryFn: () => window.electron.categoryList(path),
    staleTime: Infinity,
  });
};

export default useCategoryListQuery;
