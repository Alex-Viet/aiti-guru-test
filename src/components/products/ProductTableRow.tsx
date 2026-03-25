import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";
import type { Product } from "@/types";

const ROW_BASE_CLASS = "group border-b border-border transition-colors";
const ROW_SELECTED_CLASS = "border-l-4 border-l-primary bg-primary-50";
const ROW_DEFAULT_CLASS = "border-l-4 border-l-transparent hover:bg-[#FAFAFA]";

const CELL_BASE_CLASS = "py-3 pr-4";
const CELL_NOWRAP_CLASS = `${CELL_BASE_CLASS} whitespace-nowrap`;
const NUMERIC_TEXT_CLASS = "font-roboto text-sm text-[#495057]";
const ACTION_BUTTON_FOCUS_CLASS = "focus:outline-none focus:ring-2 focus:ring-primary/40";

const PRIMARY_ACTION_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary-hover";
const SECONDARY_ACTION_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-[#F1F3F5]";

interface ProductTableRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: number, checked: boolean) => void;
}

export function ProductTableRow({
  product,
  isSelected,
  onSelect,
}: ProductTableRowProps) {
  const [imgError, setImgError] = useState(false);

  const isLowRating = product.rating < 3.5;

  return (
    <tr
      className={cn(
        ROW_BASE_CLASS,
        isSelected ? ROW_SELECTED_CLASS : ROW_DEFAULT_CLASS,
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
      <td className={CELL_BASE_CLASS}>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#212529] max-w-[200px]">
            {product.title}
          </p>
          <p className="truncate text-xs text-muted capitalize max-w-[200px]">
            {product.category?.replace(/-/g, " ")}
          </p>
        </div>
      </td>

      {/* Vendor (brand) */}
      <td className={CELL_NOWRAP_CLASS}>
        <span className="text-sm font-semibold text-[#212529]">
          {product.brand || "—"}
        </span>
      </td>

      {/* SKU */}
      <td className={CELL_NOWRAP_CLASS}>
        <span className={NUMERIC_TEXT_CLASS}>{product.sku}</span>
      </td>

      {/* Rating */}
      <td className={CELL_NOWRAP_CLASS}>
        <span
          className={cn(
            "font-roboto text-sm font-medium tracking-tight",
            isLowRating ? "text-danger" : "text-[#495057]",
          )}
        >
          {product.rating.toFixed(1)}/5
        </span>
      </td>

      {/* Price */}
      <td className={CELL_NOWRAP_CLASS}>
        <span className={NUMERIC_TEXT_CLASS}>{formatPrice(product.price)}</span>
      </td>

      {/* Actions */}
      <td className="py-3 pr-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(PRIMARY_ACTION_BUTTON_CLASS, ACTION_BUTTON_FOCUS_CLASS)}
            aria-label="Добавить"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(SECONDARY_ACTION_BUTTON_CLASS, ACTION_BUTTON_FOCUS_CLASS)}
            aria-label="Действия"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
