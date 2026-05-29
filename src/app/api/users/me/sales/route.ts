import { verifySession } from '@/lib/dal'
import dbConnect from '@/lib/db'
import Book from '@/models/Book'

export async function GET() {
  try {
    const session = await verifySession()
    await dbConnect()

    const books = await Book.find({ sellerId: session.userId })
      .sort({ createdAt: -1 })
      .lean()

    const formattedBooks = books.map((book: any) => ({
      ...book,
      sellerId: book.sellerId.toString(),
    }))

    return Response.json({
      data: formattedBooks,
      total: books.length,
      page: 1,
      limit: books.length,
      totalPages: 1,
    })
  } catch (error) {
    return Response.json({ message: '판매 목록 조회 실패' }, { status: 500 })
  }
}
