import { z } from "zod";
export const scheduleValidation = {
  createScheduleSchema: z.object({
    body: z.object({
      startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
      endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
      startTime: z
        .string()
        .refine((time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
          message: "Invalid time format",
        }),
      endTime: z
        .string()
        .refine((time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
          message: "Invalid time format",
        }),
    }),
  }),
  updateScheduleSchema: z.object({
    body: z.object({
      startDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        })
        .optional(),
      endDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        })
        .optional(),
      startTime: z
        .string()
        .refine((time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
          message: "Invalid time format",
        })
        .optional(),
      endTime: z
        .string()
        .refine((time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
          message: "Invalid time format",
        })
        .optional(),
    }),
  }),
};
