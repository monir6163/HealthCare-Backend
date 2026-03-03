import { Prisma } from "../../../generated/prisma/client";
import { IQueryParams } from "../../helper/query.interface";
import { QueryBuilder } from "../../helper/Querybuilder";

const getAllDoctors = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder(
    Doctor,
    Prisma.DoctorWhereInput,
    Prisma.DoctorInclude,
  );
};

export const doctorService = {
  getAllDoctors,
};
