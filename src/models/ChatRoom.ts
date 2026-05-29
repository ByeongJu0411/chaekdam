import mongoose from 'mongoose'

const ChatRoomSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage: { type: String, default: '' },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

ChatRoomSchema.index({ bookId: 1, buyerId: 1 }, { unique: true })

export default mongoose.models.ChatRoom || mongoose.model('ChatRoom', ChatRoomSchema)
