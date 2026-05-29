import { cn } from '@/lib/utils/cn'
import type { BookStatus } from '@/types/book'

const statusConfig: Record<BookStatus, { label: string; className: string }> = {
  selling: { label: '판매중', className: 'bg-green-100 text-green-800' },
  reserved: { label: '예약중', className: 'bg-yellow-100 text-yellow-800' },
  sold: { label: '판매완료', className: 'bg-gray-100 text-gray-600' },
}

export function StatusBadge({ status }: { status: BookStatus }) {
  const config = statusConfig[status]
  return (
    <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', config.className)}>
      {config.label}
    </span>
  )
}
