import { NextFunction, Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReviewService.getAllReviews();
    sendSuccessResponse(res, 200, "Reviews fetched successfully", result);
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
    sendSuccessResponse(res, 200, "Review fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  getAllReviews,
  getReviewById,
};
