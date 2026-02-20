import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllTutors = async () => {
  const result = await prisma.tutorProfile.findMany({
    include: {
      categories: true,
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
  return result;
};

const getTutorById = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
  if (!result) {
    throw new Error("Tutor not found");
  }
  return result;
};

const createTutorProfile = async (payload: any, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { categories, ...rest } = payload;
  if (!categories.length) {
    throw new Error("Please select at least one category");
  }

  const result = await prisma.tutorProfile.create({
    data: {
      ...rest,
      userId,
      categories: {
        connect: categories.map((id: string) => ({
          id,
        })),
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });

  return result;
};

export const TutorService = {
  getAllTutors,
  getTutorById,
  createTutorProfile,
};
