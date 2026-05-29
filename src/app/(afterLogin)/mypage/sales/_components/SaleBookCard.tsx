'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { updateBook } from '@/lib/api/books'
import { ROUTES } from '@/lib/constants/routes'
import { BOOK_CATEGORIES } from '@/lib/constants/bookCategories'
import { formatPrice } from '@/lib/utils/formatPrice'
import { formatRelativeDate } from '@/lib/utils/formatDate'
import type { Book, BookStatus } from '@/types/book'
import type { PaginatedResponse } from '@/types/api'

const STATUS_OPTIONS: { value: BookStatus; label: string }[] = [
  { value: 'selling', label: '판매중' },
  { value: 'reserved', label: '예약중' },
  { value: 'sold', label: '판매완료' },
]

const activeStyle: Record<BookStatus, string> = {
  selling: 'bg-blue-500 text-white',
  reserved: 'bg-amber-500 text-white',
  sold: 'bg-slate-400 text-white',
}

export function SaleBookCard({ book }: { book: Book }) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (status: BookStatus) => updateBook(book._id, { status }),
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ['my-sales'] })
      const previous = queryClient.getQueryData<PaginatedResponse<Book>>(['my-sales'])
      queryClient.setQueryData<PaginatedResponse<Book>>(['my-sales'], (old) => {
        if (!old) return old
        return { ...old, data: old.data.map((b) => b._id === book._id ? { ...b, status: newStatus } : b) }
      })
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(['my-sales'], context.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-sales'] })
    },
  })

  const categoryLabel = BOOK_CATEGORIES.find((c) => c.value === book.category)?.label ?? book.category

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <Link href={ROUTES.BOOK_DETAIL(book._id)} className="group flex flex-col">
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          {book.images[0] ? (
            <Image
              src={book.images[0]}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl">📖</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 p-3.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">{categoryLabel}</span>
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-slate-400">{book.author}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-black text-slate-900">{formatPrice(book.price)}</span>
            <span className="text-[10px] text-slate-300">{formatRelativeDate(book.createdAt)}</span>
          </div>
        </div>
      </Link>

      <div className="border-t border-slate-100 p-2.5 flex gap-1.5">
        {STATUS_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => book.status !== value && mutate(value)}
            disabled={isPending}
            className={`flex-1 rounded-lg py-1.5 text-[11px] font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
              book.status === value
                ? activeStyle[value]
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
