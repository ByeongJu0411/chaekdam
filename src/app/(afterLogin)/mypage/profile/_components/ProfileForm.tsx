'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useMe } from '@/hooks/useAuth'
import { updateProfile } from '@/lib/api/users'
import { useQueryClient } from '@tanstack/react-query'

export function ProfileForm() {
  const { data: user } = useMe()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setSuccess(false)
    const fd = new FormData(e.currentTarget)
    try {
      await updateProfile({ name: fd.get('name') as string })
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      setSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" label="이름" defaultValue={user?.name} required />
      <Input label="이메일" value={user?.email ?? ''} disabled />
      {success && <p className="text-sm text-green-600">프로필이 수정되었습니다.</p>}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? '저장 중...' : '저장'}
      </Button>
    </form>
  )
}
