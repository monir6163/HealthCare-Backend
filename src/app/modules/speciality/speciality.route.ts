import { Router } from "express";
import { multerUpload } from "../../../config/multer.config";
import { Role } from "../../../generated/prisma/enums";
import authMiddleware from "../../middleware/Auth";
import validateRequest from "../../middleware/ValidateRequest";
import { SpecialityController } from "./speciality.controller";
import { specialityValidation } from "./speciality.validation";

const router = Router();

router.post(
  "/",
  authMiddleware(Role.ADMIN, Role.DOCTOR),
  multerUpload.single("file"),
  validateRequest(specialityValidation.createSpecialitySchema),
  SpecialityController.createSpeciality,
);

router.get("/", SpecialityController.getAllSpecialities);

router.put(
  "/:id",
  validateRequest(specialityValidation.updateSpecialitySchema),
  SpecialityController.updateSpeciality,
);

router.delete(
  "/:id",
  validateRequest(specialityValidation.deleteSpecialitySchema),
  SpecialityController.deleteSpeciality,
);

export const SpecialityRoutes = router;
