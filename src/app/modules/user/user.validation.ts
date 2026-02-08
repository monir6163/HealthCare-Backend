import * as z from "zod";

export const UserValidation = {
  createUserSchema: z.object({
    body: z.object({
      name: z.string().nonempty({ message: "Name is required" }),
      email: z.string().optional(),
    }),
  }),
};
