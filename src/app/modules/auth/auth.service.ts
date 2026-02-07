import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ILoginPatient, IRegisterPatient } from "./auth.interface";

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
  // patient profile creation transaction pataient model
  return newUser;
};

const loginPatient = async (payload: ILoginPatient) => {
  const { email, password } = payload;
  const user = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }
  return user;
};

export const AuthService = {
  registerPatient,
  loginPatient,
};
