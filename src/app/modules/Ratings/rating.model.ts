import { Rating } from './rating.interface';
import mongoose, { Schema, Model } from "mongoose";

const ratingSchema = new Schema<Rating>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  } as any,
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  } as any,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Create a unique index to allow only one rating per user per book
ratingSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const RatingModel: Model<Rating> = mongoose.model<Rating>(
  "Rating",
  ratingSchema
);

export default RatingModel;
