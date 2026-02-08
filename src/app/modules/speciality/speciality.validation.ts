import * as z from "zod";

/**
 * description is optional
 * icon is optional
 **/

export const specialityValidation = {
  createSpecialitySchema: z.object({
    body: z.object({
      title: z.string("Title is required and must be a string"),
      description: z.string().optional(),
      icon: z.string().optional(),
    }),
  }),
  updateSpecialitySchema: z.object({
    params: z.object({
      id: z.uuid("ID is required and must be a valid UUID"),
    }),
    body: z.object({
      title: z.string("Title is required and must be a string"),
      description: z.string().optional(),
      icon: z.string().optional(),
    }),
  }),
  deleteSpecialitySchema: z.object({
    params: z.object({
      id: z.uuid("ID is required and must be a valid UUID"),
    }),
  }),
};
