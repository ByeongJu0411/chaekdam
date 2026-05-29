import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import { verifySession } from '@/lib/dal'
import ChatRoom from '@/models/ChatRoom'
import User from '@/models/User'
import Book from '@/models/Book'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const session = await verifySession()
  const { roomId } = await params
  await dbConnect()

  const room = await ChatRoom.findById(roomId)
  if (!room) {
    return Response.json({ message: '채팅방을 찾을 수 없습니다.' }, { status: 404 })
  }

  const userId = session.userId
  const isMember =
    room.buyerId.toString() === userId || room.sellerId.toString() === userId
  if (!isMember) {
    return Response.json({ message: '접근 권한이 없습니다.' }, { status: 403 })
  }

  const [book, buyer, seller] = await Promise.all([
    Book.findById(room.bookId).select('title'),
    User.findById(room.buyerId).select('name'),
    User.findById(room.sellerId).select('name'),
  ])

  return Response.json({
    _id: room._id.toString(),
    bookId: room.bookId.toString(),
    bookTitle: book?.title ?? '알 수 없는 도서',
    buyerId: room.buyerId.toString(),
    buyerName: buyer?.name ?? '알 수 없음',
    sellerId: room.sellerId.toString(),
    sellerName: seller?.name ?? '알 수 없음',
    lastMessage: room.lastMessage,
    lastMessageAt: room.lastMessageAt,
    createdAt: room.createdAt,
  })
}
