'use client'
import { useBookFilterStore } from '@/store/bookFilterStore'
import { useState } from 'react'

export function SearchBar() {
  const { setFilter } = useBookFilterStore()
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFilter({ search: value })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="도서명, 저자, 출판사 검색..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <button
        type="submit"
        className="h-10 rounded-xl bg-blue-500 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-600"
      >
        검색
      </button>
    </form>
  )
}
