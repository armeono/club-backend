import { Request, Response, NextFunction } from "express";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized request");
  }
};
