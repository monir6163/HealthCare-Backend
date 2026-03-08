import { Prisma } from "../../../generated/prisma/client";

export const scheduleFilterableFields = [
  "id",
  "startDateTime",
  "endDateTime",
  // 'appointments.doctors.id',
];

export const scheduleSearchableFields = ["id", "startDateTime", "endDateTime"];

export const scheduleIncludeConfig: Partial<
  Record<
    keyof Prisma.SheduleInclude,
    Prisma.SheduleInclude[keyof Prisma.SheduleInclude]
  >
> = {
  appointments: {
    include: {
      doctor: true,
      patient: true,
      payment: true,
      prescription: true,
      review: true,
    },
  },
  doctorShedules: true,
};
