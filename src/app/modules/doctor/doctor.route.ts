import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import authMiddleware from "../../middleware/Auth";
import validateRequest from "../../middleware/ValidateRequest";
import { doctorController } from "./doctor.controller";
import { updateDoctorZodSchema } from "./doctor.validation";

const router = Router();

router.get("/all-doctors", doctorController.getAllDoctors);
router.get(
  "/:id",
  authMiddleware(Role.SUPER_ADMIN, Role.ADMIN),
  doctorController.getDoctorById,
);

router.patch(
  "/:id",
  authMiddleware(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(updateDoctorZodSchema.updateDoctor),
  doctorController.updateDoctor,
);

export const DoctorRoutes = router;
