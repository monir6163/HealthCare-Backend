import { addHours, addMinutes, format } from "date-fns";
import {
  ICreateSchedulePayload,
  IUpdateSchedulePayload,
} from "./schedule.interface";

const createSchedule = async (payload: ICreateSchedulePayload) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const interval = 30;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const schedules = [];
  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]),
        ),
        Number(startTime.split(":")[1]),
      ),
    );
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]),
        ),
        Number(endTime.split(":")[1]),
      ),
    );
    while (startDateTime < endDateTime) {}
  }
  return { startDate, endDate, startTime, endTime };
};

const getAllSchedules = async () => {
  return [];
};

const getScheduleById = async (id: string) => {
  return { id };
};

const updateSchedule = async (id: string, payload: IUpdateSchedulePayload) => {
  return { id, ...payload };
};

const deleteSchedule = async (id: string) => {
  return { id };
};

export const ScheduleService = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
