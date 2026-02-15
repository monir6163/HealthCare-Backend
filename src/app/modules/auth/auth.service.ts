import { fromNodeHeaders } from "better-auth/node";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import {
  IChangePasswordPayload,
  ILoginPatient,
  IRegisterPatient,
} from "./auth.interface";

const registerPatient = async (payload: IRegisterPatient) => {
  const { name, email, password } = payload;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "User with this email already exists",
    );
  }
  const newUser = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  if (!newUser) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to register patient",
    );
  }
  try {
    // patient profile creation transaction pataient model
    const createdPatient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          userId: newUser?.user?.id,
          name: newUser?.user?.name || name,
          email: newUser?.user?.email || email,
        },
      });
      return patientTx;
    });
    return {
      ...newUser,
      patient: createdPatient,
    };
  } catch (error) {
    console.log("err", error);
    // Rollback user creation if patient profile creation fails
    await prisma.user.delete({
      where: { id: newUser.user?.id },
    });
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create patient profile",
    );
  }
};

const loginPatient = async (payload: ILoginPatient) => {
  const { email, password } = payload;

  const response = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  });

  if (!response.ok) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  return response;
};

const changePassword = async (
  payload: IChangePasswordPayload,
  req: Request,
) => {
  const { userId, currentPassword, newPassword } = payload;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const result = await auth.api.changePassword({
    body: {
      newPassword: newPassword,
      currentPassword: currentPassword,
      revokeOtherSessions: true,
    },
    headers: fromNodeHeaders(req.headers),
  });
  if (!result) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to change password",
    );
  }
  return result;
};

export const AuthService = {
  registerPatient,
  loginPatient,
  changePassword,
};
