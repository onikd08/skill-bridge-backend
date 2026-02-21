import { prisma } from "../../lib/prisma";

const bookingInclude = {
  availability: {
    select: {
      startTime: true,
      endTime: true,
      isBooked: true,
      totalPrice: true,
    },
  },
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
};
const createBooking = async (
  studentId: string,
  availabilityId: string,
  payload: {
    notes?: string;
  },
) => {
  const result = await prisma.$transaction(async (tx) => {
    const student = await tx.user.findFirst({
      where: {
        id: studentId,
        role: "STUDENT",
        status: "ACTIVE",
      },
    });
    if (!student) throw new Error("Student is not active or not found");

    const availability = await tx.availability.findUnique({
      where: {
        id: availabilityId,
      },
    });

    if (!availability) throw new Error("Availability not found");

    if (availability.isBooked) {
      throw new Error("This slot is already booked");
    }

    if (availability.tutorId === studentId) {
      throw new Error("You cannot book your own slot");
    }

    const bookingData = {
      tutorId: availability.tutorId,
      studentId,
      availabilityId,
      ...payload,
    };

    await tx.availability.update({
      where: {
        id: availabilityId,
      },
      data: {
        isBooked: true,
      },
    });

    const booking = await tx.booking.create({
      data: bookingData,
      include: bookingInclude,
    });

    return booking;
  });

  return result;
};

const getAllBookings = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });
  if (!user) throw new Error("User not found");

  let result;

  switch (user.role) {
    case "ADMIN":
      result = await prisma.booking.findMany({
        include: bookingInclude,
      });
      break;

    case "STUDENT":
      result = await prisma.booking.findMany({
        where: {
          studentId: userId,
        },
        include: bookingInclude,
      });
      break;

    case "TUTOR":
      result = await prisma.booking.findMany({
        where: {
          tutor: {
            userId,
          },
        },
        include: bookingInclude,
      });
      break;

    default:
      break;
  }

  return result;
};

const getBookingById = async (id: string, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user) throw new Error("User not found");

  let booking;

  if (user.role === "ADMIN") {
    booking = await prisma.booking.findUnique({
      where: { id },
      include: bookingInclude,
    });
  }

  if (user.role === "STUDENT") {
    booking = await prisma.booking.findFirst({
      where: {
        id,
        studentId: userId,
      },
      include: bookingInclude,
    });
  }

  if (user.role === "TUTOR") {
    booking = await prisma.booking.findFirst({
      where: {
        id,
        tutor: {
          userId: userId,
        },
      },
      include: bookingInclude,
    });
  }

  if (!booking) {
    throw new Error("Booking not found or access denied");
  }

  return booking;
};
export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
};
