'use client'
import { useState } from 'react'
import { useBookDetail } from '@/hooks/useBookDetail'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'
import { createOrGetChatRoom } from '@/lib/api/chat'
import { useMe } from '@/hooks/useAuth'

export function SellerInfo({ id }: { id: string }) {
  const { data: book } = useBookDetail(id)
  const { data: me } = useMe()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (!book) return null

  const isSeller = me?._id === book.sellerId

  const handleChat = async () => {
    setLoading(true)
    try {
      const { roomId } = await createOrGetChatRoom(book._id, book.sellerId)
      router.push(ROUTES.CHAT_ROOM(roomId))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4 space-y-4">
      <div>
        <p className="text-xs text-gray-400">판매자</p>
        <p className="mt-1 font-medium">{book.sellerName}</p>
      </div>

      {isSeller ? (
        // 판매자 본인: 수정 버튼만 표시
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push(ROUTES.BOOK_EDIT(id))}
        >
          수정하기
        </Button>
      ) : (
        // 구매 희망자: 채팅 문의 버튼만 표시
        <Button
          className="w-full"
          disabled={book.status === 'sold' || loading}
          onClick={handleChat}
        >
          {book.status === 'sold' ? '판매 완료' : loading ? '채팅방 연결 중...' : '채팅으로 문의하기'}
        </Button>
      )}
    </div>
  )
}
