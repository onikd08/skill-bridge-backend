import { Availability } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createAvailableSlot = async (
  payload: Omit<Availability, "id" | "createdAt" | "updatedAt" | "tutorId">,
  userId: string,
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      role: "TUTOR",
      status: "ACTIVE",
    },
  });

  if (!user) {
    throw new Error("User is not active or not found");
  }

  const tutor = await prisma.tutorProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const startDate = new Date(payload.startTime);
  const endDate = new Date(payload.endTime);

  if (startDate <= new Date()) {
    throw new Error("Start time must be in the future");
  }

  if (endDate <= startDate) {
    throw new Error("End time must be after start time");
  }

  const durationInHour =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  if (durationInHour < 1 || durationInHour > 3) {
    throw new Error("Duration must be between 1 and 3 hours");
  }

  const overlapping = await prisma.availability.findFirst({
    where: {
      tutorId: tutor.id,
      AND: [{ startTime: { lt: endDate } }, { endTime: { gt: startDate } }],
    },
  });

  if (overlapping) {
    throw new Error("Availability overlaps with existing slot");
  }
  const totalPrice = durationInHour * tutor.hourlyRate;

  const result = await prisma.availability.create({
    data: {
      tutorId: tutor.id,
      ...payload,
      totalPrice,
    },
    include: {
      tutorProfile: {
        select: {
          bio: true,
          experience: true,
          hourlyRate: true,
          isFeatured: true,
          user: {
            select: {
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const getAvailableTimeSlots = async (userId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: {
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

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const result = await prisma.availability.findMany({
    where: {
      tutorId: tutor.id,
    },
    include: {
      tutorProfile: {
        select: {
          bio: true,
          experience: true,
          hourlyRate: true,
          isFeatured: true,
          user: {
            select: {
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const getAllAvailableTimeSlots = async () => {
  const result = await prisma.availability.findMany({
    include: {
      tutorProfile: {
        select: {
          bio: true,
          experience: true,
          hourlyRate: true,
          isFeatured: true,
          user: {
            select: {
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const getAvailableTimeSlotById = async (id: string) => {
  const result = await prisma.availability.findUnique({
    where: {
      id,
    },
    include: {
      tutorProfile: {
        select: {
          bio: true,
          experience: true,
          hourlyRate: true,
          isFeatured: true,
          user: {
            select: {
              name: true,
              email: true,
              role: true,
              status: true,
            },
          },
        },
      },
    },
  });
  if (!result) {
    throw new Error("Availability not found");
  }
  return result;
};

export const AvailabilityService = {
  createAvailableSlot,
  getAvailableTimeSlots,
  getAllAvailableTimeSlots,
  getAvailableTimeSlotById,
};
