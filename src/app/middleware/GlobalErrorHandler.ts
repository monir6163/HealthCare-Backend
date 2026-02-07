import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { handleZodError } from "./handleZodError";

interface ErrorWithDetails extends Error {
  statusCode?: number;
  errors?: unknown;
}

const globalErrorHandler = (
  err: ErrorWithDetails,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let errors: unknown;

  /* -------------------- ZOD VALIDATION ERROR -------------------- */
  if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Validation failed";
    errors = handleZodError(err);
  } else {
    /* -------------------- CUSTOM / GENERIC ERROR -------------------- */
    statusCode = err.statusCode || statusCode;
    message = err.message || message;
    errors = err.errors || null;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(err?.stack ? { stack: err?.stack } : {}),
  });
};

export default globalErrorHandler;
