import { Availability } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createAvailableSlot = async (
  payload: Omit<Availability, "id" | "createdAt" | "updatedAt" | "tutorId">,
  userId: string,
) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: {
      userId,
    },
  });
  if (!tutor) {
    throw new Error("Tutor not found");
  }
  const startTime = new Date(payload.startTime).getTime();
  const endTime = new Date(payload.endTime).getTime();

  if (endTime <= startTime) {
    throw new Error("End time must be after start time");
  }

  const result = await prisma.availability.create({
    data: {
      tutorId: tutor.id,
      ...payload,
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

export const AvailabilityService = {
  createAvailableSlot,
};
