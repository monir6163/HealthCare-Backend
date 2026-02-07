import * as z from "zod";

export const AuthValidation = {
  patientRegistrationSchema: z.object({
    body: z.object({
      name: z.string().nonempty("Name is required"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    }),
  }),
  patientLoginSchema: z.object({
    body: z.object({
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    }),
  }),
};
