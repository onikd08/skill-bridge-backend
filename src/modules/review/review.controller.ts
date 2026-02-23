import { NextFunction, Request, Response } from "express";
import { ReviewService } from "./review.service";

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.getAllReviews();
    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.getReviewById(req.params.id as string);
    return res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  getAllReviews,
  getReviewById,
};
