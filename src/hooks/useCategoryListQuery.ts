import { useQuery } from '@tanstack/react-query';

const useCategoryListQuery = (path: string) => {
  return useQuery({
    queryKey: ['category'],
    queryFn: () => bindings.categoryList(path),
    staleTime: Infinity,
  });
};

export default useCategoryListQuery;
