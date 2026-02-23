import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.user?.id as string;
    const availabilityId = req.params.availabilityId as string;
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
    next(error);
  }
};

const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingService.getAllBookings(req.user?.id as string);
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingService.getBookingById(
      req.params.bookingId as string,
      req.user?.id as string,
    );
    return res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingService.createReview(
      req.body,
      req.params.bookingId as string,
      req.user?.id as string,
    );
    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  createReview,
};
