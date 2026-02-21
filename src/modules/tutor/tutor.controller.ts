import { Request, Response } from "express";
import { TutorService } from "./tutor.service";

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getAllTutors();
    return res.status(200).json({
      success: true,
      message: "Tutors fetched successfully",
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

const getTutorById = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getTutorById(req.params.id as string);
    return res.status(200).json({
      success: true,
      message: "Tutor fetched successfully",
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

const createTutorProfile = async (req: Request, res: Response) => {
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
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

const updateTutorProfile = async (req: Request, res: Response) => {
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
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

export const TutorController = {
  getAllTutors,
  getTutorById,
  createTutorProfile,
  updateTutorProfile,
};
