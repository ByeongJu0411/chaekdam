import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { createSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password, name } = await request.json()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ message: '이미 가입된 이메일입니다.' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    })

    // Create session
    await createSession(user._id.toString())

    return Response.json({ success: true, userId: user._id })
  } catch (error: any) {
    console.error('Signup error:', error)
    return Response.json({ message: '회원가입 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
