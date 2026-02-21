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

export const AvailabilityRoutes = router;
