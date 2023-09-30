import { Router } from "express";
import { prisma } from "./prisma";
import { signJwt } from "./utils";
import bcrypt from "bcrypt";

export const authController = Router();

authController.post("/register", async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(400).send("Missing username/ password");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      phoneNumber,
      password: hashedPassword,
    },
  });
  return res.send({ user });
});

authController.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(400).send("Missing username/ password");
  }

  const user = await prisma.user.findUnique({
    where: { phoneNumber },
  });
  if (!user) {
    return res.status(401).send("Invalid username/ password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send("Invalid username/ password");
  }

  const token = signJwt({ id: user.id, verified: user.verified });
  return res.send({ token, user });
});
