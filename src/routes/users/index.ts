import { Request, Response, Router } from "express";
import { prisma } from "../../../prisma/client";

const router = Router();

// GET user by ID
router.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      statistics: true,
    },
  });

  if (!user) {
    return res.status(404).send("No user found");
  }

  res.status(200).send(user);
});

// GET all users of specific club
router.get("/club/:clubId", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: {
      clubId: req.params.clubId,
    },
  });

  if (!users) {
    return res.status(404).send("No users found");
  }

  res.status(200).send(users);
});

export default router;
