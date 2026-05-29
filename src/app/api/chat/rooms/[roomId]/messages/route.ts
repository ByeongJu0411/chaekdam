import { NextRequest } from 'next/server'
import dbConnect from '@/lib/db'
import { verifySession } from '@/lib/dal'
import ChatRoom from '@/models/ChatRoom'
import Message from '@/models/Message'

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

  const messages = await Message.find({ roomId }).sort({ createdAt: 1 })

  return Response.json(
    messages.map((m) => ({
      _id: m._id.toString(),
      roomId: m.roomId.toString(),
      senderId: m.senderId.toString(),
      content: m.content,
      createdAt: m.createdAt,
    }))
  )
}
