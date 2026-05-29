import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/dal'
import dbConnect from '@/lib/db'
import Book from '@/models/Book'
import User from '@/models/User'
import Wishlist from '@/models/Wishlist'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, ctx: Ctx) {
  try {
    await dbConnect()
    const { id } = await ctx.params
    const { userId } = await verifySession().catch(() => ({ userId: null }))

    const book = await Book.findById(id).populate('sellerId', 'name profileImage').lean()
    if (!book) {
      return Response.json({ message: '도서를 찾을 수 없습니다.' }, { status: 404 })
    }

    let isWishlisted = false
    if (userId) {
      const wish = await Wishlist.findOne({ userId, bookId: id })
      isWishlisted = !!wish
    }

    return Response.json({
      ...book,
      sellerName: (book as any).sellerId?.name,
      sellerId: (book as any).sellerId?._id?.toString(),
      isWishlisted,
    })
  } catch (error) {
    return Response.json({ message: '도서 조회 실패' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, ctx: Ctx) {
  try {
    const session = await verifySession()
    await dbConnect()
    const { id } = await ctx.params
    const body = await request.json()

    const book = await Book.findById(id)
    if (!book) {
      return Response.json({ message: '도서를 찾을 수 없습니다.' }, { status: 404 })
    }

    if (book.sellerId.toString() !== session.userId) {
      return Response.json({ message: '수정 권한이 없습니다.' }, { status: 403 })
    }

    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('sellerId', 'name')
      .lean()

    return Response.json({
      ...updatedBook,
      sellerName: (updatedBook as any).sellerId?.name,
      sellerId: (updatedBook as any).sellerId?._id?.toString(),
    })
  } catch (error) {
    return Response.json({ message: '도서 수정 실패' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  try {
    const session = await verifySession()
    await dbConnect()
    const { id } = await ctx.params

    const book = await Book.findById(id)
    if (!book) {
      return Response.json({ message: '도서를 찾을 수 없습니다.' }, { status: 404 })
    }

    if (book.sellerId.toString() !== session.userId) {
      return Response.json({ message: '삭제 권한이 없습니다.' }, { status: 403 })
    }

    await Book.findByIdAndDelete(id)
    // Also delete from wishlist
    await Wishlist.deleteMany({ bookId: id })

    return new Response(null, { status: 204 })
  } catch (error) {
    return Response.json({ message: '도서 삭제 실패' }, { status: 500 })
  }
}
