import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DoctorRoutes } from "../modules/doctor/doctor.route";
import { SpecialityRoutes } from "../modules/speciality/speciality.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/specialities", SpecialityRoutes);
router.use("/users", UserRoutes);
router.use("/doctors", DoctorRoutes);

export const IndexRoutes = router;
