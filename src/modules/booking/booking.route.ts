import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/availability/:availabilityId",
  auth(UserRole.STUDENT),
  BookingController.createBooking,
);

router.post(
  "/:bookingId/review",
  auth(UserRole.STUDENT),
  BookingController.createReview,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  BookingController.getAllBookings,
);

router.get(
  "/my-bookings",
  auth(UserRole.STUDENT),
  BookingController.getMyBookings,
);

router.get(
  "/:bookingId",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  BookingController.getBookingById,
);

router.put(
  "/:bookingId",
  auth(UserRole.STUDENT),
  BookingController.cancelBooking,
);

export const BookingRoutes = router;
