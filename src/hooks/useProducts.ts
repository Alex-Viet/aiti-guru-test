import { useQuery } from '@tanstack/react-query'
import { getProducts, searchProducts } from '@/api/products'
import { useTableStore } from '@/store/tableStore'

const PAGE_SIZE = 20

export function useProducts() {
  const { page, search, sortBy, order } = useTableStore()

  const skip = (page - 1) * PAGE_SIZE

  const query = useQuery({
    queryKey: ['products', { page, search, sortBy, order }],
    queryFn: () => {
      if (search.trim()) {
        return searchProducts({ q: search.trim(), limit: PAGE_SIZE, skip })
      }
      return getProducts({
        limit: PAGE_SIZE,
        skip,
        ...(sortBy ? { sortBy, order } : {}),
      })
    },
    placeholderData: (prev) => prev,
  })

  return {
    products: query.data?.products ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
