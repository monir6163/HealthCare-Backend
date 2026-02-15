import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.registerPatient(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});

const loginPatient = catchAsync(async (req: Request, res: Response) => {
  const response = await AuthService.loginPatient(req.body);
  response.headers.forEach((value, key) => {
    res.append(key, value);
  });
  const data = await response.json();

  sendResponse(res, {
    statusCode: response.status,
    success: true,
    message: "Patient logged in successfully",
    data: data,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const userId = req.user?.id;
  payload.userId = userId!;
  const result = await AuthService.changePassword(payload, req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const AuthController = {
  registerPatient,
  loginPatient,
  changePassword,
};
