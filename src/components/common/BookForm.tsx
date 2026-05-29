'use client'
import { BOOK_CATEGORIES } from '@/lib/constants/bookCategories'
import type { BookForm as BookFormType } from '@/types/book'

interface BookFormProps {
  defaultValues?: Partial<BookFormType>
  onSubmit: (data: BookFormType) => void
  isLoading?: boolean
  submitLabel?: string
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100'

const labelClass = 'block text-sm font-semibold text-slate-700'

export function BookForm({ defaultValues, onSubmit, isLoading, submitLabel = '등록하기' }: BookFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit({
      title: fd.get('title') as string,
      author: fd.get('author') as string,
      publisher: fd.get('publisher') as string,
      price: Number(fd.get('price')),
      condition: fd.get('condition') as BookFormType['condition'],
      category: fd.get('category') as string,
      description: fd.get('description') as string,
      images: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className={labelClass}>도서 제목</label>
        <input name="title" placeholder="책 제목을 입력하세요" defaultValue={defaultValues?.title} required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelClass}>저자</label>
          <input name="author" placeholder="저자명" defaultValue={defaultValues?.author} required className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass}>출판사</label>
          <input name="publisher" placeholder="출판사명" defaultValue={defaultValues?.publisher} required className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelClass}>학부</label>
          <select name="category" defaultValue={defaultValues?.category} className={inputClass}>
            {BOOK_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className={labelClass}>도서 상태</label>
          <select name="condition" defaultValue={defaultValues?.condition ?? 'good'} className={inputClass}>
            <option value="new">새것 같음</option>
            <option value="good">상태 양호</option>
            <option value="fair">사용감 있음</option>
            <option value="poor">많이 사용함</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>판매 가격</label>
        <div className="relative">
          <input
            name="price"
            type="number"
            placeholder="0"
            defaultValue={defaultValues?.price}
            required
            min={0}
            className={`${inputClass} pr-8`}
          />
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-slate-400">원</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>설명</label>
        <textarea
          name="description"
          placeholder="책의 상태, 필기 여부, 거래 방식 등을 자유롭게 적어주세요"
          defaultValue={defaultValues?.description}
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-blue-500 py-3 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-600 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? '처리 중...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
