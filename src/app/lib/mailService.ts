import nodemailer from "nodemailer";
import { envConfig } from "../../config/env";

export const transporter = nodemailer.createTransport({
  host: envConfig.EMAIL_HOST,
  port: Number(envConfig.EMAIL_PORT),
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: envConfig.EMAIL_USER,
    pass: envConfig.EMAIL_PASS,
  },
});
