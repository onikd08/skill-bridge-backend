import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

//availabilityId
router.post("/:id", auth(UserRole.STUDENT), BookingController.createBooking);
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  BookingController.getAllBookings,
);

//bookingId
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  BookingController.getBookingById,
);

export const BookingRoutes = router;
