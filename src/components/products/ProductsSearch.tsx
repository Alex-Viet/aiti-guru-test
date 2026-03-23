import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useTableStore } from '@/store/tableStore'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'

export function ProductsSearch() {
  const { search, setSearch } = useTableStore()
  const [localValue, setLocalValue] = useState(search)
  const debouncedValue = useDebounce(localValue, 400)

  // Sync debounced value into store
  useEffect(() => {
    setSearch(debouncedValue)
  }, [debouncedValue, setSearch])

  // Sync store value back (e.g., after external reset)
  useEffect(() => {
    setLocalValue(search)
  }, [search])

  return (
    <div className="relative flex w-full max-w-[480px] items-center">
      <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Найти"
        className={cn(
          'h-10 w-full rounded-lg border border-border bg-white pl-9 pr-9 text-sm text-[#212529]',
          'placeholder:text-muted transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary',
        )}
      />
      {localValue && (
        <button
          type="button"
          onClick={() => setLocalValue('')}
          className="absolute right-3 text-muted transition-colors hover:text-[#495057]"
          aria-label="Очистить поиск"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
