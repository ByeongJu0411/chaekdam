import { MypageNav } from '@/components/layout/MypageNav'
import { WishlistGrid } from './_components/WishlistGrid'

export default function WishlistPage() {
  return (
    <div className="flex gap-8">
      <MypageNav />
      <div className="flex-1">
        <h1 className="mb-6 text-2xl font-bold">찜한 책</h1>
        <WishlistGrid />
      </div>
    </div>
  )
}
