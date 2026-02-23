import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import { get } from "node:https";
import sendSuccessResponse from "../../utils/sendSuccessResponse";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    sendSuccessResponse(res, 201, "Category created successfully", result);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.getCategories();
    sendSuccessResponse(res, 200, "Categories fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.deleteCategory(
      req.params.id as string,
    );
    sendSuccessResponse(res, 200, "Category deleted successfully", result);
  } catch (error) {
    next(error);
  }
};
export const CategoryController = {
  createCategory,
  getCategories,
  deleteCategory,
};
