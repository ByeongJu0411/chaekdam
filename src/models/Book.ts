import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '도서명을 입력해주세요.'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, '저자를 입력해주세요.'],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, '출판사를 입력해주세요.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, '가격을 입력해주세요.'],
      min: 0,
    },
    condition: {
      type: String,
      required: [true, '도서 상태를 선택해주세요.'],
      enum: ['new', 'good', 'fair', 'poor'],
    },
    status: {
      type: String,
      required: true,
      enum: ['selling', 'reserved', 'sold'],
      default: 'selling',
    },
    category: {
      type: String,
      required: [true, '카테고리를 선택해주세요.'],
    },
    description: {
      type: String,
      required: [true, '상세 설명을 입력해주세요.'],
    },
    images: {
      type: [String],
      default: [],
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Book || mongoose.model('Book', BookSchema)
