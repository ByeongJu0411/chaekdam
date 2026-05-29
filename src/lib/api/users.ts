import type { User, UserProfile } from '@/types/user'
import type { Book } from '@/types/book'
import type { PaginatedResponse } from '@/types/api'

export async function getMe(): Promise<User> {
  const res = await fetch('/api/users/me')
  if (!res.ok) throw new Error('사용자 정보를 불러오는데 실패했습니다.')
  return res.json()
}

export async function updateProfile(body: UserProfile): Promise<User> {
  const res = await fetch('/api/users/me', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('프로필 수정에 실패했습니다.')
  return res.json()
}

export async function getMySales(): Promise<PaginatedResponse<Book>> {
  const res = await fetch('/api/users/me/sales')
  if (!res.ok) throw new Error('판매 목록을 불러오는데 실패했습니다.')
  return res.json()
}

export async function getWishlist(): Promise<PaginatedResponse<Book>> {
  const res = await fetch('/api/users/me/wishlist')
  if (!res.ok) throw new Error('찜 목록을 불러오는데 실패했습니다.')
  return res.json()
}

export async function toggleWishlist(bookId: string): Promise<void> {
  const res = await fetch(`/api/users/me/wishlist/${bookId}`, { method: 'POST' })
  if (!res.ok) throw new Error('찜하기에 실패했습니다.')
}
