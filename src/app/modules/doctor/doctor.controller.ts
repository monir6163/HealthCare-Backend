import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {});

export const doctorController = {
  getAllDoctors,
};
