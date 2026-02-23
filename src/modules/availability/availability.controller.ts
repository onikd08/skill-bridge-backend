import { NextFunction, Request, Response } from "express";
import { AvailabilityService } from "./availability.service";

const createAvailableSlot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AvailabilityService.createAvailableSlot(
      req.body,
      req.user?.id as string,
    );
    return res.status(201).json({
      success: true,
      message: "Available slot created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAvailableTimeSlots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AvailabilityService.getAvailableTimeSlots(
      req.user?.id as string,
    );
    return res.status(200).json({
      success: true,
      message: "Available time slots fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAvailableTimeSlots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AvailabilityService.getAllAvailableTimeSlots();
    return res.status(200).json({
      success: true,
      message: "Available time slots fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAvailableTimeSlotById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AvailabilityService.getAvailableTimeSlotById(
      req.params.id as string,
    );
    return res.status(200).json({
      success: true,
      message: "Available time slot fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AvailabilityController = {
  createAvailableSlot,
  getAvailableTimeSlots,
  getAllAvailableTimeSlots,
  getAvailableTimeSlotById,
};
