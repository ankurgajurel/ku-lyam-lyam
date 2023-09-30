import { Router } from "express";
import { prisma } from "./prisma";
import { INTERNAL_KEY } from "./consts";

export const onboardController = Router();

onboardController.patch("/verify", async (req, res) => {
  const apiToken = req.headers["x-api-key"];
  if (apiToken !== INTERNAL_KEY) {
    return res.status(403).send("Invalid API Key");
  }

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send("Missing userId");
  }

  const { encryptedData, decryptionKey, iv } = req.body;
  if (!encryptedData || !decryptionKey || !iv) {
    return res.status(400).send("Missing encryptedData, decryptionKey or iv");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { verified: true, encryptedData, decryptionKey, iv },
  });

  return res.status(200).send("User verified");
});
