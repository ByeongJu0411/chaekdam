'use client'
import { useQuery } from '@tanstack/react-query'
import { getMySales } from '@/lib/api/users'
import { SaleBookCard } from './SaleBookCard'
import { BookCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export function SaleList() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-sales'],
    queryFn: getMySales,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <BookCardSkeleton key={i} />)}
      </div>
    )
  }

  if (!data?.data.length) {
    return (
      <EmptyState
        message="판매 중인 도서가 없습니다."
        action={<Link href={ROUTES.BOOK_NEW} className="text-blue-600 hover:underline">도서 등록하기</Link>}
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {data.data.map((book) => <SaleBookCard key={book._id} book={book} />)}
    </div>
  )
}
