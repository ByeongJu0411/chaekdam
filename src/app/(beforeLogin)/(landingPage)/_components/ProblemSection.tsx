'use client'
import { ScrollReveal } from './ScrollReveal'

const problems = [
  {
    emoji: '😮‍💨',
    quote: '에브리타임에서 전공책 찾느라 게시글 수십 개 뒤져봤어요',
    who: '경영학과 3학년',
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.12)',
  },
  {
    emoji: '💸',
    quote: '새 책 사기엔 너무 비싸고, 그냥 쓰던 거 쓰기엔 너무 낡았어요',
    who: '공과대학 1학년',
    accent: '#eab308',
    glow: 'rgba(234,179,8,0.10)',
  },
  {
    emoji: '😰',
    quote: '당근에서 찾다가 모르는 사람 만나기가 무서워서 그냥 포기했어요',
    who: '사범대학 2학년',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.10)',
  },
]

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-6 py-32">
      {/* Subtle top border fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
            공감하시나요
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            매 학기,
            <br />
            같은 고민을 반복합니다
          </h2>
          <p className="mt-4 text-lg text-slate-400">전국 대학생 10명 중 8명이 겪는 일입니다</p>
        </ScrollReveal>

        <div className="mt-16 space-y-4">
          {problems.map((p, i) => (
            <ScrollReveal key={p.who} delay={i * 130}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 sm:p-10"
                style={{ boxShadow: `0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)` }}
              >
                {/* Colored glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 0% 50%, ${p.glow}, transparent 70%)` }}
                />

                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: p.accent }}
                />

                <div className="flex items-start gap-6">
                  <div
                    className="mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.glow.replace('0.10', '0.15').replace('0.12', '0.15')}`, border: `1px solid ${p.accent}25` }}
                  >
                    {p.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-semibold leading-snug text-slate-800 sm:text-2xl lg:text-3xl">
                      &ldquo;{p.quote}&rdquo;
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-slate-100 text-center text-[10px] leading-5 font-bold text-slate-400">
                        {p.who[0]}
                      </div>
                      <p className="text-sm text-slate-400">{p.who}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
