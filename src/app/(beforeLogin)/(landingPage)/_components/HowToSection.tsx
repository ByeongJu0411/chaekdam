'use client'
import { ScrollReveal } from './ScrollReveal'

const steps = [
  {
    step: '01',
    title: '학교 이메일 인증',
    desc: '학교 이메일로 가입하고 재학생임을 인증하세요. 같은 학교 학생끼리만 거래합니다.',
    icon: '✉️',
    color: 'from-blue-500/20 to-blue-600/5',
    ring: 'ring-blue-500/20',
  },
  {
    step: '02',
    title: '전공 설정',
    desc: '내 학과와 수강 과목을 설정하면 맞춤 도서 목록을 바로 받아볼 수 있어요.',
    icon: '🎯',
    color: 'from-indigo-500/20 to-indigo-600/5',
    ring: 'ring-indigo-500/20',
  },
  {
    step: '03',
    title: '검색 또는 등록',
    desc: '필요한 전공책을 검색하거나, 다 쓴 책을 사진 찍어 올리세요. 5분이면 충분해요.',
    icon: '🔍',
    color: 'from-violet-500/20 to-violet-600/5',
    ring: 'ring-violet-500/20',
  },
  {
    step: '04',
    title: '캠퍼스 직거래 완료',
    desc: '채팅으로 시간과 장소를 정하고, 캠퍼스에서 만나 거래를 완료하세요.',
    icon: '🤝',
    color: 'from-sky-500/20 to-sky-600/5',
    ring: 'ring-sky-500/20',
  },
]

export function HowToSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
            이용 방법
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            단 4단계면 충분합니다
          </h2>
          <p className="mt-4 text-lg text-slate-400">가입부터 첫 거래까지, 오래 걸리지 않아요</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 110}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Gradient bg on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-300 text-sm font-bold shadow-sm">
                      →
                    </div>
                  </div>
                )}

                <div className="relative">
                  {/* Step number */}
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">{s.step}</span>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl shadow-sm ring-1 ${s.ring} ${s.color}`}>
                      {s.icon}
                    </div>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
