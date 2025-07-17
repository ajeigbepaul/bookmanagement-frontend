import { create } from "zustand";

interface BookFilter {
  search: string;
  genre: string;
  page: number;
  limit: number;
}

interface BookStore {
  filter: BookFilter;
  setFilter: (filter: Partial<BookFilter>) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  filter: { search: "", genre: "", page: 1, limit: 10 },
  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),
}));
