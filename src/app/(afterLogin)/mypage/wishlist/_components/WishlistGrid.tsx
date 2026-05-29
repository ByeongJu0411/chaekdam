'use client'
import { useQuery } from '@tanstack/react-query'
import { getWishlist } from '@/lib/api/users'
import { BookCard } from '@/components/common/BookCard'
import { BookCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/common/EmptyState'

export function WishlistGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <BookCardSkeleton key={i} />)}
      </div>
    )
  }

  if (!data?.data.length) {
    return <EmptyState message="찜한 책이 없습니다." description="마음에 드는 책을 찜해 보세요." />
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {data.data.map((book) => (
        <BookCard key={book._id} book={book} isWishlisted={true} />
      ))}
    </div>
  )
}
