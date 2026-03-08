import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import checkAuth from "../../middleware/Auth";
import validateRequest from "../../middleware/ValidateRequest";
import { ScheduleController } from "./schedule.controller";
import { scheduleValidation } from "./schedule.validation";

const router = Router();

router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(scheduleValidation.createScheduleSchema),
  ScheduleController.createSchedule,
);
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.getAllSchedules,
);

router.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.getScheduleById,
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(scheduleValidation.updateScheduleSchema),
  ScheduleController.updateSchedule,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.deleteSchedule,
);

export const ScheduleRoutes = router;
