import { ICreateSchedulePayload } from "./schedule.interface";

const createSchedule = async (payload: ICreateSchedulePayload) => {
  return payload;
};

export const ScheduleService = {
  createSchedule,
};
