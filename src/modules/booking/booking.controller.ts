import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";

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
    sendSuccessResponse(res, 201, "Booking created successfully", result);
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
    sendSuccessResponse(res, 200, "Bookings fetched successfully", result);
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
    sendSuccessResponse(res, 200, "Booking fetched successfully", result);
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
    sendSuccessResponse(res, 201, "Review created successfully", result);
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingService.cancelBooking(
      req.user?.id as string,
      req.params.bookingId as string,
    );
    sendSuccessResponse(res, 200, "Booking cancelled successfully", result);
  } catch (error) {
    next(error);
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  createReview,
  cancelBooking,
};
