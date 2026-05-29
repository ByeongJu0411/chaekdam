export interface ChatRoom {
  _id: string
  bookId: string
  bookTitle: string
  buyerId: string
  buyerName: string
  sellerId: string
  sellerName: string
  lastMessage: string
  lastMessageAt: string
  createdAt: string
}

export interface Message {
  _id: string
  roomId: string
  senderId: string
  content: string
  createdAt: string
}
