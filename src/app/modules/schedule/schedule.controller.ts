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

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.getAllSchedules();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedules retrieved successfully",
    data: result,
  });
});

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.getScheduleById(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule retrieved successfully",
    data: result,
  });
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const scheduleData = req.body;
  const result = await ScheduleService.updateSchedule(
    id as string,
    scheduleData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule updated successfully",
    data: result,
  });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.deleteSchedule(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
