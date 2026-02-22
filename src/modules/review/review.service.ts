import { email } from "zod";
import { prisma } from "../../lib/prisma";

const reviewInclude = {
  student: {
    select: {
      name: true,
      email: true,
      role: true,
      status: true,
    },
  },
  tutor: {
    select: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  },
};

const getAllReviews = async () => {
  const reviews = await prisma.review.findMany({
    include: reviewInclude,
  });
  return reviews;
};

const getReviewById = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
    include: reviewInclude,
  });
  return review;
};

export const ReviewService = {
  getAllReviews,
  getReviewById,
};
