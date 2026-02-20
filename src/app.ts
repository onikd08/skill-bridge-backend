import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Skill-Bridge backend!");
});

export default app;
