import { create } from "zustand";
import type { Product, SortField, SortOrder } from "@/types";
import { PAGE_SIZE } from "@/config/constants";

interface TableState {
  page: number;
  search: string;
  sortBy: SortField | null;
  order: SortOrder;
  localProducts: Product[];
  pageSize: number;
  // Actions
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setSort: (sortBy: SortField | null, order: SortOrder) => void;
  addLocalProduct: (product: Product) => void;
  reset: () => void;
}

const initialState = {
  page: 1,
  search: "",
  sortBy: null as SortField | null,
  order: "asc" as SortOrder,
  localProducts: [] as Product[],
  pageSize: PAGE_SIZE,
};

export const useTableStore = create<TableState>()((set) => ({
  ...initialState,

  setPage: (page) => set({ page }),

  setSearch: (search) => set({ search, page: 1 }),

  setSort: (sortBy, order) => set({ sortBy, order, page: 1 }),

  addLocalProduct: (product) =>
    set((state) => ({
      localProducts: [product, ...state.localProducts],
    })),

  reset: () => set(initialState),
}));
