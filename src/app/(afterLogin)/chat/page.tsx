import { ChatRoomList } from './_components/ChatRoomList'

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">채팅</h1>
      </div>
      <ChatRoomList />
    </div>
  )
}
