import { Router } from "express";
import validateRequest from "../../middleware/ValidateRequest";
import { SpecialityController } from "./speciality.controller";
import { specialityValidation } from "./speciality.validation";

const router = Router();

router.post(
  "/",
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
