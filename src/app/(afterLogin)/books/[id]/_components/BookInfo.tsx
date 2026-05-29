'use client'
import { useBookDetail } from '@/hooks/useBookDetail'
import { StatusBadge } from '@/components/ui/Badge'
import { BookCardSkeleton } from '@/components/ui/Skeleton'
import { formatPrice } from '@/lib/utils/formatPrice'
import { formatDate } from '@/lib/utils/formatDate'

export function BookInfo({ id }: { id: string }) {
  const { data: book, isLoading } = useBookDetail(id)

  if (isLoading) return <BookCardSkeleton />
  if (!book) return <p className="text-gray-500">도서 정보를 불러올 수 없습니다.</p>

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg bg-gray-100 aspect-[4/3]">
        {book.images[0] && (
          <img src={book.images[0]} alt={book.title} className="h-full w-full object-cover" />
        )}
      </div>
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="mt-1 text-gray-500">{book.author} · {book.publisher}</p>
          </div>
          <StatusBadge status={book.status} />
        </div>
        <p className="mt-4 text-3xl font-bold text-blue-600">{formatPrice(book.price)}</p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{book.description}</p>
        <p className="mt-4 text-xs text-gray-400">등록일 {formatDate(book.createdAt)}</p>
      </div>
    </div>
  )
}
