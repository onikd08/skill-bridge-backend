import express from "express";
import { TutorController } from "./tutor.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post("/", auth(UserRole.TUTOR), TutorController.createTutorProfile);
router.get("/", TutorController.getAllTutors);
router.get("/:id", TutorController.getTutorById);

export const TutorRoutes = router;
