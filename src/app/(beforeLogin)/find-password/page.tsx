import { FindPasswordForm } from './_components/FindPasswordForm'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function FindPasswordPage() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">비밀번호 찾기</h1>
      <p className="mb-6 text-sm text-gray-500">가입한 이메일로 재설정 링크를 보내드립니다.</p>
      <FindPasswordForm />
      <p className="mt-4 text-center text-sm text-gray-500">
        <Link href={ROUTES.LOGIN} className="text-blue-600 hover:underline">
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  )
}
