import { Response } from "express";
interface IResPonseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

const sendResponse = <T>(res: Response, jsonData: IResPonseData<T>) => {
  const { statusCode, success, message, data } = jsonData;

  res.status(statusCode).json({ success, message, data });
};

export default sendResponse;
