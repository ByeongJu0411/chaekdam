import { ChatRoom } from './_components/ChatRoom'

export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {
  const { roomId } = await params
  return <ChatRoom roomId={roomId} />
}
