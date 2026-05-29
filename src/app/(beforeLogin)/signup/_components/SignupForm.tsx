'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'
import { signup } from '@/lib/api/auth'

const inputClass =
  'w-full rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/20 outline-none ring-0 backdrop-blur-sm transition-all focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-blue-500/20'

const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-white/40'

export function SignupForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const passwordConfirm = (form.elements.namedItem('passwordConfirm') as HTMLInputElement).value

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)
    try {
      await signup({ name, email, password })
      router.push(ROUTES.BOOKS)
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className={labelClass}>이름</label>
        <input name="name" type="text" placeholder="홍길동" className={inputClass} required />
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>학교 이메일</label>
        <input
          name="email"
          type="email"
          placeholder="example@university.ac.kr"
          className={inputClass}
          required
        />
        <p className="text-xs text-white/20">학교 이메일(.ac.kr)로만 가입할 수 있어요</p>
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>비밀번호</label>
        <input
          name="password"
          type="password"
          placeholder="8자 이상"
          className={inputClass}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>비밀번호 확인</label>
        <input
          name="passwordConfirm"
          type="password"
          placeholder="••••••••"
          className={inputClass}
          required
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="group relative mt-2 w-full overflow-hidden rounded-xl bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <span className="relative z-10">{loading ? '가입 중...' : '회원가입'}</span>
        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-blue-400 to-indigo-500 transition-transform duration-500 group-hover:translate-x-0" />
      </button>

      <p className="text-center text-xs text-white/20">
        가입 시 책담의 이용약관 및 개인정보처리방침에 동의하게 됩니다
      </p>
    </form>
  )
}
