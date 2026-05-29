import { MypageNav } from '@/components/layout/MypageNav'
import { ProfileForm } from './_components/ProfileForm'

export default function ProfilePage() {
  return (
    <div className="flex gap-8">
      <MypageNav />
      <div className="flex-1 max-w-md">
        <h1 className="mb-6 text-2xl font-bold">프로필 수정</h1>
        <ProfileForm />
      </div>
    </div>
  )
}
