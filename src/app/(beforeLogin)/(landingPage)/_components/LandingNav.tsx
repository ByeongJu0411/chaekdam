'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ROUTES } from '@/lib/constants/routes'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-[#020617]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/20'
          : ''
      }`}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
            <span className="text-xs font-black text-white">책</span>
          </div>
          <span className="text-lg font-black tracking-tight text-white">책담</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.LOGIN}
            className="rounded-full px-5 py-2 text-sm font-medium text-white/60 transition-all hover:text-white hover:bg-white/[0.06]"
          >
            로그인
          </Link>
          <Link
            href={ROUTES.SIGNUP}
            className="group relative overflow-hidden rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.03]"
          >
            <span className="relative z-10">무료로 시작하기</span>
            <div className="absolute inset-0 translate-y-full bg-blue-400 transition-transform duration-300 group-hover:translate-y-0" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
