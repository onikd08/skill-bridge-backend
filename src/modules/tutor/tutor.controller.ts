import { NextFunction, Request, Response } from "express";
import { TutorService } from "./tutor.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";

const getAllActiveTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.getAllActiveTutors();
    sendSuccessResponse(
      res,
      200,
      "All Active Tutors fetched successfully",
      result,
    );
  } catch (error) {
    next(error);
  }
};

const getTutorById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.getTutorById(req.params.id as string);
    sendSuccessResponse(res, 200, "Tutor fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const createTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.createTutorProfile(
      req.body,
      req.user?.id,
    );
    sendSuccessResponse(res, 201, "Tutor created successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.updateTutorProfile(
      req.user?.id as string,
      req.body,
    );
    sendSuccessResponse(res, 200, "Tutor updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateTutorIsFeatured = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.updateTutorIsFeatured(
      req.params.userId as string,
    );
    sendSuccessResponse(
      res,
      200,
      `Tutor is now marked ${result.isFeatured ? "featured" : "not featured"}`,
      result,
    );
  } catch (error) {
    next(error);
  }
};

const getAllTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.getAllTutors();
    sendSuccessResponse(res, 200, "All tutors fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const getTutorProfileByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.getTutorProfileByUserId(
      req.user?.id as string,
    );
    sendSuccessResponse(res, 200, "Tutor fetched successfully", result);
  } catch (error) {
    next(error);
  }
};
export const TutorController = {
  getAllActiveTutors,
  getTutorById,
  createTutorProfile,
  updateTutorProfile,
  updateTutorIsFeatured,
  getAllTutors,
  getTutorProfileByUserId,
};
