import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import config from "../config";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // Prisma Known Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;

    switch (error.code) {
      // Unique constraint failed
      case "P2002":
        message = `Duplicate value for field: ${error.meta?.target}`;
        break;

      // Record not found
      case "P2025":
        message = "Record not found";
        break;

      // Foreign key constraint failed
      case "P2003":
        message = "Invalid reference ID";
        break;

      default:
        message = "Database error occurred";
    }
  }

  //  Prisma Validation Error
  else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data provided";
  }

  // Prisma Unknown Request Error
  else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Error occurred during query execution";
  }

  // Prisma Client Initialization Error
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    if (error.errorCode === "P1001") {
      statusCode = 401;
      message = "Authentication failed, please check your credentials";
    } else if (error.errorCode === "P1000") {
      statusCode = 400;
      message = "Can't connect to database";
    }
  }

  //  Custom thrown error
  else if (error instanceof Error) {
    statusCode = 400;
    message = error.message;
  }

  //  Final Response
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error: config.node_env === "development" ? error : undefined,
  });
};

export default globalErrorHandler;
