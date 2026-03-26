import { useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useTableStore } from "@/store/tableStore";
import { queryClient } from "@/lib/queryClient";
import { ProductTableRow } from "./ProductTableRow";
import { TableSkeleton } from "./TableSkeleton";
import { Pagination } from "./Pagination";
import { AddProductModal } from "./AddProductModal";
import { SortDrawer } from "./SortDrawer";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const HEADER_CELL_CLASS =
  "font-cairo p-4 text-left text-base font-bold tracking-wide text-[#B2B4BD]";

const STATUS_ROW_CLASS = "py-12 text-center text-sm";

const TABLE_CHECKBOX_CLASS =
  "h-[22px] w-[22px] cursor-pointer rounded-[4px] border border-[#b2b3b9]";

const REFRESH_BUTTON_BASE_CLASS =
  "flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-border bg-white text-muted";

const REFRESH_BUTTON_INTERACTION_CLASS =
  "transition-colors hover:bg-[#F1F3F5] hover:text-[#495057] focus:outline-none focus:ring-2 focus:ring-primary/40";

const TABLE_COLUMNS = [
  { label: "Наименование", className: "w-[44%] text-left" },
  { label: "Вендор", className: "w-[18%] text-center" },
  { label: "Артикул", className: "w-[18%] text-center" },
  { label: "Оценка", className: "w-[10%] text-center" },
  { label: "Цена, ₽", className: "w-[12%] text-center" },
] as const;

export function ProductsTable() {
  const { products, total, isLoading, isFetching, isError } = useProducts();
  const { page, pageSize, localProducts, setPage } = useTableStore();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Merge local products (at the top) with API products
  const allProducts: Product[] = [...localProducts, ...products];

  const handleSelect = useCallback((id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(allProducts.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const allSelected =
    allProducts.length > 0 && selectedIds.size === allProducts.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const handleRefresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  // Adjust total to account for local products
  const adjustedTotal = total + localProducts.length;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeleton rows={8} />;

    if (isError) {
      return (
        <tr>
          <td colSpan={7} className={cn(STATUS_ROW_CLASS, "text-danger")}>
            Ошибка загрузки данных. Попробуйте обновить страницу.
          </td>
        </tr>
      );
    }

    if (allProducts.length === 0) {
      return (
        <tr>
          <td colSpan={7} className={cn(STATUS_ROW_CLASS, "text-muted")}>
            Товары не найдены
          </td>
        </tr>
      );
    }

    return allProducts.map((product) => (
      <ProductTableRow
        key={product.id}
        product={product}
        isSelected={selectedIds.has(product.id)}
        onSelect={handleSelect}
      />
    ));
  };

  return (
    <div className="overflow-hidden bg-white flex flex-col gap-10">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="font-cairo text-xl font-bold text-[#2D2F35]">
          Все позиции
        </h2>
        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
            className={cn(
              REFRESH_BUTTON_BASE_CLASS,
              REFRESH_BUTTON_INTERACTION_CLASS,
              isFetching && "pointer-events-none",
            )}
            aria-label="Обновить таблицу"
            disabled={isFetching}
          >
            <RefreshCw
              className={cn("h-4 w-4", isFetching && "animate-spin")}
            />
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#e2e2e2] border-l-4 border-l-transparent">
              <th className="w-12 py-4 pl-5 pr-2">
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked === true)
                  }
                  className={TABLE_CHECKBOX_CLASS}
                  aria-label="Выбрать все"
                />
              </th>
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.label}
                  className={cn(HEADER_CELL_CLASS, column.className)}
                >
                  {column.label}
                </th>
              ))}
              <th className="w-[120px] py-4 pr-4" />
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && (
        <Pagination
          page={page}
          total={adjustedTotal}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
