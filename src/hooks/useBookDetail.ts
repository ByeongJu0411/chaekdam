'use client'
import { useQuery } from '@tanstack/react-query'
import { getBook } from '@/lib/api/books'

export function useBookDetail(id: string) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id),
    staleTime: 60 * 1000,
    enabled: !!id,
  })
}
