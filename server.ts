import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'
import { jwtVerify } from 'jose'
import dbConnect from './src/lib/db'
import ChatRoom from './src/models/ChatRoom'
import Message from './src/models/Message'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT ?? '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

function parseCookie(cookieHeader: string, name: string): string | undefined {
  for (const part of cookieHeader.split(';')) {
    const [key, ...vals] = part.trim().split('=')
    if (key.trim() === name) return decodeURIComponent(vals.join('='))
  }
  return undefined
}

async function decryptSession(token: string) {
  const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET)
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ['HS256'] })
    return payload as { userId: string }
  } catch {
    return null
  }
}

app.prepare().then(async () => {
  await dbConnect()

  const httpServer = createServer(async (req, res) => {
    // /socket.io 경로는 Socket.io가 처리하므로 Next.js에 넘기지 않음
    if (req.url?.startsWith('/socket.io')) return
    const parsedUrl = parse(req.url!, true)
    await handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer, {
    cors: { origin: `http://${hostname}:${port}`, credentials: true },
    // 폴링→웹소켓 업그레이드 허용
    transports: ['polling', 'websocket'],
  })

  io.use(async (socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie ?? ''
    const token = parseCookie(cookieHeader, 'session')
    if (!token) return next(new Error('Unauthorized'))
    const session = await decryptSession(token)
    if (!session?.userId) return next(new Error('Unauthorized'))
    socket.data.userId = session.userId
    next()
  })

  io.on('connection', (socket) => {
    const userId: string = socket.data.userId

    socket.on('join-room', (roomId: string) => {
      socket.join(roomId)
    })

    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId)
    })

    socket.on('send-message', async ({ roomId, content }: { roomId: string; content: string }) => {
      if (!content?.trim()) return
      const trimmed = content.trim()
      const message = await Message.create({ roomId, senderId: userId, content: trimmed })
      await ChatRoom.findByIdAndUpdate(roomId, {
        lastMessage: trimmed,
        lastMessageAt: new Date(),
      })
      socket.to(roomId).emit('receive-message', {
        _id: message._id.toString(),
        roomId,
        senderId: userId,
        content: trimmed,
        createdAt: message.createdAt,
      })
    })
  })

  httpServer.once('error', (err) => {
    console.error(err)
    process.exit(1)
  })

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
