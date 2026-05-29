import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/dal'
import dbConnect from '@/lib/db'
import Wishlist from '@/models/Wishlist'

type Ctx = { params: Promise<{ id: string }> }

export async function POST(_req: NextRequest, ctx: Ctx) {
  try {
    const session = await verifySession()
    await dbConnect()
    const { id: bookId } = await ctx.params

    const existingWish = await Wishlist.findOne({ userId: session.userId, bookId })

    if (existingWish) {
      await Wishlist.findByIdAndDelete(existingWish._id)
      return Response.json({ isWishlisted: false })
    } else {
      await Wishlist.create({ userId: session.userId, bookId })
      return Response.json({ isWishlisted: true })
    }
  } catch (error) {
    return Response.json({ message: '찜하기 처리 실패' }, { status: 500 })
  }
}
