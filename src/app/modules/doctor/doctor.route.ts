import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import authMiddleware from "../../middleware/Auth";
import { doctorController } from "./doctor.controller";

const router = Router();

router.get("/all-doctors", doctorController.getAllDoctors);
router.get(
  "/:id",
  authMiddleware(Role.SUPER_ADMIN, Role.ADMIN),
  doctorController.getDoctorById,
);

export const DoctorRoutes = router;
