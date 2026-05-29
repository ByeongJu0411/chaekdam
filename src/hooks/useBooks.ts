'use client'
import { useQuery } from '@tanstack/react-query'
import { getBooks } from '@/lib/api/books'
import type { BookFilter } from '@/types/book'

export function useBooks(filter?: BookFilter) {
  return useQuery({
    queryKey: ['books', filter],
    queryFn: () => getBooks(filter),
    staleTime: 60 * 1000,
  })
}
