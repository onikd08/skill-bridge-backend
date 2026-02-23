import { NextFunction, Request, Response } from "express";
import { TutorService } from "./tutor.service";

const getAllActiveTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.getAllActiveTutors();
    return res.status(200).json({
      success: true,
      message: "Tutors fetched successfully",
      data: result,
    });
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
    return res.status(200).json({
      success: true,
      message: "Tutor fetched successfully",
      data: result,
    });
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
    return res.status(201).json({
      success: true,
      message: "Tutor created successfully",
      data: result,
    });
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
    return res.status(200).json({
      success: true,
      message: "Tutor updated successfully",
      data: result,
    });
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
      req.params.tutorId as string,
    );
    return res.status(200).json({
      success: true,
      message: "IsFeatured updated successfully",
      data: result,
    });
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
    return res.status(200).json({
      success: true,
      message: "Tutors fetched successfully",
      data: result,
    });
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
};
