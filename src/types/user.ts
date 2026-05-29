export interface User {
  _id: string
  email: string
  name: string
  profileImage?: string
  createdAt: string
}

export interface UserProfile {
  name: string
  profileImage?: string
}

export interface SessionPayload {
  userId: string
  expiresAt: Date
}
