import * as z from "zod";

export const UserValidation = {
  createUserSchema: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required"),
    }),
  }),
};
