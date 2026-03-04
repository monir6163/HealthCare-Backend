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
    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");
    const startDateTime = new Date(currentDate);
    startDateTime.setHours(
      parseInt(startTimeParts[0]),
      parseInt(startTimeParts[1]),
    );
    const endDateTime = new Date(currentDate);
    endDateTime.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));
    schedules.push({ start: startDateTime, end: endDateTime });
    currentDate.setMinutes(currentDate.getMinutes() + interval);
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
