import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, total, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  const start = Math.min((page - 1) * pageSize + 1, total)
  const end = Math.min(page * pageSize, total)

  if (total === 0) return null

  // Build visible page numbers with ellipsis
  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | '...')[] = [1]
    if (page > 3) pages.push('...')

    const rangeStart = Math.max(2, page - 1)
    const rangeEnd = Math.min(totalPages - 1, page + 1)

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('...')
    pages.push(totalPages)

    return pages
  }

  const pages = getPages()

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-muted">
        Показано{' '}
        <span className="font-medium text-[#495057]">
          {start}–{end}
        </span>{' '}
        из{' '}
        <span className="font-medium text-[#495057]">{total}</span>
      </span>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <PageBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="h-4 w-4" />
        </PageBtn>

        {/* Pages */}
        {pages.map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-sm text-muted">
              ...
            </span>
          ) : (
            <PageBtn
              key={p}
              onClick={() => onPageChange(p)}
              isActive={p === page}
              aria-label={`Страница ${p}`}
            >
              {p}
            </PageBtn>
          ),
        )}

        {/* Next */}
        <PageBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Следующая страница"
        >
          <ChevronRight className="h-4 w-4" />
        </PageBtn>
      </div>
    </div>
  )
}

interface PageBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

function PageBtn({ isActive, className, children, disabled, ...props }: PageBtnProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary/40',
        'disabled:pointer-events-none disabled:opacity-40',
        isActive
          ? 'bg-primary font-semibold text-white'
          : 'text-[#495057] hover:bg-[#F1F3F5]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
