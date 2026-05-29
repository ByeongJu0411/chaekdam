import { verifySession } from '@/lib/dal'
import dbConnect from '@/lib/db'
import Wishlist from '@/models/Wishlist'
import Book from '@/models/Book'

export async function GET() {
  try {
    const session = await verifySession()
    await dbConnect()

    const wishes = await Wishlist.find({ userId: session.userId })
      .populate({
        path: 'bookId',
        populate: { path: 'sellerId', select: 'name' }
      })
      .sort({ createdAt: -1 })
      .lean()

    const books = wishes
      .filter((wish: any) => wish.bookId) // Filter out deleted books
      .map((wish: any) => ({
        ...wish.bookId,
        sellerName: wish.bookId.sellerId?.name,
        sellerId: wish.bookId.sellerId?._id?.toString() || wish.bookId.sellerId?.toString(),
      }))

    return Response.json({
      data: books,
      total: books.length,
      page: 1,
      limit: books.length,
      totalPages: 1,
    })
  } catch (error) {
    console.error('Wishlist error:', error)
    return Response.json({ message: '찜 목록 조회 실패' }, { status: 500 })
  }
}
