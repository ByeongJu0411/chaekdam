'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

const navLinks = [
  { href: ROUTES.BOOKS, label: '도서 탐색' },
  { href: ROUTES.CHAT, label: '채팅' },
  { href: ROUTES.MYPAGE, label: '마이페이지' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link href={ROUTES.BOOKS} className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm shadow-blue-500/20 transition-shadow group-hover:shadow-blue-500/40">
            <span className="text-xs font-black text-white">책</span>
          </div>
          <span className="text-base font-black tracking-tight text-slate-900">책담</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                pathname.startsWith(href) && href !== ROUTES.BOOKS
                  ? 'bg-slate-100 text-slate-900'
                  : pathname === href
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <Link
          href={ROUTES.BOOK_NEW}
          className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-600 hover:shadow-blue-500/30"
        >
          <span className="text-base leading-none">+</span>
          판매하기
        </Link>
      </div>
    </header>
  )
}
