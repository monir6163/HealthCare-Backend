import { Router } from "express";
import validateRequest from "../../middleware/ValidateRequest";
import { specialityController } from "./speciality.controller";
import { specialityValidation } from "./speciality.validation";

const router = Router();

router.post(
  "/",
  validateRequest(specialityValidation.createSpecialitySchema),
  specialityController.createSpeciality,
);

router.get("/", specialityController.getAllSpecialities);

router.delete(
  "/:id",
  validateRequest(specialityValidation.deleteSpecialitySchema),
  specialityController.deleteSpeciality,
);

export const SpecialityRoutes = router;
