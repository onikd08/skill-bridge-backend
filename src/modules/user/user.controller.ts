import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getUserById(req.params.id as string);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
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
    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getUserById,
  updateUserStatus,
};
