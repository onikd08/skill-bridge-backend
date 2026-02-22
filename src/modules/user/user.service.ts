import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      tutorProfile: true,
    },
    omit: {
      password: true,
    },
  });
};

const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      tutorProfile: true,
    },
    omit: {
      password: true,
    },
  });
};

const updateUserStatus = async (userId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tutorProfile: true,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        status: user.status === "ACTIVE" ? "BANNED" : "ACTIVE",
      },
      include: {
        tutorProfile: true,
      },
      omit: {
        password: true,
      },
    });

    return updatedUser;
  });

  return result;
};

export const UserService = {
  getAllUsers,
  updateUserStatus,
  getUserById,
};
