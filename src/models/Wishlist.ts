import mongoose from 'mongoose'

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Ensure a user can only wishlist a book once
WishlistSchema.index({ userId: 1, bookId: 1 }, { unique: true })

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema)
