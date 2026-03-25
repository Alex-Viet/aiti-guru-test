import { useQuery } from '@tanstack/react-query'
import { getProducts, searchProducts } from '@/api/products'
import { useTableStore } from '@/store/tableStore'

const PAGE_SIZE = 20

function sortByBrand(items: Awaited<ReturnType<typeof getProducts>>['products'], order: 'asc' | 'desc') {
  const direction = order === 'asc' ? 1 : -1

  return [...items].sort((a, b) => {
    const aBrand = (a.brand ?? '').trim()
    const bBrand = (b.brand ?? '').trim()

    // Always place empty brands at the end to avoid visual jumps
    const aEmpty = aBrand.length === 0
    const bEmpty = bBrand.length === 0
    if (aEmpty && !bEmpty) return 1
    if (!aEmpty && bEmpty) return -1

    const brandCompare = aBrand.localeCompare(bBrand, 'en', { sensitivity: 'base' })
    if (brandCompare !== 0) return brandCompare * direction

    // Stable tie-breaker
    return a.id - b.id
  })
}

export function useProducts() {
  const { page, search, sortBy, order } = useTableStore()
  const useClientBrandSort = sortBy === 'brand'

  const skip = (page - 1) * PAGE_SIZE

  const query = useQuery({
    // For brand sorting, avoid page in query key because we fetch all and slice locally.
    queryKey: ['products', { page: useClientBrandSort ? 1 : page, search, sortBy, order }],
    queryFn: () => {
      if (search.trim()) {
        if (useClientBrandSort) {
          return searchProducts({ q: search.trim(), limit: 0, skip: 0 })
        }
        return searchProducts({ q: search.trim(), limit: PAGE_SIZE, skip })
      }

      if (useClientBrandSort) {
        return getProducts({
          limit: 0,
          skip: 0,
        })
      }

      return getProducts({
        limit: PAGE_SIZE,
        skip,
        ...(sortBy ? { sortBy, order } : {}),
      })
    },
    placeholderData: (prev) => prev,
  })

  const rawProducts = query.data?.products ?? []
  const products = useClientBrandSort
    ? sortByBrand(rawProducts, order).slice(skip, skip + PAGE_SIZE)
    : rawProducts

  return {
    products,
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
