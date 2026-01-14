import { Request, Response, NextFunction } from "express";
import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { StatusCodes } from "http-status-codes";
import { RatingServices } from "./rating.service";
import { Rating } from "./rating.interface";

const createRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    

    const { bookId, rating } = req.body;

    // Log request body
    console.log("\n📋 Request Body:");
    console.log("   Book ID:", bookId);
    console.log("   Rating:", rating);

    // Debug: Log authentication info
    console.log("\n🔐 Authentication Check:");
    if (req.user) {
      console.log("   ✅ req.user exists");
      console.log("   🔑 req.user.useremail:", req.user.useremail);
    } else {
      console.log("   ❌ req.user is undefined or null");
    }

    // Get userId from token (req.user.useremail contains the user ObjectId)
    if (!req.user || !req.user.useremail) {
     
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required. Please login to create a rating.",
      });
    }

    const userId = req.user.useremail.toString();
  

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      console.log("\n❌ VALIDATION FAILED");
      console.log("   Invalid rating:", rating);
      console.log("   Required: Rating must be between 1 and 5");
      console.log("=".repeat(60) + "\n");
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const ratingData: Rating = {
      userId,
      bookId,
      rating,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    
    const result = await RatingServices.createRating(ratingData as any);
    
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Rating created/updated successfully",
      data: result,
    });
  }
);

const getAllRatings = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await RatingServices.getAllRatingsFromDB();

    if (!result || result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No ratings found",
        data: [],
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Ratings retrieved successfully",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Unknown server error",
      });
    }
  }
});

const getSingleRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rating = await RatingServices.getRatingByIdFromDB(id);

    if (!rating) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Rating not found",
        data: null,
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Rating retrieved successfully",
      data: rating,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Unknown server error",
      });
    }
  }
};

const getRatingsByBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  
  console.log("⭐ Getting ratings for book ID:", bookId);
  
  if (!bookId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Book ID is required",
    });
  }

  const ratings = await RatingServices.getRatingsByBookId(bookId);
  const averageRating = await RatingServices.getAverageRatingByBookId(bookId);

  console.log(`✅ Found ${ratings.length} ratings for book ${bookId}`);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ratings.length > 0 
      ? "Ratings retrieved successfully" 
      : "No ratings found for this book",
    data: {
      ratings,
      averageRating: averageRating.averageRating,
      totalRatings: averageRating.totalRatings,
    },
  });
});

const getAverageRatingByBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  
  if (!bookId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Book ID is required",
    });
  }

  const averageRating = await RatingServices.getAverageRatingByBookId(bookId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Average rating retrieved successfully",
    data: averageRating,
  });
});

const getRatingsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const ratings = await RatingServices.getRatingsByUserId(userId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Ratings retrieved successfully",
      data: ratings,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Unknown server error",
      });
    }
  }
};

const getMyRatingByBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    
    console.log("⭐ Getting user's rating for book ID:", bookId);
    
    // Get userId from token
    if (!req.user || !req.user.useremail) {
      console.log("\n❌ AUTHENTICATION FAILED");
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required. Please login to get your rating.",
      });
    }

    const userId = req.user.useremail.toString();
    console.log("   User ID from token:", userId);
    
    if (!bookId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const rating = await RatingServices.getRatingByUserIdAndBookId(userId, bookId);

    if (!rating) {
      console.log(`   No rating found for user ${userId} and book ${bookId}`);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "No rating found",
        data: null,
      });
      return;
    }

    console.log(`✅ Found rating: ${rating.rating} for book ${bookId}`);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Rating retrieved successfully",
      data: rating,
    });
  }
);

const updateRating = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating } = req.body;
  
  console.log("🔄 Rating Update Request:");
  console.log("   Rating ID:", id);
  console.log("   New Rating:", rating);
  
  try {
    if (!id) {
      console.log("❌ Rating ID is missing");
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        success: false,
        message: "Rating ID is required" 
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      console.log("❌ Invalid rating:", rating);
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const updatedRating = await RatingServices.updateRating(id, {
      rating,
    });

    if (!updatedRating) {
      console.log("❌ Rating not found with ID:", id);
      return res.status(StatusCodes.NOT_FOUND).json({ 
        success: false,
        message: "Rating not found" 
      });
    }

    console.log("✅ Rating updated successfully!");

    return res.status(StatusCodes.OK).json({ 
      success: true,
      message: "Rating updated successfully", 
      data: updatedRating 
    });
  } catch (error) {
    console.error("❌ Error updating rating:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

const deleteRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await RatingServices.deleteRatingInDB(id);
      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          statusCode: StatusCodes.NOT_FOUND,
          message: "Rating not found",
          data: null,
        });
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Rating deleted successfully",
        data: result,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Error deleting rating",
          error: error.message,
        });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Error deleting rating",
          error: "An unexpected error occurred.",
        });
      }
    }
  }
);

export const RatingController = {
  createRating,
  getAllRatings,
  getSingleRating,
  getRatingsByBook,
  getAverageRatingByBook,
  getRatingsByUser,
  getMyRatingByBook,
  updateRating,
  deleteRating,
};
