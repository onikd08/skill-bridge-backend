import { prisma } from "../../lib/prisma";

const bookingInclude = {
  review: true,
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

const createReview = async (
  payload: {
    rating: number;
    comment?: string;
  },
  bookingId: string,
  studentId: string,
) => {
  const result = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findFirst({
      where: {
        id: bookingId,
        status: "COMPLETED",
        studentId,
        student: {
          status: "ACTIVE",
        },
      },
      include: {
        review: true,
        tutor: true,
      },
    });

    if (!booking)
      throw new Error("Booking not found or status is not completed");

    if (booking.review) throw new Error("Review already created");

    if (payload.rating < 1 || payload.rating > 5)
      throw new Error("Rating must be between 1 and 5");

    const review = await tx.review.create({
      data: {
        rating: payload.rating,
        comment: payload.comment,
        bookingId,
        studentId,
        tutorId: booking.tutorId,
      },
      include: {
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
                role: true,
                status: true,
              },
            },
          },
        },
      },
    });

    const tutor = booking.tutor;

    const newTotalReviews = tutor.totalReviews + 1;

    const newAverageRating = parseFloat(
      (
        (tutor.averageRating * tutor.totalReviews + payload.rating) /
        newTotalReviews
      ).toFixed(2),
    );

    await tx.tutorProfile.update({
      where: { id: tutor.id },
      data: {
        totalReviews: newTotalReviews,
        averageRating: newAverageRating,
      },
    });

    return review;
  });

  return result;
};

const getMyBookings = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      studentId: userId,
    },
    include: bookingInclude,
  });
  return result;
};

const cancelBooking = async (userId: string, bookingId: string) => {
  return await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findFirst({
      where: {
        id: bookingId,
        studentId: userId,
        status: "CONFIRMED",
      },
    });

    if (!booking) {
      throw new Error("Booking can not be cancled");
    }

    await tx.availability.update({
      where: {
        id: booking.availabilityId,
      },
      data: {
        isBooked: false,
      },
    });

    const deleteBooking = await tx.booking.delete({
      where: {
        id: bookingId,
      },
    });

    return deleteBooking;
  });
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  createReview,
  getMyBookings,
  cancelBooking,
};
