'use client'
import { ScrollReveal } from './ScrollReveal'

const solutions = [
  {
    number: '01',
    title: '같은 학교 학생만',
    badge: '학교 이메일 인증으로 안전한 거래',
    detail: '검증된 학교 구성원끼리만 거래합니다. 낯선 사람에 대한 걱정은 이제 그만.',
    icon: '🎓',
  },
  {
    number: '02',
    title: '학과별로 정리',
    badge: '내 전공 책만 골라서 빠르게',
    detail: '수백 개의 게시글을 뒤질 필요 없이, 내 학과 전공책만 모아서 바로 보여드립니다.',
    icon: '📚',
  },
  {
    number: '03',
    title: '새 책의 절반 이하',
    badge: '선후배 직거래로 합리적인 가격',
    detail: '수수료 없는 직거래. 파는 선배도, 사는 후배도 모두 이득입니다.',
    icon: '💰',
  },
]

export function SolutionSection() {
  return (
    <section className="relative overflow-hidden bg-[#020617] px-6 py-32">
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
      {/* Gradient orb */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            솔루션
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            책담은 달라요
          </h2>
        </ScrollReveal>

        <div className="mt-16 border-t border-white/[0.07]">
          {solutions.map((s, i) => (
            <ScrollReveal key={s.number} delay={i * 120}>
              <div className="group relative flex items-center gap-8 border-b border-white/[0.07] py-10 transition-all duration-300 hover:px-4 sm:gap-16 sm:py-14">
                {/* Hover bg */}
                <div className="absolute inset-0 rounded-xl bg-white/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Number */}
                <span className="relative shrink-0 text-5xl font-black tabular-nums text-white/[0.06] transition-colors duration-300 group-hover:text-blue-500/20 sm:text-8xl">
                  {s.number}
                </span>

                {/* Content */}
                <div className="relative flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-14">
                  <div className="sm:w-56">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">{s.title}</h3>
                    <span className="mt-2 inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 ring-1 ring-inset ring-blue-400/20">
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/35 sm:flex-1 sm:text-base lg:text-lg">
                    {s.detail}
                  </p>
                </div>

                {/* Icon */}
                <div className="relative hidden shrink-0 sm:flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-3xl ring-1 ring-white/[0.08] transition-all duration-300 group-hover:bg-white/[0.08] group-hover:scale-110">
                  {s.icon}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
