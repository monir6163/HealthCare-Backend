import cors from "cors";
import express, { Application } from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./app/middleware/GlobalErrorHandler";
import notFound from "./app/middleware/NotFound";
import { IndexRoutes } from "./app/routes";
import sendResponse from "./app/shared/sendResponse";
import { envConfig } from "./config/env";

const app: Application = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = envConfig.FRONTEND_URL?.replace(/\/$/, "");
      if (!origin || origin.replace(/\/$/, "") === allowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Health Care Server is running successfully! Your IP address is ${ip}`,
  });
  res.end();
});

app.use("/api/v1", IndexRoutes);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
