import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { get } from "node:https";

const createCategory = async (req: Request, res: Response) => {
  try {
    // if (!req.user || req.user.role !== "ADMIN")
    //   return res.status(401).json({ success: false, message: "Unauthorized" });
    const result = await CategoryService.createCategory(req.body);
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
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

const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getCategories();
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
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

const deleteCategory = async (req: Request, res: Response) => {
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
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};
export const CategoryController = {
  createCategory,
  getCategories,
  deleteCategory,
};
