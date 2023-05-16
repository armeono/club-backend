import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

// Create a new club
router.post("/", async (req: Request, res: Response) => {
  const clubObject = req.body;

  const newClub = await prisma.club.create({
    data: {
      name: clubObject.name,
      logo: clubObject.logo,
    },
  });

  if (!newClub) res.status(500).send("Error creating club!");

  res.status(201).json(newClub);
});

// Add a new user to a club
router.post("/add/:clubId/:userId", async (req: Request, res: Response) => {
  const clubId = req.params.clubId;
  const userId = Number(req.params.userId);

  const userAdded = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      clubId: clubId,
    },
  });

  if (!userAdded) res.status(500).send("Error adding user to club!");

  res.status(201).json(userAdded);
});

export default router;
