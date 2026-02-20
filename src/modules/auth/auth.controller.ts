import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.createUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

export const AuthController = {
  createUser,
  loginUser,
};
