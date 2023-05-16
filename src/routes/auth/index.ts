import { Router } from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/client";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const registerData = req.body;

  if (!registerData.password) res.status(400).send("Password is required");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(registerData.password, salt);

  try {
    const newUser = await prisma.user.create({
      data: {
        username: registerData.username,
        password: hashedPassword,
        email: registerData.email,
        role: registerData.role,
        status: registerData.status,
        title: registerData.title,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error creating user! Check request object!");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const loginData = req.body;

  console.log(loginData);

  if (!loginData.email || !loginData.password)
    res.status(400).send("Username and password are required!");

  const user = await prisma.user.findFirst({
    where: {
      email: loginData.email,
    },
  });

  if (!user) res.status(400).send("User not found!");

  const validPassword = await bcrypt.compare(loginData.password, user.password);

  if (!validPassword) res.status(400).send("Invalid password!");

  const token = jwt.sign(loginData, process.env.ACCESS_TOKEN_SECRET!);

  const returnObject = {
    token,
    user,
  };

  res.status(200).json();
});

router.post("/resetPassword", (req: Request, res: Response) => {});

export default router;
