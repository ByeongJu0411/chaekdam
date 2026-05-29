'use client'
import { useBookFilterStore } from '@/store/bookFilterStore'
import { BOOK_CATEGORIES } from '@/lib/constants/bookCategories'

const statuses = [
  { value: 'selling', label: '판매중', color: 'bg-emerald-400' },
  { value: 'reserved', label: '예약중', color: 'bg-amber-400' },
  { value: 'sold', label: '판매완료', color: 'bg-slate-300' },
]

export function FilterBar() {
  const { filter, setFilter, resetFilter } = useBookFilterStore()

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">학부</p>
        <ul className="space-y-0.5">
          <li>
            <button
              onClick={() => setFilter({ category: undefined })}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                !filter.category
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              전체
            </button>
          </li>
          {BOOK_CATEGORIES.map((c) => (
            <li key={c.value}>
              <button
                onClick={() => setFilter({ category: c.value })}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  filter.category === c.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Status */}
      <div>
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">거래 상태</p>
        <ul className="space-y-0.5">
          {statuses.map((s) => (
            <li key={s.value}>
              <button
                onClick={() => setFilter({ status: s.value as 'selling' | 'reserved' | 'sold' })}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  filter.status === s.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${s.color}`} />
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset */}
      {(filter.category || filter.status) && (
        <button
          onClick={resetFilter}
          className="w-full rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600"
        >
          필터 초기화
        </button>
      )}
    </div>
  )
}
