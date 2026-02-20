import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllTutors = async () => {
  const result = await prisma.tutorProfile.findMany({
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

const getTutorById = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id,
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
  if (!result) {
    throw new Error("Tutor not found");
  }
  return result;
};

const createTutorProfile = async (
  payload: Omit<
    TutorProfile,
    "id" | "createdAt" | "updatedAt" | "userId" | "isFeatured"
  >,
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.tutorProfile.create({
    data: {
      ...payload,
      userId,
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
