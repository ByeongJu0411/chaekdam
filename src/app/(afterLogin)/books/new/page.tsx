import { NewBookForm } from './_components/NewBookForm'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function BookNewPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Link
          href={ROUTES.BOOKS}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
        >
          ← 도서 목록
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">도서 등록</h1>
        <p className="mt-1 text-sm text-slate-400">전공책 정보를 입력하고 판매를 시작하세요</p>
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <NewBookForm />
      </div>
    </div>
  )
}
