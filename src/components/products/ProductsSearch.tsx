import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTableStore } from "@/store/tableStore";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

export function ProductsSearch() {
  const { search, setSearch } = useTableStore();
  const [localValue, setLocalValue] = useState(search);
  const debouncedValue = useDebounce(localValue, 400);

  // Sync debounced value into store
  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  // Sync store value back (e.g., after external reset)
  useEffect(() => {
    setLocalValue(search);
  }, [search]);

  return (
    <div className="relative flex items-center w-[1023px]">
      <div className="absolute left-5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Найти"
        className={cn(
          "h-10 w-full max-w-[1023px] rounded-lg border border-border bg-[#F3F3F3] pl-14 pr-9 text-sm text-[#212529]",
          "placeholder:text-[#999999] transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
        )}
      />
      {localValue && (
        <button
          type="button"
          onClick={() => setLocalValue("")}
          className="absolute right-3 text-muted transition-colors hover:text-[#495057]"
          aria-label="Очистить поиск"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
