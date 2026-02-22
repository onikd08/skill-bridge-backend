import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getAllReviews();
    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
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

const getReviewById = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getReviewById(req.params.id as string);
    return res.status(200).json({
      success: true,
      message: "Review fetched successfully",
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

export const ReviewController = {
  getAllReviews,
  getReviewById,
};
