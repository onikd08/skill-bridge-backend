import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);
router.get("/:id", auth(UserRole.ADMIN), UserController.getUserById);
router.put(
  "/status/:id",
  auth(UserRole.ADMIN),
  UserController.updateUserStatus,
);

export const UserRoutes = router;
