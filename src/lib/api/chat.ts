import type { ChatRoom, Message } from '@/types/chat'

export async function getChatRooms(): Promise<ChatRoom[]> {
  const res = await fetch('/api/chat/rooms')
  if (!res.ok) throw new Error('Failed to fetch chat rooms')
  return res.json()
}

export async function createOrGetChatRoom(bookId: string, sellerId: string): Promise<{ roomId: string }> {
  const res = await fetch('/api/chat/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookId, sellerId }),
  })
  if (!res.ok) throw new Error('Failed to create chat room')
  return res.json()
}

export async function getChatRoom(roomId: string): Promise<ChatRoom> {
  const res = await fetch(`/api/chat/rooms/${roomId}`)
  if (!res.ok) throw new Error('Failed to fetch chat room')
  return res.json()
}

export async function getMessages(roomId: string): Promise<Message[]> {
  const res = await fetch(`/api/chat/rooms/${roomId}/messages`)
  if (!res.ok) throw new Error('Failed to fetch messages')
  return res.json()
}
