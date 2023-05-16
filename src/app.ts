import express, { Request, Response } from "express";
import userRouter from "./routes/users";
import clubRouter from "./routes/clubs";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";

const app = express();

const PORT = 8080 || process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Club Membership API!" });
});

//Middleware
app.use(express.json());
app.use(authMiddleware);

//Routes
app.use("/api/users", userRouter);
app.use("/api/club", clubRouter);
app.use("/api/auth", authRouter);

app
  .listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`);
  })
  .on("error", (err: Error) => {
    console.log(err);
  });
