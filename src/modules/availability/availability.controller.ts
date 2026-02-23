import { NextFunction, Request, Response } from "express";
import { AvailabilityService } from "./availability.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import { send } from "node:process";

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
    sendSuccessResponse(
      res,
      201,
      "Available slot created successfully",
      result,
    );
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
    sendSuccessResponse(
      res,
      200,
      "Available time slots fetched successfully",
      result,
    );
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
    sendSuccessResponse(
      res,
      200,
      "Available time slots fetched successfully",
      result,
    );
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
    sendSuccessResponse(
      res,
      200,
      "Available time slot fetched successfully",
      result,
    );
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
