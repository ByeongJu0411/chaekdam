import { cookies } from 'next/headers'
import { decrypt, createSession } from '@/lib/session'

export async function POST() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  const payload = await decrypt(session)

  if (!payload?.userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  await createSession(payload.userId)
  return Response.json({ success: true })
}
