'use client'
import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { ROUTES } from '@/lib/constants/routes'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#020617] px-6 pb-0 pt-32">
      {/* Radial center glow */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20">
        <div className="h-[700px] w-[700px] rounded-full bg-blue-600/12 blur-[130px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            지금 바로 시작하세요
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[1.06] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            지금 책꽂이를
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a5b4fc 50%, #818cf8 100%)',
              }}
            >
              비워볼까요?
            </span>
          </h2>

          <p className="mt-8 text-lg text-white/35 sm:text-xl">
            필요 없는 전공책이 돈이 됩니다.
            <br className="hidden sm:block" />
            필요한 전공책은 절반 가격에 구합니다.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.SIGNUP}
              className="group relative overflow-hidden rounded-full bg-blue-500 px-12 py-5 text-base font-bold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-[1.04] hover:shadow-blue-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                무료로 시작하기
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-blue-400 to-indigo-500 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="rounded-full border border-white/10 bg-white/[0.04] px-12 py-5 text-base font-semibold text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              로그인
            </Link>
          </div>

          <p className="mt-5 text-sm text-white/20">
            학교 이메일만 있으면 1분 안에 시작할 수 있어요
          </p>
        </ScrollReveal>

        {/* Bottom decorative line before footer */}
        <div className="mt-24 flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.06]" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.06]" />
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-0 py-10 text-center">
        <p className="text-sm text-white/15">© 2026 책담. All rights reserved.</p>
      </div>
    </section>
  )
}
