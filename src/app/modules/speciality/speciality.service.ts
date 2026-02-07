import ApiError from "../../errors/ApiError";
import { prisma } from "../../lib/prisma";
import { Speciality } from "./speciality.interface";

export const createSpeciality = async (payload: Speciality) => {
  const existingSpeciality = await prisma.specialty.findUnique({
    where: {
      title: payload.title,
    },
  });

  if (existingSpeciality) {
    throw new ApiError(400, "Speciality with this title already exists");
  }

  const speciality = await prisma.specialty.create({
    data: payload,
  });

  return speciality;
};

export const specialityService = {
  createSpeciality,
};
