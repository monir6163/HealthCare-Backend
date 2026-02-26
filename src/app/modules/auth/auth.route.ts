import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import authMiddleware from "../../middleware/Auth";
import validateRequest from "../../middleware/ValidateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();
router.get(
  "/me",
  authMiddleware(Role.PATIENT, Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),
  AuthController.getMe,
);
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

router.post(
  "/logout",
  authMiddleware(Role.PATIENT, Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),
  AuthController.logOut,
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotPasswordSchema),
  AuthController.forgotPassword,
);

router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordSchema),
  AuthController.resetPassword,
);

export const AuthRoutes = router;
