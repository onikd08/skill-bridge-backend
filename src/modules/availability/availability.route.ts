import express from "express";
import { AvailabilityController } from "./availability.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.TUTOR),
  AvailabilityController.createAvailableSlot,
);

router.get(
  "/",
  auth(UserRole.TUTOR),
  AvailabilityController.getAvailableTimeSlots,
);

router.get(
  "/all",
  auth(UserRole.ADMIN),
  AvailabilityController.getAllAvailableTimeSlots,
);

router.get("/:id", AvailabilityController.getAvailableTimeSlotById);
router.delete("/:availabilityId", AvailabilityController.deleteAvailability);

export const AvailabilityRoutes = router;
