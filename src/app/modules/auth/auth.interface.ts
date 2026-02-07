import { Role } from "../../../generated/prisma/enums";

export interface IRegisterPatient {
  name: string;
  email: string;
  password: string;
}
export interface ILoginPatient {
  email: string;
  password: string;
  role?: Role;
}
