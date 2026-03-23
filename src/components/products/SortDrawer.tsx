import { useState, useRef, useEffect } from 'react'
import { AlignLeft, ChevronUp, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTableStore } from '@/store/tableStore'
import type { SortField, SortOrder } from '@/types'

const SORT_FIELDS: { value: SortField; label: string }[] = [
  { value: 'title', label: 'Наименование' },
  { value: 'brand', label: 'Вендор' },
  { value: 'price', label: 'Цена' },
  { value: 'rating', label: 'Оценка' },
]

const ORDER_OPTIONS: { value: SortOrder; label: string; Icon: typeof ChevronUp }[] = [
  { value: 'asc', label: 'По возрастанию', Icon: ChevronUp },
  { value: 'desc', label: 'По убыванию', Icon: ChevronDown },
]

export function SortDrawer() {
  const [open, setOpen] = useState(false)
  const { sortBy, order, setSort } = useTableStore()
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleFieldSelect = (field: SortField) => {
    if (sortBy === field) {
      // Toggle order
      setSort(field, order === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(field, 'asc')
    }
  }

  const handleOrderSelect = (newOrder: SortOrder) => {
    setSort(sortBy, newOrder)
  }

  const handleReset = () => {
    setSort(null, 'asc')
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white transition-colors',
          'hover:bg-[#F1F3F5] focus:outline-none focus:ring-2 focus:ring-primary/40',
          open && 'bg-primary-50 border-primary',
          sortBy && 'border-primary bg-primary-50',
        )}
        aria-label="Сортировка"
        aria-expanded={open}
      >
        <AlignLeft className={cn('h-4 w-4', sortBy ? 'text-primary' : 'text-muted')} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-40 w-60 rounded-xl border border-border bg-white py-2 shadow-card-lg">
          {/* Sort by field */}
          <div className="px-3 pb-1 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Сортировать по
            </p>
          </div>
          {SORT_FIELDS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleFieldSelect(value)}
              className="flex w-full items-center justify-between px-4 py-2 text-sm text-[#495057] transition-colors hover:bg-[#F8F9FA]"
            >
              <span className={cn(sortBy === value && 'font-semibold text-primary')}>
                {label}
              </span>
              {sortBy === value && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </button>
          ))}

          {/* Divider */}
          <div className="my-2 h-px bg-border" />

          {/* Order */}
          <div className="px-3 pb-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Направление
            </p>
          </div>
          {ORDER_OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleOrderSelect(value)}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[#495057] transition-colors hover:bg-[#F8F9FA]"
            >
              <Icon className="h-3.5 w-3.5" />
              <span className={cn(order === value && 'font-semibold text-primary')}>
                {label}
              </span>
              {order === value && (
                <Check className="ml-auto h-3.5 w-3.5 text-primary" />
              )}
            </button>
          ))}

          {/* Reset */}
          {sortBy && (
            <>
              <div className="my-2 h-px bg-border" />
              <button
                type="button"
                onClick={handleReset}
                className="w-full px-4 py-2 text-left text-sm text-danger transition-colors hover:bg-red-50"
              >
                Сбросить сортировку
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
