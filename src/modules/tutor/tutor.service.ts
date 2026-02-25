import { prisma } from "../../lib/prisma";

interface ITutorProfile {
  bio?: string;
  hourlyRate: number;
  experience: number;
  categories: string[];
}

const includeTutor = {
  categories: true,
  reviews: true,
  availability: true,
  user: {
    select: {
      name: true,
      email: true,
      role: true,
      status: true,
    },
  },
};
const getAllActiveTutors = async () => {
  const result = await prisma.tutorProfile.findMany({
    where: {
      user: {
        status: "ACTIVE",
      },
    },
    include: includeTutor,
  });
  return result;
};

const getAllTutors = async () => {
  const result = await prisma.tutorProfile.findMany({
    include: includeTutor,
  });
  return result;
};

const getTutorById = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id,
    },
    include: includeTutor,
  });
  if (!result) {
    throw new Error("Tutor not found");
  }
  return result;
};

const createTutorProfile = async (payload: ITutorProfile, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingProfile = await prisma.tutorProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existingProfile) {
    throw new Error("Tutor profile already exists");
  }

  const { categories, ...rest } = payload;

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    throw new Error("Please select at least one category");
  }

  const validCategories = await prisma.category.findMany({
    where: {
      id: { in: categories },
    },
  });

  if (validCategories.length !== categories.length) {
    throw new Error("One or more categories are invalid");
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
    include: includeTutor,
  });

  return result;
};

const updateTutorProfile = async (
  id: string,
  payload: Partial<ITutorProfile>,
) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: {
      userId: id,
    },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const { categories, ...rest } = payload;

  let categoryUpdate = {};

  if (categories !== undefined) {
    if (!Array.isArray(categories) || categories.length === 0) {
      throw new Error("Please select at least one category");
    }

    const validCategories = await prisma.category.findMany({
      where: {
        id: { in: categories },
      },
    });

    if (validCategories.length !== categories.length) {
      throw new Error("One or more categories are invalid");
    }

    categoryUpdate = {
      set: categories.map((id: string) => ({
        id,
      })),
    };
  }

  const result = await prisma.tutorProfile.update({
    where: {
      userId: id,
    },
    data: {
      ...rest,
      categories: categoryUpdate,
    },
    include: includeTutor,
  });

  return result;
};

const updateTutorIsFeatured = async (tutorId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const tutor = await tx.tutorProfile.findUnique({
      where: {
        id: tutorId,
      },
    });

    if (!tutor) {
      throw new Error("Tutor not found");
    }

    return await tx.tutorProfile.update({
      where: {
        id: tutorId,
      },
      data: {
        isFeatured: !tutor.isFeatured,
      },
      include: includeTutor,
    });
  });

  return result;
};

export const TutorService = {
  getAllActiveTutors,
  getTutorById,
  createTutorProfile,
  updateTutorProfile,
  updateTutorIsFeatured,
  getAllTutors,
};
