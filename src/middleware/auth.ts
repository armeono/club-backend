import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.originalUrl === "/api/auth/login" ||
    req.originalUrl === "/api/auth/register"
  )
    return next();

  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized request");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    res.status(401).send("Unauthorized request");
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
      if (!user) return res.status(401).send("Invalid token!");

      next();
    });
  }
};
