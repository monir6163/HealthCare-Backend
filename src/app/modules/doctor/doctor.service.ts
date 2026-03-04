import { Doctor, Prisma } from "../../../generated/prisma/client";
import { IQueryParams } from "../../helper/query.interface";
import { QueryBuilder } from "../../helper/Querybuilder";
import { prisma } from "../../lib/prisma";
import {
  doctorFilterableFields,
  doctorIncludeConfig,
  doctorSearchableFields,
} from "./doctor.constant";

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

export const doctorService = {
  getAllDoctors,
};
