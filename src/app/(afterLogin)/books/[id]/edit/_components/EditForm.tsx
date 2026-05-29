'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BookForm } from '@/components/common/BookForm'
import { useBookDetail } from '@/hooks/useBookDetail'
import { updateBook } from '@/lib/api/books'
import { ROUTES } from '@/lib/constants/routes'
import type { BookForm as BookFormType } from '@/types/book'

export function EditForm({ id }: { id: string }) {
  const router = useRouter()
  const { data: book } = useBookDetail(id)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(data: BookFormType) {
    setIsLoading(true)
    try {
      await updateBook(id, data)
      router.push(ROUTES.BOOK_DETAIL(id))
    } finally {
      setIsLoading(false)
    }
  }

  if (!book) return null

  return (
    <BookForm
      defaultValues={book}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="수정 완료"
    />
  )
}
