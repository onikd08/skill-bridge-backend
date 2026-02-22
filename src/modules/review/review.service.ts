import { prisma } from "../../lib/prisma";

const getAllReviews = async () => {
  const reviews = await prisma.review.findMany({});
  return reviews;
};

const getReviewById = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  return review;
};

export const ReviewService = {
  getAllReviews,
  getReviewById,
};
