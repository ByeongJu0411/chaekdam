'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { findPassword } from '@/lib/api/auth'

export function FindPasswordForm() {
  const [sent, setSent] = useState(false)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    const fd = new FormData(e.currentTarget)
    try {
      await findPassword(fd.get('email') as string)
      setSent(true)
    } finally {
      setIsPending(false)
    }
  }

  if (sent) {
    return <p className="text-center text-sm text-green-600">재설정 링크를 이메일로 보냈습니다.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="email" label="이메일" type="email" placeholder="example@email.com" required />
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? '전송 중...' : '재설정 링크 받기'}
      </Button>
    </form>
  )
}
