'use client'
import { ScrollReveal } from './ScrollReveal'

const features = [
  {
    icon: '🔐',
    title: '학교 이메일 인증',
    desc: '재학생만 접근 가능한 안전한 폐쇄형 플랫폼',
    gradient: 'from-blue-500/10 via-transparent to-transparent',
    iconBg: 'bg-blue-500/10 ring-blue-500/20',
  },
  {
    icon: '📖',
    title: '학과별 도서 분류',
    desc: '내 전공 책만 골라서 한눈에',
    gradient: 'from-indigo-500/10 via-transparent to-transparent',
    iconBg: 'bg-indigo-500/10 ring-indigo-500/20',
  },
  {
    icon: '💬',
    title: '실시간 채팅',
    desc: '판매자와 직접 협의하고 바로 거래 확정',
    gradient: 'from-violet-500/10 via-transparent to-transparent',
    iconBg: 'bg-violet-500/10 ring-violet-500/20',
  },
  {
    icon: '⭐',
    title: '거래 후기 시스템',
    desc: '누적된 후기로 믿을 수 있는 거래 파트너 확인',
    gradient: 'from-amber-500/10 via-transparent to-transparent',
    iconBg: 'bg-amber-500/10 ring-amber-500/20',
  },
  {
    icon: '📍',
    title: '캠퍼스 직거래',
    desc: '배송비 없이 캠퍼스 안에서 바로 만나서 거래',
    gradient: 'from-emerald-500/10 via-transparent to-transparent',
    iconBg: 'bg-emerald-500/10 ring-emerald-500/20',
  },
  {
    icon: '🏷️',
    title: '가격 제안',
    desc: '원하는 가격을 제안하고 합리적으로 협의',
    gradient: 'from-rose-500/10 via-transparent to-transparent',
    iconBg: 'bg-rose-500/10 ring-rose-500/20',
  },
]

export function FeaturesSection() {
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
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/8 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            핵심 기능
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            필요한 건 다 있어요
          </h2>
          <p className="mt-4 text-lg text-white/30">
            책담 하나로 전공책 거래의 모든 것을 해결하세요
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 70}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/30">
                {/* Card gradient top-left */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Top shine line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${f.iconBg}`}>
                    {f.icon}
                  </div>
                  <h3 className="mt-4 font-bold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/35">{f.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
