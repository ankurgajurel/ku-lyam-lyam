import { Router } from "express";
import { prisma } from "./prisma";
import { INTERNAL_KEY } from "./consts";

export const claimsRouter = Router();

claimsRouter.get("/types", async (_, res) => {
  const claimTypes = await prisma.claimType.findMany();
  res.status(200).send({ claimTypes });
});

claimsRouter.post("/types", async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== INTERNAL_KEY) {
    return res.status(401).send("Invalid API Key");
  }

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("Missing name/ description");
  }

  const claimType = await prisma.claimType.create({
    data: { name, description },
  });
  res.status(201).send({ claimType });
});

claimsRouter.post("/add", async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== INTERNAL_KEY) {
    return res.status(401).send("Invalid API Key");
  }

  const { claimTypeId, userId, value } = req.body;
  if (!claimTypeId || !userId || !value) {
    return res.status(400).send("Missing claimTypeId/ userId/ value");
  }

  const claim = await prisma.claim.create({
    data: { claimTypeId, userId, value },
  });
  res.status(201).send({ claim });
});
