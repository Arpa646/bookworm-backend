import express from "express";
import { RatingController } from "./rating.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../Registration/user.constant";

const router = express.Router();

// Create rating (user and admin)
router.post("/", auth(USER_ROLE.user, USER_ROLE.admin), RatingController.createRating);

// Get all ratings (public)
router.get("/", RatingController.getAllRatings);

// Get ratings by book (public)
router.get("/book/:bookId", RatingController.getRatingsByBook);

// Get average rating by book (public)
router.get("/book/:bookId/average", RatingController.getAverageRatingByBook);

// Get authenticated user's rating for a specific book (auth required)
router.get("/book/:bookId/my-rating", auth(USER_ROLE.user, USER_ROLE.admin), RatingController.getMyRatingByBook);

// Get ratings by user (public)
router.get("/user/:userId", RatingController.getRatingsByUser);

// Get single rating (public)
router.get("/:id", RatingController.getSingleRating);

// Update rating (user and admin - can only update their own rating)
router.put("/:id", auth(USER_ROLE.user, USER_ROLE.admin), RatingController.updateRating);

// Delete rating (user and admin)
router.delete("/:id", auth(USER_ROLE.user, USER_ROLE.admin), RatingController.deleteRating);

export const RatingRoutes = router;
