import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { createSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password } = await request.json()

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return Response.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return Response.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 })
    }

    // Create session
    await createSession(user._id.toString())

    return Response.json({ success: true, userId: user._id })
  } catch (error: any) {
    console.error('Login error:', error)
    return Response.json({ message: '로그인 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
