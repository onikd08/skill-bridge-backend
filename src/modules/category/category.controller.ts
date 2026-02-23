import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import { get } from "node:https";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
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
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
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
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const CategoryController = {
  createCategory,
  getCategories,
  deleteCategory,
};
