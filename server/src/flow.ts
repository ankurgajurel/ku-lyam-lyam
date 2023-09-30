import { Router } from "express";
import { APP_URL, INTERNAL_KEY } from "./consts";
import { signJwt, validateJwt } from "./utils";
import { IAuthorizationJwtPayload, IUserAuthToken } from "./@types";
import { prisma } from "./prisma";

export const flowController = Router();

flowController.post("/authorize", (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== INTERNAL_KEY) {
    res.status(401).send("Invalid API Key");
  }

  const { claims, sensitiveFields, callbackUrl } = req.body;
  if (!claims && !sensitiveFields) {
    return res.status(400).send("Missing claims and sensitiveFields");
  }
  if (!callbackUrl) {
    return res.status(400).send("Missing callbackUrl");
  }

  const token = signJwt({ claims, sensitiveFields, callbackUrl });
  let appUrl: string;
  if (sensitiveFields) {
    appUrl = `${APP_URL}/share?token=${token}`;
  } else {
    appUrl = `${APP_URL}/verify?token=${token}`;
  }
  res.send({ appUrl });
});

flowController.get("/data", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Missing authorization header");
  }
  const validatedToken = validateJwt<IUserAuthToken>(token);
  if (!validatedToken) {
    return res.status(401).send("Invalid authorization token");
  }

  const { id: userId, verified } = validatedToken;
  if (!verified) {
    return res.status(401).send("User not verified");
  }

  const { dataToken } = req.query;
  const data = validateJwt<IAuthorizationJwtPayload>(dataToken as string, true);
  if (!data) {
    return res.status(401).send("Invalid data token");
  }

  const { claims: reqClaims, sensitiveFields, callbackUrl } = data;
  if (!reqClaims && !sensitiveFields) {
    return res.status(400).send("Missing claims and sensitiveFields");
  }

  const claims = await prisma.claim.findMany({
    where: {
      AND: [{ userId }, { claimTypeId: { in: reqClaims } }],
    },
  });

  let userData;
  if (sensitiveFields) {
    userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        encryptedData: true,
        iv: true,
      },
    });
    if (!userData) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send({
      claims,
      callbackUrl,
      encryptedData: userData.encryptedData,
      iv: userData.iv,
    });
  }

  return res.status(200).send({
    claims,
    callbackUrl,
  });
});
