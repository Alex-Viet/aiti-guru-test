import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";
import type { Product } from "@/types";
import {
  TABLE_CELL_BASE_CLASS,
  TABLE_CHECKBOX_CLASS,
  TABLE_ROW_BORDER_CLASS,
} from "./productTableClasses";

const ROW_BASE_CLASS = cn(TABLE_ROW_BORDER_CLASS, "group transition-colors");
const ROW_SELECTED_CLASS = "border-l-4 border-l-secondary";
const ROW_DEFAULT_CLASS =
  "border-l-4 border-l-transparent hover:bg-table-hover";

const CELL_BASE_CLASS = TABLE_CELL_BASE_CLASS;
const CELL_NOWRAP_CLASS = `${CELL_BASE_CLASS} whitespace-nowrap`;
const CELL_NOWRAP_CENTER_CLASS = `${CELL_NOWRAP_CLASS} text-center`;
const NUMERIC_TEXT_CLASS = "font-open-sans text-base text-[#000000]";
const ACTION_BUTTON_FOCUS_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-primary/40";

const PRIMARY_ACTION_BUTTON_CLASS =
  "flex h-[27px] w-[52px] items-center justify-center rounded-3xl bg-primary text-white transition-colors hover:bg-primary-hover";
const SECONDARY_ACTION_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-[#D5D8E0] text-table-icon transition-colors hover:bg-table-surface";

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
      <td className="w-12 py-4 pl-5 pr-2">
        <Checkbox
          checked={isSelected}
          className={TABLE_CHECKBOX_CLASS}
          onCheckedChange={(checked) => onSelect(product.id, checked === true)}
          aria-label={`Выбрать ${product.title}`}
        />
      </td>

      {/* Title + Category */}
      <td className={CELL_BASE_CLASS}>
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-table-surface">
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
          <div className="min-w-0">
            <p className="font-cairo truncate text-base font-bold text-[#161919] max-w-[220px]">
              {product.title}
            </p>
            <p className="font-cairo truncate text-sm text-table-heading capitalize max-w-[220px]">
              {product.category?.replace(/-/g, " ")}
            </p>
          </div>
        </div>
      </td>

      {/* Vendor (brand) */}
      <td className={CELL_NOWRAP_CENTER_CLASS}>
        <span className="font-open-sans text-base font-bold text-[#212529]">
          {product.brand || "—"}
        </span>
      </td>

      {/* SKU */}
      <td className={CELL_NOWRAP_CENTER_CLASS}>
        <span className={NUMERIC_TEXT_CLASS}>{product.sku}</span>
      </td>

      {/* Rating */}
      <td className={CELL_NOWRAP_CENTER_CLASS}>
        <span
          className={cn(
            NUMERIC_TEXT_CLASS,
            isLowRating ? "text-danger" : "text-table-text",
          )}
        >
          {product.rating.toFixed(1)}/5
        </span>
      </td>

      {/* Price */}
      <td className={CELL_NOWRAP_CENTER_CLASS}>
        {(() => {
          const [integerPart, decimalPart = "00"] = formatPrice(
            product.price,
          ).split(",");
          return (
            <span className="font-roboto text-base leading-[110%] text-[#222]">
              {integerPart}
              <span className="text-[#999]">, {decimalPart}</span>
            </span>
          );
        })()}
      </td>

      {/* Actions */}
      <td className="p-4 pl-12 whitespace-nowrap">
        <div className="flex items-center gap-8">
          <button
            type="button"
            className={cn(
              PRIMARY_ACTION_BUTTON_CLASS,
              ACTION_BUTTON_FOCUS_CLASS,
            )}
            aria-label="Добавить"
          >
            <Plus className="h-6 w-6" />
          </button>
          <button
            type="button"
            className={cn(
              SECONDARY_ACTION_BUTTON_CLASS,
              ACTION_BUTTON_FOCUS_CLASS,
            )}
            aria-label="Действия"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
