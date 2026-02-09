import { JwtPayload, SignOptions } from "jsonwebtoken";
import { envConfig } from "../../config/env";
import { jwtUtils } from "./jwt";

const getAccessToken = (payload: JwtPayload) => {
  const token = jwtUtils.createToken(payload, envConfig.JWT_ACCESS_SECRET, {
    expiresIn: envConfig.JWT_ACCESS_EXPIRES_IN,
  } as SignOptions);
  return token;
};

const getRefreshToken = (payload: JwtPayload) => {
  const token = jwtUtils.createToken(payload, envConfig.JWT_REFRESH_SECRET, {
    expiresIn: envConfig.JWT_REFRESH_TOKEN_EXPIRES_IN,
  } as SignOptions);
  return token;
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
};
