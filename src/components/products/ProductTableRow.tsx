import { useState } from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { Checkbox } from '@/components/ui/Checkbox'
import type { Product } from '@/types'

interface ProductTableRowProps {
  product: Product
  isSelected: boolean
  onSelect: (id: number, checked: boolean) => void
}

export function ProductTableRow({ product, isSelected, onSelect }: ProductTableRowProps) {
  const [imgError, setImgError] = useState(false)

  const isLowRating = product.rating < 3.5

  return (
    <tr
      className={cn(
        'group border-b border-border transition-colors',
        isSelected
          ? 'bg-primary-50 border-l-4 border-l-primary'
          : 'border-l-4 border-l-transparent hover:bg-[#FAFAFA]',
      )}
    >
      {/* Checkbox */}
      <td className="w-10 py-3 pl-4 pr-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(product.id, checked === true)}
          aria-label={`Выбрать ${product.title}`}
        />
      </td>

      {/* Thumbnail */}
      <td className="w-12 py-3 pr-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F1F3F5]">
          {!imgError && product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted select-none">
              —
            </div>
          )}
        </div>
      </td>

      {/* Title + Category */}
      <td className="py-3 pr-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#212529] max-w-[200px]">
            {product.title}
          </p>
          <p className="truncate text-xs text-muted capitalize max-w-[200px]">
            {product.category?.replace(/-/g, ' ')}
          </p>
        </div>
      </td>

      {/* Vendor (brand) */}
      <td className="py-3 pr-4 whitespace-nowrap">
        <span className="text-sm font-semibold text-[#212529]">
          {product.brand || '—'}
        </span>
      </td>

      {/* SKU */}
      <td className="py-3 pr-4 whitespace-nowrap">
        <span className="text-sm text-[#495057]">{product.sku}</span>
      </td>

      {/* Rating */}
      <td className="py-3 pr-4 whitespace-nowrap">
        <span
          className={cn(
            'text-sm font-medium',
            isLowRating ? 'text-danger' : 'text-[#495057]',
          )}
        >
          {product.rating.toFixed(1)}/5
        </span>
      </td>

      {/* Price */}
      <td className="py-3 pr-4 whitespace-nowrap">
        <span className="text-sm text-[#495057]">
          {formatPrice(product.price)}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3 pr-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Добавить"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-[#F1F3F5] focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Действия"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
