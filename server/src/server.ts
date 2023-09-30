import express from "express";
import cors from "cors";
import { flowController } from "./flow";
import { claimsRouter } from "./claims";
import { onboardController } from "./onboard";
import { authController } from "./auth";
import cors from 'cors';

const app = express();
const port = parseInt(process.env.PORT || "8080");

app.use(express.json());
app.use(cors())

app.use("/flow", flowController);
app.use("/claims", claimsRouter);
app.use("/onboard", onboardController);
app.use("/auth", authController);

app.get("/", (_, res) => {
  res.send("Hello World! I am up and running!");
});

app.listen(port, () => console.log("Listening on", port));
