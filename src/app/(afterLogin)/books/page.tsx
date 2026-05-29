import { BookGrid } from './_components/BookGrid'
import { FilterBar } from './_components/FilterBar'
import { SearchBar } from './_components/SearchBar'

export default function BooksPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">도서 탐색</h1>
        <p className="mt-1 text-sm text-slate-400">우리 학교 학생들이 등록한 전공책을 찾아보세요</p>
      </div>

      <SearchBar />

      <div className="mt-6 flex gap-7">
        <aside className="hidden w-48 shrink-0 lg:block">
          <FilterBar />
        </aside>
        <div className="min-w-0 flex-1">
          <BookGrid />
        </div>
      </div>
    </div>
  )
}
