import { create } from 'zustand'
import type { BookFilter } from '@/types/book'

interface BookFilterState {
  filter: BookFilter
  setFilter: (filter: Partial<BookFilter>) => void
  resetFilter: () => void
}

const defaultFilter: BookFilter = {
  sort: 'latest',
  page: 1,
}

export const useBookFilterStore = create<BookFilterState>((set) => ({
  filter: defaultFilter,
  setFilter: (newFilter) =>
    set((state) => ({ filter: { ...state.filter, ...newFilter, page: 1 } })),
  resetFilter: () => set({ filter: defaultFilter }),
}))
