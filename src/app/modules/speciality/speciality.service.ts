import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { prisma } from "../../lib/prisma";
import { Speciality } from "./speciality.interface";

const createSpeciality = async (payload: Speciality) => {
  const existingSpeciality = await prisma.specialty.findUnique({
    where: {
      title: payload.title,
    },
  });

  if (existingSpeciality) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      `Speciality with title - "${payload.title}" already exists`,
    );
  }

  const speciality = await prisma.specialty.create({
    data: payload,
  });

  return speciality;
};

const getAllSpecialities = async (): Promise<Speciality[]> => {
  const specialities = await prisma.specialty.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!specialities.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No specialities found");
  }
  return specialities as Speciality[];
};

const updateSpeciality = async (id: string, payload: Speciality) => {
  const existingSpeciality = await prisma.specialty.findUnique({
    where: {
      id,
    },
  });

  if (!existingSpeciality) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Speciality with ID - ${id} not found`,
    );
  }

  const speciality = await prisma.specialty.update({
    where: {
      id,
    },
    data: payload,
  });

  return speciality;
};

const deleteSpeciality = async (id: string) => {
  const existingSpeciality = await prisma.specialty.findUnique({
    where: {
      id,
    },
  });

  if (!existingSpeciality) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Speciality with ID - ${id} not found`,
    );
  }

  await prisma.specialty.delete({
    where: {
      id,
    },
  });
};

export const SpecialityService = {
  createSpeciality,
  getAllSpecialities,
  updateSpeciality,
  deleteSpeciality,
};
