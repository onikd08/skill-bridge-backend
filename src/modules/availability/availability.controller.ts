import { Request, Response } from "express";
import { AvailabilityService } from "./availability.service";

const createAvailableSlot = async (req: Request, res: Response) => {
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
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

const getAvailableTimeSlots = async (req: Request, res: Response) => {
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
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

const getAllAvailableTimeSlots = async (req: Request, res: Response) => {
  try {
    const result = await AvailabilityService.getAllAvailableTimeSlots();
    return res.status(200).json({
      success: true,
      message: "Available time slots fetched successfully",
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

export const AvailabilityController = {
  createAvailableSlot,
  getAvailableTimeSlots,
  getAllAvailableTimeSlots,
};
