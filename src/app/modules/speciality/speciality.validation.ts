import * as z from "zod";

/**
 * description is optional
 * icon is optional
 **/

export const specialityValidation = {
  createSpecialitySchema: z.object({
    body: z.object({
      title: z.string().nonempty({ message: "Title is required" }),
      description: z.string().optional(),
      icon: z.string().optional(),
    }),
  }),
};
