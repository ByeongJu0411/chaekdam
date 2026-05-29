'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const visible = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0px)' : 'translateY(24px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  })

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020617] px-6 pb-24 pt-24">
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Center radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[900px] w-[900px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* Top-left blob */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[700px] w-[700px] rounded-full bg-blue-700/15 blur-[120px]" />
      {/* Bottom-right blob */}
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[100px]" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-5xl text-center">
        {/* Badge */}
        <div style={visible(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-400/10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            대학생을 위한 전공책 직거래 플랫폼
          </span>
        </div>

        {/* Headline */}
        <div style={visible(150)} className="mt-8">
          <h1 className="text-6xl font-black leading-[1.04] tracking-[-0.03em] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
            책 한 권의
            <br />
            가치를,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a5b4fc 40%, #818cf8 100%)',
              }}
            >
              캠퍼스에 되돌리다
            </span>
          </h1>
        </div>

        {/* Sub copy */}
        <div style={visible(300)} className="mt-8">
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/40 sm:text-xl">
            다 읽은 전공책이 선배의 짐이 되는 대신, 후배의 출발이 됩니다.
            <br className="hidden sm:block" />
            같은 학교 학생끼리, 안전하게.
          </p>
        </div>

        {/* CTA */}
        <div style={visible(420)} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={ROUTES.SIGNUP}
            className="group relative overflow-hidden rounded-full bg-blue-500 px-9 py-4 text-base font-bold text-white shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-[1.04] hover:shadow-blue-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              지금 시작하기
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-blue-400 to-indigo-500 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
          <Link
            href={ROUTES.LOGIN}
            className="rounded-full border border-white/10 bg-white/[0.04] px-9 py-4 text-base font-semibold text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            로그인
          </Link>
        </div>

        {/* Trust text */}
        <div style={visible(500)} className="mt-5">
          <p className="text-sm text-white/20">학교 이메일만 있으면 1분 안에 시작할 수 있어요</p>
        </div>

        {/* Stats */}
        <div
          style={visible(600)}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]"
        >
          {[
            { value: '2,000+', label: '등록 도서' },
            { value: '50+', label: '참여 대학교' },
            { value: '4.9점', label: '거래 만족도' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 bg-[#020617] py-6 px-4">
              <span className="text-2xl font-black text-white sm:text-3xl">{s.value}</span>
              <span className="text-xs text-white/30">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: mounted ? 0.4 : 0, transition: 'opacity 1s ease 900ms' }}
      >
        <div className="flex h-11 w-6 items-start justify-center rounded-full border border-white/30 pt-2">
          <div className="h-2 w-0.5 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </section>
  )
}
