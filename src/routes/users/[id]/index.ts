import router from "../../index";
import { Request, Response } from "express";

router.get("/users/:id", (req: Request, res: Response) => {
  const user = prisma.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
    select: {
      statistics: true,
    },
  });

  if (!user) {
    res.status(404).send("No user found");
  }

  res.status(200).send(user);
});
