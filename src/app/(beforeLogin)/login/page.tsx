import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { LoginForm } from './_components/LoginForm'

const highlights = [
  { icon: '🔐', text: '학교 이메일로만 가입 가능한 안전한 플랫폼' },
  { icon: '📚', text: '내 학과 전공책만 골라서 한눈에' },
  { icon: '💰', text: '새 책의 절반 이하 가격으로 거래' },
]

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-14 overflow-hidden">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
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
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-white xl:text-5xl">
            책 한 권의 가치를,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a5b4fc 60%, #818cf8 100%)' }}
            >
              캠퍼스에 되돌리다
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/35">
            같은 학교 학생끼리 안전하게 전공책을 거래하세요.
          </p>

          <ul className="mt-10 space-y-4">
            {highlights.map((h) => (
              <li key={h.text} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-lg ring-1 ring-white/[0.08]">
                  {h.icon}
                </div>
                <span className="text-sm text-white/50">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
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
            <h1 className="text-2xl font-black tracking-tight text-white">다시 돌아오셨군요</h1>
            <p className="mt-2 text-sm text-white/35">
              계정이 없으신가요?{' '}
              <Link href={ROUTES.SIGNUP} className="font-medium text-blue-400 transition-colors hover:text-blue-300">
                회원가입
              </Link>
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <Link href={ROUTES.FIND_PASSWORD} className="text-xs text-white/25 transition-colors hover:text-white/50">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
