import { Request, Response, NextFunction } from "express";
import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { StatusCodes } from "http-status-codes";
import { RecommendationServices } from "./recommendation.service";

/**
 * Get personalized book recommendations for the authenticated user
 * GET /api/recommendations
 */
const getRecommendations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get userId from token (req.user.useremail contains the ObjectId)
    if (!req.user?.useremail) {
      return sendResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        message: "Authentication required. Please provide a valid token.",
        data: null,
      });
    }

    const userId = req.user.useremail.toString();
    console.log("✅ User ID from token:", userId);

    const result = await RecommendationServices.getPersonalizedRecommendations(userId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: result.fallbackUsed
        ? "Popular book recommendations (limited reading history)"
        : "Personalized recommendations retrieved successfully",
      data: result,
    });
  }
);

export const RecommendationController = {
  getRecommendations,
};
