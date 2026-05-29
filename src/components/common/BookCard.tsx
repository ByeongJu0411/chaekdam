'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'
import { StatusBadge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils/formatPrice'
import { formatRelativeDate } from '@/lib/utils/formatDate'
import { ROUTES } from '@/lib/constants/routes'
import { BOOK_CATEGORIES } from '@/lib/constants/bookCategories'
import { toggleWishlist } from '@/lib/api/users'
import type { Book } from '@/types/book'

export function BookCard({ book, isWishlisted = false }: { book: Book; isWishlisted?: boolean }) {
  const [liked, setLiked] = useState(isWishlisted)
  const queryClient = useQueryClient()
  const categoryLabel = BOOK_CATEGORIES.find((c) => c.value === book.category)?.label ?? book.category

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked((prev) => !prev)
    try {
      await toggleWishlist(book._id)
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    } catch {
      setLiked((prev) => !prev)
    }
  }

  return (
    <Link
      href={ROUTES.BOOK_DETAIL(book._id)}
      className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300/80 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-50 w-full overflow-hidden bg-slate-100">
        {book.images[0] ? (
          <Image
            src={book.images[0]}
            alt={book.title}
            fill
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl">📖</span>
          </div>
        )}
        <div className="absolute right-2.5 top-2.5">
          <StatusBadge status={book.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">{categoryLabel}</span>
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-slate-400">{book.author}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-black text-slate-900">{formatPrice(book.price)}</span>
          <button
            onClick={handleWishlist}
            aria-label={liked ? '찜 해제' : '찜하기'}
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={liked ? '#ef4444' : 'none'}
              stroke={liked ? '#ef4444' : '#94a3b8'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-150"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}
