import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import authMiddleware from "../../middleware/Auth";
import validateRequest from "../../middleware/ValidateRequest";
import { specialityController } from "./speciality.controller";
import { specialityValidation } from "./speciality.validation";

const router = Router();

router.post(
  "/",
  authMiddleware(Role.ADMIN),
  validateRequest(specialityValidation.createSpecialitySchema),
  specialityController.createSpeciality,
);
export const SpecialityRoutes = router;
