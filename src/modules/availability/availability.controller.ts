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

export const AvailabilityController = {
  createAvailableSlot,
};
