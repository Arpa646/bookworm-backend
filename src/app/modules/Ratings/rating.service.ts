import mongoose from "mongoose";
import { Rating } from "./rating.interface";
import RatingModel from "./rating.model";

const createRating = async (ratingData: Rating) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    console.log("   📊 Database: Starting transaction...");
    
    // Check if user already rated this book
    const existingRating = await RatingModel.findOne({
      userId: ratingData.userId,
      bookId: ratingData.bookId,
      isDeleted: false,
    });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = ratingData.rating;
      const updatedRating = await existingRating.save({ session });
      await session.commitTransaction();
      session.endSession();
      console.log("   📊 Database: Rating updated successfully");
      return [updatedRating];
    } else {
      // Create new rating
      const newRating = await RatingModel.create([ratingData], { session });
      await session.commitTransaction();
      session.endSession();
      console.log("   📊 Database: Rating saved successfully");
      return newRating;
    }
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.error("   ❌ Database Error:", err.message);
    throw new Error(err);
  }
};

const getAllRatingsFromDB = async () => {
  const result = await RatingModel.find({ isDeleted: false })
    .populate("userId", "name email")
    .populate("bookId", "title author")
    .sort({ createdAt: -1 });
  return result;
};

const getRatingByIdFromDB = async (id: string) => {
  const result = await RatingModel.findOne({ _id: id, isDeleted: false })
    .populate("userId", "name email")
    .populate("bookId", "title author");
  return result;
};

const getRatingsByBookId = async (bookId: string) => {
  const result = await RatingModel.find({ 
    bookId: new mongoose.Types.ObjectId(bookId), 
    isDeleted: false 
  })
    .populate("userId", "name email")
    .populate("bookId", "title author coverImage")
    .sort({ createdAt: -1 });
  return result;
};

const getAverageRatingByBookId = async (bookId: string) => {
  const result = await RatingModel.aggregate([
    {
      $match: {
        bookId: new mongoose.Types.ObjectId(bookId),
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$bookId",
        averageRating: { $avg: "$rating" },
        totalRatings: { $sum: 1 },
      },
    },
  ]);
  
  if (result.length === 0) {
    return {
      averageRating: 0,
      totalRatings: 0,
    };
  }
  
  return {
    averageRating: Math.round(result[0].averageRating * 10) / 10,
    totalRatings: result[0].totalRatings,
  };
};

const getRatingsByUserId = async (userId: string) => {
  const result = await RatingModel.find({ userId, isDeleted: false })
    .populate("bookId", "title author")
    .sort({ createdAt: -1 });
  return result;
};

const getRatingByUserIdAndBookId = async (userId: string, bookId: string) => {
  const result = await RatingModel.findOne({ 
    userId: new mongoose.Types.ObjectId(userId),
    bookId: new mongoose.Types.ObjectId(bookId),
    isDeleted: false 
  })
    .populate("userId", "name email")
    .populate("bookId", "title author coverImage");
  return result;
};

const updateRating = async (id: string, updatedData: Partial<Rating>) => {
  try {
    const rating = await RatingModel.findById(id);

    if (!rating) {
      return null;
    }

    if (updatedData.rating !== undefined) rating.rating = updatedData.rating;

    const updatedRating = await rating.save();
    return updatedRating;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};

const deleteRatingInDB = async (id: string) => {
  const result = await RatingModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const RatingServices = {
  createRating,
  getAllRatingsFromDB,
  getRatingByIdFromDB,
  getRatingsByBookId,
  getAverageRatingByBookId,
  getRatingsByUserId,
  getRatingByUserIdAndBookId,
  updateRating,
  deleteRatingInDB,
};
