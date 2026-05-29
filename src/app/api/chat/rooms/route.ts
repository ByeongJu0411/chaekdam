import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import { verifySession } from '@/lib/dal'
import ChatRoom from '@/models/ChatRoom'
import User from '@/models/User'
import Book from '@/models/Book'

export async function GET() {
  const session = await verifySession()
  await dbConnect()

  const userId = session.userId
  const rooms = await ChatRoom.find({
    $or: [{ buyerId: userId }, { sellerId: userId }],
  }).sort({ lastMessageAt: -1 })

  const populated = await Promise.all(
    rooms.map(async (room) => {
      const [book, buyer, seller] = await Promise.all([
        Book.findById(room.bookId).select('title'),
        User.findById(room.buyerId).select('name'),
        User.findById(room.sellerId).select('name'),
      ])
      return {
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
      }
    })
  )

  return Response.json(populated)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  await dbConnect()

  const { bookId, sellerId } = await request.json()
  const buyerId = session.userId

  if (buyerId === sellerId) {
    return Response.json({ message: '자신의 책에는 문의할 수 없습니다.' }, { status: 400 })
  }

  let room = await ChatRoom.findOne({ bookId, buyerId })
  if (!room) {
    room = await ChatRoom.create({ bookId, buyerId, sellerId })
  }

  return Response.json({ roomId: room._id.toString() })
}
