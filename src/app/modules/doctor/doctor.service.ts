import { StatusCodes } from "http-status-codes";
import { Doctor, Prisma } from "../../../generated/prisma/client";
import ApiError from "../../errors/ApiError";
import { IQueryParams } from "../../helper/query.interface";
import { QueryBuilder } from "../../helper/Querybuilder";
import { prisma } from "../../lib/prisma";
import {
  doctorFilterableFields,
  doctorIncludeConfig,
  doctorSearchableFields,
} from "./doctor.constant";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    Doctor,
    Prisma.DoctorWhereInput,
    Prisma.DoctorInclude
  >(prisma.doctor, query, {
    searchableFields: doctorSearchableFields,
    filterableFields: doctorFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .where({
      isDeleted: false,
    })
    .include({
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    })
    .dynamicInclude(doctorIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();
  return result;
};

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
      appointments: {
        include: {
          patient: true,
          shedule: true,
          prescription: true,
        },
      },
      doctorShedules: {
        include: {
          shedule: true,
        },
      },
      reviews: true,
    },
  });
  return doctor;
};

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: { id },
  });
  if (!isDoctorExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Doctor not found");
  }
  const { doctor: doctorData, specialties } = payload;

  await prisma.$transaction(async (tx) => {
    if (doctorData) {
      await tx.doctor.update({
        where: {
          id,
        },
        data: {
          ...doctorData,
        },
      });
    }
    if (specialties && specialties.length > 0) {
      for (const specialty of specialties) {
        const { specialtyId, shouldDelete } = specialty;
        if (shouldDelete) {
          await tx.doctorSpecialty.delete({
            where: {
              doctorId_specialtyId: {
                doctorId: id,
                specialtyId,
              },
            },
          });
        } else {
          await tx.doctorSpecialty.upsert({
            where: {
              doctorId_specialtyId: {
                doctorId: id,
                specialtyId,
              },
            },
            create: {
              doctorId: id,
              specialtyId,
            },
            update: {},
          });
        }
      }
    }
  });

  const doctor = await getDoctorById(id);

  return doctor;
};

export const doctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
};
