'use client'
import { useQuery } from '@tanstack/react-query'
import { BookCard } from '@/components/common/BookCard'
import { BookCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { Pagination } from '@/components/ui/Pagination'
import { useBooks } from '@/hooks/useBooks'
import { useBookFilterStore } from '@/store/bookFilterStore'
import { getWishlist } from '@/lib/api/users'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export function BookGrid() {
  const { filter, setFilter } = useBookFilterStore()
  const { data, isLoading } = useBooks(filter)
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    staleTime: 60 * 1000,
  })

  const wishlistedIds = new Set(wishlistData?.data.map((b) => b._id) ?? [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!data?.data.length) {
    return (
      <EmptyState
        message="등록된 도서가 없습니다."
        description="첫 번째 도서를 등록해 보세요."
        action={<Link href={ROUTES.BOOK_NEW} className="text-blue-600 hover:underline">도서 등록하기</Link>}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.data.map((book) => (
          <BookCard key={book._id} book={book} isWishlisted={wishlistedIds.has(book._id)} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setFilter({ page })}
        />
      </div>
    </div>
  )
}
