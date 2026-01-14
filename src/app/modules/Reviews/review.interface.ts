export interface Review {
  _id?: string;
  userId: string; // User ID who wrote the review
  bookId: string; // Book ID being reviewed
  comment: string; // Required comment for reviews
  status: "pending" | "approved"; // Review status
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
