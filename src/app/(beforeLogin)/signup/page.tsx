import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { SignupForm } from './_components/SignupForm'

const perks = [
  { icon: '🎓', title: '재학생 전용', desc: '학교 이메일 인증으로 신뢰할 수 있는 거래' },
  { icon: '💸', title: '합리적인 가격', desc: '새 책 대비 절반 이하 가격으로 구매' },
  { icon: '🤝', title: '캠퍼스 직거래', desc: '배송비 없이 캠퍼스에서 바로 만나서' },
]

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex lg:w-[45%] flex-col justify-between p-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-blue-600/10" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/12 blur-[100px]" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-y-0 right-0 w-px bg-white/[0.06]" />

        {/* Logo */}
        <Link href={ROUTES.HOME} className="relative flex items-center gap-2.5 w-fit group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
            <span className="text-sm font-black text-white">책</span>
          </div>
          <span className="text-xl font-black tracking-tight text-white">책담</span>
        </Link>

        {/* Main copy */}
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">무료로 시작하기</p>
          <h2 className="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-white xl:text-5xl">
            전공책 고민,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a5b4fc 60%, #818cf8 100%)' }}
            >
              이제 책담에서
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/35">
            1분 안에 가입하고 바로 거래를 시작하세요.
          </p>

          <div className="mt-10 space-y-5">
            {perks.map((p) => (
              <div key={p.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-xl ring-1 ring-white/[0.08]">
                  {p.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/70">{p.title}</p>
                  <p className="mt-0.5 text-xs text-white/35">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/15">© 2026 책담. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 lg:px-16">
        {/* Mobile logo */}
        <Link href={ROUTES.HOME} className="mb-10 flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
            <span className="text-xs font-black text-white">책</span>
          </div>
          <span className="text-lg font-black tracking-tight text-white">책담</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-black tracking-tight text-white">환영합니다</h1>
            <p className="mt-2 text-sm text-white/35">
              이미 계정이 있으신가요?{' '}
              <Link href={ROUTES.LOGIN} className="font-medium text-blue-400 transition-colors hover:text-blue-300">
                로그인
              </Link>
            </p>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  )
}
