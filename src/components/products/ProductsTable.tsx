import { useState, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useTableStore } from '@/store/tableStore'
import { queryClient } from '@/lib/queryClient'
import { ProductTableRow } from './ProductTableRow'
import { TableSkeleton } from './TableSkeleton'
import { Pagination } from './Pagination'
import { AddProductModal } from './AddProductModal'
import { SortDrawer } from './SortDrawer'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductsTable() {
  const { products, total, isLoading, isFetching, isError } = useProducts()
  const { page, pageSize, localProducts, setPage } = useTableStore()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  // Merge local products (at the top) with API products
  const allProducts: Product[] = [...localProducts, ...products]

  const handleSelect = useCallback((id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(allProducts.map((p) => p.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const allSelected = allProducts.length > 0 && selectedIds.size === allProducts.length
  const someSelected = selectedIds.size > 0 && !allSelected

  const handleRefresh = () => {
    void queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  // Adjust total to account for local products
  const adjustedTotal = total + localProducts.length

  return (
    <div className="rounded-xl bg-white shadow-card overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-[#212529]">Все позиции</h2>
        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-muted',
              'transition-colors hover:bg-[#F1F3F5] hover:text-[#495057]',
              'focus:outline-none focus:ring-2 focus:ring-primary/40',
              isFetching && 'pointer-events-none',
            )}
            aria-label="Обновить таблицу"
            disabled={isFetching}
          >
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
          </button>

          {/* Sort */}
          <SortDrawer />

          {/* Add product */}
          <AddProductModal />
        </div>
      </div>

      {/* Loading bar */}
      {isFetching && !isLoading && (
        <div className="h-0.5 w-full overflow-hidden bg-[#E9ECEF]">
          <div className="h-full w-1/3 animate-[loading_1s_ease-in-out_infinite] bg-primary" />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-[#F8F9FA]">
              <th className="w-10 py-3 pl-4 pr-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 rounded border-[#CED4DA] accent-primary cursor-pointer"
                  aria-label="Выбрать все"
                />
              </th>
              <th className="w-12 py-3 pr-3" />
              <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Наименование
              </th>
              <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Вендор
              </th>
              <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Артикул
              </th>
              <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Оценка
              </th>
              <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                Цена, ₽
              </th>
              <th className="py-3 pr-4" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton rows={8} />
            ) : isError ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-danger">
                  Ошибка загрузки данных. Попробуйте обновить страницу.
                </td>
              </tr>
            ) : allProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-muted">
                  Товары не найдены
                </td>
              </tr>
            ) : (
              allProducts.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  isSelected={selectedIds.has(product.id)}
                  onSelect={handleSelect}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && (
        <div className="border-t border-border">
          <Pagination
            page={page}
            total={adjustedTotal}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
