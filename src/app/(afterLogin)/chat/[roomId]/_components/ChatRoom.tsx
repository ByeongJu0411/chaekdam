'use client'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getChatRoom, getMessages } from '@/lib/api/chat'
import { useMe } from '@/hooks/useAuth'
import { getSocket } from '@/lib/socket'
import { ROUTES } from '@/lib/constants/routes'
import type { Message } from '@/types/chat'

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getDateKey(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

function formatDateLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}

export function ChatRoom({ roomId }: { roomId: string }) {
  const router = useRouter()
  const { data: me } = useMe()
  const meId = me?._id ?? ''

  const { data: room } = useQuery({
    queryKey: ['chatRoom', roomId],
    queryFn: () => getChatRoom(roomId),
  })

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getMessages(roomId).then(setMessages)
  }, [roomId])

  useEffect(() => {
    const socket = getSocket()
    socket.connect()
    socket.emit('join-room', roomId)

    // socket.to() 로 발신자를 제외했으므로 수신자 메시지만 여기 도달
    socket.on('receive-message', (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      socket.emit('leave-room', roomId)
      socket.off('receive-message')
      socket.disconnect()
    }
  }, [roomId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || !meId) return
    const trimmed = input.trim()

    // 낙관적 업데이트: 바로 화면에 표시
    setMessages((prev) => [
      ...prev,
      {
        _id: `temp-${Date.now()}`,
        roomId,
        senderId: meId,
        content: trimmed,
        createdAt: new Date().toISOString(),
      },
    ])
    setInput('')
    inputRef.current?.focus()

    getSocket().emit('send-message', { roomId, content: trimmed })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const otherName = meId === room?.buyerId ? room?.sellerName : room?.buyerName

  // 날짜별 그룹핑
  const dateGroups: { dateKey: string; dateLabel: string; msgs: Message[] }[] = []
  for (const msg of messages) {
    const dk = getDateKey(msg.createdAt)
    const last = dateGroups[dateGroups.length - 1]
    if (last?.dateKey === dk) {
      last.msgs.push(msg)
    } else {
      dateGroups.push({ dateKey: dk, dateLabel: formatDateLabel(msg.createdAt), msgs: [msg] })
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* 헤더 */}
      <div className="flex items-center gap-3 bg-white border-b border-slate-200 px-4 py-3 shrink-0">
        <button
          onClick={() => router.push(ROUTES.CHAT)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
          {otherName?.[0] ?? '?'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 text-sm leading-tight truncate">
            {otherName ?? '...'}
          </p>
          <p className="text-xs text-slate-400 truncate leading-tight mt-0.5">
            {room?.bookTitle ?? ''}
          </p>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.length === 0 && (
          <div className="flex justify-center pt-8">
            <span className="text-xs text-slate-400 bg-white border border-slate-100 rounded-full px-4 py-1.5 shadow-sm">
              대화를 시작해보세요
            </span>
          </div>
        )}

        {dateGroups.map(({ dateKey, dateLabel, msgs }) => (
          <div key={dateKey}>
            {/* 날짜 구분선 */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-slate-400 shrink-0">{dateLabel}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="space-y-1">
              {msgs.map((msg, i) => {
                const isMine = msg.senderId === meId
                const nextMsg = msgs[i + 1]
                const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId
                const isFirstInGroup = i === 0 || msgs[i - 1].senderId !== msg.senderId

                return (
                  <div
                    key={msg._id}
                    className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* 상대방 아바타 */}
                    {!isMine && (
                      <div className="w-7 h-7 shrink-0 mb-0.5">
                        {isFirstInGroup ? (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white">
                            {otherName?.[0] ?? '?'}
                          </div>
                        ) : (
                          <div className="w-7 h-7" />
                        )}
                      </div>
                    )}

                    <div className={`flex flex-col gap-0.5 max-w-[65%] ${isMine ? 'items-end' : 'items-start'}`}>
                      {/* 상대방 이름 (그룹 첫 메시지에만) */}
                      {!isMine && isFirstInGroup && (
                        <span className="text-xs text-slate-500 font-medium ml-1">{otherName}</span>
                      )}

                      <div className={`flex items-end gap-1.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div
                          className={`px-3.5 py-2 text-sm leading-relaxed break-words ${
                            isMine
                              ? 'bg-blue-500 text-white rounded-t-2xl rounded-l-2xl rounded-br-sm shadow-sm shadow-blue-500/20'
                              : 'bg-white text-slate-900 border border-slate-100 rounded-t-2xl rounded-r-2xl rounded-bl-sm shadow-sm'
                          }`}
                        >
                          {msg.content}
                        </div>
                        {isLastInGroup && (
                          <span className="text-[10px] text-slate-400 shrink-0 mb-1">
                            {formatTime(msg.createdAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div className="bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-2 shrink-0">
        <input
          ref={inputRef}
          className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm shadow-blue-500/30"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
