import express, { Request, Response } from "express";
import userRouter from "./routes/users";
import clubRouter from "./routes/clubs";
import authRouter from "./routes/auth";

const app = express();

const PORT = 8080 || process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Club Membership API!" });
});

//Middleware

//Routes
app.use("/api", userRouter);
app.use("/api", clubRouter);
app.use("/api", authRouter);

app
  .listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`);
  })
  .on("error", (err: Error) => {
    console.log(err);
  });
