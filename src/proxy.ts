import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

const publicRoutes = ['/', '/login', '/signup', '/find-password']
const authOnlyRoutes = ['/login', '/signup', '/find-password']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('session')?.value
  const session = await decrypt(sessionCookie)
  const isAuthenticated = !!session?.userId

  if (isAuthenticated && authOnlyRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/books', request.url))
  }
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
