import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.get("/all-users", auth(UserRole.ADMIN), UserController.getAllUsers);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  UserController.getUserById,
);
router.put(
  "/status/:id",
  auth(UserRole.ADMIN),
  UserController.updateUserStatus,
);

router.put(
  "/",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  UserController.updateUserInfo,
);

export const UserRoutes = router;
