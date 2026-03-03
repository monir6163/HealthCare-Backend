import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IQueryParams } from "../../helper/query.interface";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { doctorService } from "./doctor.service";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await doctorService.getAllDoctors(query as IQueryParams);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctors retrieved successfully",
    data: result,
  });
});

export const doctorController = {
  getAllDoctors,
};
