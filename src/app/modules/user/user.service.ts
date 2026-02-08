import { StatusCodes } from "http-status-codes";
import { Role, Specialty } from "../../../generated/prisma/client";
import ApiError from "../../errors/ApiError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {
  const specialities: Specialty[] = [];
  for (const specialityId of payload.specialties) {
    const speciality = await prisma.specialty.findUnique({
      where: {
        id: specialityId,
      },
    });
    if (!speciality) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Specialty with id ${specialityId} not found`,
      );
    }
    specialities.push(speciality);
  }
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });
  if (userExists) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "User with this email already exists",
    );
  }
  const userData = await auth.api.signUpEmail({
    body: {
      name: payload.doctor.name,
      email: payload.doctor.email,
      password: payload.password,
      role: Role.DOCTOR,
      needPasswordChange: true,
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });
      const specialtyData = specialities.map((speciality) => ({
        doctorId: doctorData.id,
        specialtyId: speciality.id,
      }));
      await tx.doctorSpecialty.createMany({
        data: specialtyData,
      });
      const doctor = await tx.doctor.findUnique({
        where: {
          id: doctorData.id,
        },
        include: {
          user: true,
          specialties: {
            include: {
              specialty: true,
            },
          },
        },
      });
      return doctor;
    });
    return result;
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: userData?.user?.id,
      },
    });
    throw error;
  }
};

export const UserService = {
  createDoctor,
};
