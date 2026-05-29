import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/dal'
import dbConnect from '@/lib/db'
import User from '@/models/User'

export async function GET() {
  try {
    const session = await verifySession()
    await dbConnect()

    const user = await User.findById(session.userId)
    if (!user) {
      return Response.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    return Response.json(user)
  } catch (error) {
    return Response.json({ message: '사용자 조회 실패' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await verifySession()
    await dbConnect()
    const { name, profileImage } = await request.json()

    const user = await User.findByIdAndUpdate(
      session.userId,
      { name, profileImage },
      { new: true, runValidators: true }
    )

    if (!user) {
      return Response.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    return Response.json(user)
  } catch (error) {
    return Response.json({ message: '프로필 수정 실패' }, { status: 500 })
  }
}
