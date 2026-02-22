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
  "/:bookingId",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  BookingController.getBookingById,
);

export const BookingRoutes = router;
