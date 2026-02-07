import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { specialityService } from "./speciality.service";

const createSpeciality = catchAsync(async (req: Request, res: Response) => {
  const result = await specialityService.createSpeciality(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Speciality created successfully",
    data: result,
  });
});

export const specialityController = {
  createSpeciality,
};
