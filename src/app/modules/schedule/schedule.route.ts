import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import authMiddleware from "../../middleware/Auth";
import validateRequest from "../../middleware/ValidateRequest";
import { ScheduleController } from "./schedule.controller";
import { scheduleValidation } from "./schedule.validation";

const router = Router();

router.post(
  "/",
  authMiddleware(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(scheduleValidation.createScheduleSchema),
  ScheduleController.createSchedule,
);
router.get(
  "/",
  authMiddleware(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.getAllSchedules,
);

router.get(
  "/:id",
  authMiddleware(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.getScheduleById,
);

router.patch(
  "/:id",
  authMiddleware(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(scheduleValidation.updateScheduleSchema),
  ScheduleController.updateSchedule,
);

router.delete(
  "/:id",
  authMiddleware(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.deleteSchedule,
);

export const ScheduleRoutes = router;
