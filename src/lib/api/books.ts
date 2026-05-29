import type { Book, BookFilter, BookForm, BookStatus } from '@/types/book'
import type { PaginatedResponse } from '@/types/api'

export async function getBooks(filter?: BookFilter): Promise<PaginatedResponse<Book>> {
  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filter ?? {}).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)])
    )
  )
  const res = await fetch(`/api/books?${params}`)
  if (!res.ok) throw new Error('도서 목록을 불러오는데 실패했습니다.')
  return res.json()
}

export async function getBook(id: string): Promise<Book> {
  const res = await fetch(`/api/books/${id}`)
  if (!res.ok) throw new Error('도서 정보를 불러오는데 실패했습니다.')
  return res.json()
}

export async function createBook(body: BookForm): Promise<Book> {
  const res = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('도서 등록에 실패했습니다.')
  return res.json()
}

export async function updateBook(id: string, body: Partial<BookForm> & { status?: BookStatus }): Promise<Book> {
  const res = await fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('도서 수정에 실패했습니다.')
  return res.json()
}

export async function deleteBook(id: string): Promise<void> {
  const res = await fetch(`/api/books/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('도서 삭제에 실패했습니다.')
}
