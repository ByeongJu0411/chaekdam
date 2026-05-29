import { MypageNav } from '@/components/layout/MypageNav'
import { SaleList } from './_components/SaleList'

export default function SalesPage() {
  return (
    <div className="flex gap-8">
      <MypageNav />
      <div className="flex-1">
        <h1 className="mb-6 text-2xl font-bold">내 판매 목록</h1>
        <SaleList />
      </div>
    </div>
  )
}
