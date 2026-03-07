import { addHours, addMinutes, format } from "date-fns";
import { Prisma, Shedule } from "../../../generated/prisma/client";
import { IQueryParams } from "../../helper/query.interface";
import { QueryBuilder } from "../../helper/Querybuilder";
import { prisma } from "../../lib/prisma";
import {
  ICreateSchedulePayload,
  IUpdateSchedulePayload,
} from "./schedule.interface";
import { convertDateFormat } from "./schedule.utlis";

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
    while (startDateTime < endDateTime) {
      const s = await convertDateFormat(startDateTime);
      const e = await convertDateFormat(addMinutes(startDateTime, interval));

      const scheduleData = {
        startDate: s,
        endDate: e,
      };
      const existingSchedule = await prisma.shedule.findFirst({
        where: {
          startDateTime: scheduleData.startDate,
          endDateTime: scheduleData.endDate,
        },
      });
      if (!existingSchedule) {
        const schedule = await prisma.shedule.create({
          data: {
            startDateTime: scheduleData.startDate,
            endDateTime: scheduleData.endDate,
          },
        });
        schedules.push(schedule);
      }
      startDateTime.setMinutes(startDateTime.getMinutes() + interval);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllSchedules = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    Shedule,
    Prisma.SheduleWhereInput,
    Prisma.SheduleInclude
  >(prisma.shedule, query, {
    searchableFields: ["id"],
    filterableFields: [],
  });
  const result = await queryBuilder.search().filter().paginate().execute();
  return result;
};

const getScheduleById = async (id: string) => {
  const schedule = await prisma.shedule.findUnique({
    where: { id },
  });
  return schedule;
};

const updateSchedule = async (id: string, payload: IUpdateSchedulePayload) => {
  const schedule = await prisma.shedule.update({
    where: { id },
    data: payload,
  });
  return schedule;
};

const deleteSchedule = async (id: string) => {
  const schedule = await prisma.shedule.delete({
    where: { id },
  });
  return schedule;
};

export const ScheduleService = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
