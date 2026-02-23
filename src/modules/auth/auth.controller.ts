import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.createUser(req.body);
    sendSuccessResponse(res, 201, "User created successfully", result);
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body);
    sendSuccessResponse(res, 200, "User logged in successfully", result);
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  createUser,
  loginUser,
};
