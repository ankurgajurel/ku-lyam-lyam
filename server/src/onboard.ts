import { Router } from "express";
import { validateJwt } from "./utils";
import { IUserAuthToken } from "./@types";
import { prisma } from "./prisma";
import { INTERNAL_KEY } from "./consts";

export const onboardController = Router();

onboardController.post("/data", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Missing authorization header");
  }
  const validatedToken = validateJwt<IUserAuthToken>(token);
  if (!validatedToken) {
    return res.status(403).send("Invalid authorization token");
  }
  if (!validatedToken?.verified) {
    return res.status(403).send("User not verified!");
  }

  const { encryptedData, decryptionKey, iv } = req.body;
  if (!encryptedData || !decryptionKey || !iv) {
    return res.status(400).send("Missing encryptedData, decryptionKey or iv");
  }

  await prisma.user.update({
    where: { id: validatedToken.id },
    data: {
      encryptedData,
      decryptionKey,
      iv,
    },
  });
  return res.status(200).send("User data added!");
});

onboardController.patch("/verify", async (req, res) => {
  const apiToken = req.headers["x-api-key"];
  if (apiToken !== INTERNAL_KEY) {
    return res.status(403).send("Invalid API Key");
  }

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send("Missing userId");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { verified: true },
  });

  return res.status(200).send("User verified");
});
