import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const scheduleData = req.body;
  const result = await ScheduleService.createSchedule(scheduleData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
};
