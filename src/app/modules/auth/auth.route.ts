import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import authMiddleware from "../../middleware/Auth";
import validateRequest from "../../middleware/ValidateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.patientRegistrationSchema),
  AuthController.registerPatient,
);

router.post(
  "/login",
  validateRequest(AuthValidation.patientLoginSchema),
  AuthController.loginPatient,
);

router.post(
  "/change-password",
  authMiddleware(Role.PATIENT, Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(AuthValidation.changePasswordSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
