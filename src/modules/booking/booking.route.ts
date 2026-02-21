import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post("/:id", auth(UserRole.STUDENT), BookingController.createBooking);

export const BookingRoutes = router;
