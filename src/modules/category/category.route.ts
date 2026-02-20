import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN), CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.delete("/:id", auth(UserRole.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;
