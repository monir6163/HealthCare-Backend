import {
  ICreateSchedulePayload,
  IUpdateSchedulePayload,
} from "./schedule.interface";

const createSchedule = async (payload: ICreateSchedulePayload) => {
  return payload;
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
