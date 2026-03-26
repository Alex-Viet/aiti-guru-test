import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const start = Math.min((page - 1) * pageSize + 1, total);
  const end = Math.min(page * pageSize, total);

  if (total === 0) return null;

  // Build visible page numbers with ellipsis
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (page > 3) pages.push("...");

    const rangeStart = Math.max(2, page - 1);
    const rangeEnd = Math.min(totalPages - 1, page + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between">
      <span className="font-roboto text-lg text-[#969b9f]">
        Показано{" "}
        <span className="text-[#333]">
          {start}–{end}
        </span>{" "}
        из <span className="text-[#333]">{total}</span>
      </span>

      <div className="flex items-center gap-4">
        {/* Prev */}
        <PageBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Предыдущая страница"
          className="min-w-0 border-transparent bg-transparent px-1 text-[#8D93A2] hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </PageBtn>

        {/* Pages */}
        <div className="flex items-center gap-2">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-1 text-sm text-[#A8ADB9]"
              >
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
        </div>

        {/* Next */}
        <PageBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Следующая страница"
          className="min-w-0 border-transparent bg-transparent px-1 text-[#8D93A2] hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </PageBtn>
      </div>
    </div>
  );
}

interface PageBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function PageBtn({
  isActive,
  className,
  children,
  disabled,
  ...props
}: PageBtnProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex h-[30px] min-w-[30px] items-center justify-center rounded-[4px] px-2 font-cairo text-sm transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        "disabled:pointer-events-none disabled:opacity-35",
        isActive
          ? "border border-[#6C79FF] bg-[#797fea] font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.24)]"
          : "border border-[#ECEEF2] bg-[#FAFBFD] text-[#A8ADB9] hover:bg-[#F1F3F5]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
