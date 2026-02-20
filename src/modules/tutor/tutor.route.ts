import express from "express";
import { TutorController } from "./tutor.controller";

const router = express.Router();

router.get("/", TutorController.getAllTutors);
router.get("/:id", TutorController.getTutorById);

export const TutorRoutes = router;
