import { Router } from "express";
import { ReviewController } from "./review.controller";

const router = Router();

router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);

export const ReviewRoutes = router;
