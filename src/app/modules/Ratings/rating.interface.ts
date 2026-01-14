export interface Rating {
  _id?: string;
  userId: string; // User ID who gave the rating
  bookId: string; // Book ID being rated
  rating: number; // Rating from 1 to 5
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
