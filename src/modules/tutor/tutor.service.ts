import { prisma } from "../../lib/prisma";

const getAllTutors = async () => {
  const result = await prisma.tutorProfile.findMany({});
  return result;
};

const getTutorById = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new Error("Tutor not found");
  }
  return result;
};

export const TutorService = {
  getAllTutors,
  getTutorById,
};
