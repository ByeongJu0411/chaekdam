export type BookStatus = 'selling' | 'reserved' | 'sold'
export type BookCondition = 'new' | 'good' | 'fair' | 'poor'

export interface Book {
  _id: string
  title: string
  author: string
  publisher: string
  price: number
  condition: BookCondition
  status: BookStatus
  category: string
  description: string
  images: string[]
  sellerId: string
  sellerName: string
  createdAt: string
  updatedAt: string
}

export interface BookForm {
  title: string
  author: string
  publisher: string
  price: number
  condition: BookCondition
  category: string
  description: string
  images: string[]
}

export interface BookFilter {
  category?: string
  condition?: BookCondition
  status?: BookStatus
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: 'latest' | 'price_asc' | 'price_desc'
  page?: number
}
