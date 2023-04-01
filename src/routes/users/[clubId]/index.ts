import router from "../../index";
import { Request, Response } from "express";

router.get("/users/:clubId", (req: Request, res: Response) => {
  const users = prisma.user.findMany({
    where: {
      clubId: Number(req.params.clubId),
    },
  });

  if (!users) {
    res.status(404).send("No users found");
  }

  res.status(200).send(users);
});
