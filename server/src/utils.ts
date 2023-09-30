import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "./consts";

export const signJwt = <T extends object>(payload: T): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const validateJwt = <T extends object>(
  token: string,
  notSplit?: boolean,
): T | null => {
  let validatedToken;
  if (!notSplit) {
    validatedToken = token.split(" ")[1];
  } else {
    validatedToken = token;
  }
  try {
    // @ts-ignore
    return jwt.verify(validatedToken, JWT_SECRET);
  } catch (e) {
    return null;
  }
};
