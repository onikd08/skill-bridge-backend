import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();
    sendSuccessResponse(res, 200, "All users fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getUserById(req.user?.id as string);
    sendSuccessResponse(res, 200, "User fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await UserService.updateUserStatus(req.params.id as string);
    sendSuccessResponse(res, 200, `User is now ${result.status}`, result);
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await UserService.updateUserInfo(
      req.user?.id as string,
      req.body,
    );
    sendSuccessResponse(res, 200, "User info updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getUserById,
  updateUserStatus,
  updateUserInfo,
};
