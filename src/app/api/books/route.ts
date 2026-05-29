import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/dal'
import dbConnect from '@/lib/db'
import Book from '@/models/Book'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const condition = searchParams.get('condition')
    const status = searchParams.get('status')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'latest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 12
    const skip = (page - 1) * limit

    const query: any = {}

    if (category) query.category = category
    if (condition) query.condition = condition
    if (status) query.status = status
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseInt(minPrice)
      if (maxPrice) query.price.$lte = parseInt(maxPrice)
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ]
    }

    let sortOption: any = { createdAt: -1 }
    if (sort === 'price_asc') sortOption = { price: 1 }
    if (sort === 'price_desc') sortOption = { price: -1 }

    const [books, total] = await Promise.all([
      Book.find(query)
        .populate('sellerId', 'name')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
      Book.countDocuments(query),
    ])

    const formattedBooks = books.map((book: any) => ({
      ...book,
      sellerName: book.sellerId?.name || 'Unknown',
      sellerId: book.sellerId?._id?.toString() || book.sellerId?.toString(),
    }))

    return Response.json({
      data: formattedBooks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Fetch books error:', error)
    return Response.json({ message: '도서 목록 조회 실패' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifySession()
    await dbConnect()
    const body = await request.json()

    const book = await Book.create({
      ...body,
      sellerId: session.userId,
    })

    const populatedBook = await Book.findById(book._id).populate('sellerId', 'name').lean()
    
    return Response.json({
      ...populatedBook,
      sellerName: (populatedBook as any).sellerId?.name,
      sellerId: (populatedBook as any).sellerId?._id?.toString(),
    }, { status: 201 })
  } catch (error) {
    console.error('Create book error:', error)
    return Response.json({ message: '도서 등록 실패' }, { status: 500 })
  }
}
