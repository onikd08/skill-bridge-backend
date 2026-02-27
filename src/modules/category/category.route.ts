import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN), CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.delete("/:id", auth(UserRole.ADMIN), CategoryController.deleteCategory);
router.put("/:id", auth(UserRole.ADMIN), CategoryController.updateCategory);

export const CategoryRoutes = router;
