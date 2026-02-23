import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.createUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  createUser,
  loginUser,
};
