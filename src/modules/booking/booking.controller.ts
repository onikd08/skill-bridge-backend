import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.id as string;
    const availabilityId = req.params.id as string;
    const result = await BookingService.createBooking(
      studentId,
      availabilityId,
      req.body,
    );
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
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

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getAllBookings(req.user?.id as string);
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
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

export const BookingController = {
  createBooking,
  getAllBookings,
};
