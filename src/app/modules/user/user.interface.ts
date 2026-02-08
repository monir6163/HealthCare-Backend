import { Gender } from "../../../generated/prisma/enums";

export interface ICreateDoctorPayload {
  password: string;
  doctor: {
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber: string;
    experienceYears?: number;
    gender: Gender;
    appointmentFee: number;
    currentHospital: string;
    qualifications: string;
    designation: string;
  };
  specialties: string[];
}
