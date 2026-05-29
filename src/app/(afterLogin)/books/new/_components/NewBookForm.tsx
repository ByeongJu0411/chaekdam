'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BookForm } from '@/components/common/BookForm'
import { createBook } from '@/lib/api/books'
import { ROUTES } from '@/lib/constants/routes'
import type { BookForm as BookFormType } from '@/types/book'

export function NewBookForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(data: BookFormType) {
    setIsLoading(true)
    try {
      const book = await createBook(data)
      router.push(ROUTES.BOOK_DETAIL(book._id))
    } finally {
      setIsLoading(false)
    }
  }

  return <BookForm onSubmit={handleSubmit} isLoading={isLoading} submitLabel="등록하기" />
}
