import { Request, Response, Router } from "express";
import { prisma } from "../../../prisma/client";
import { supabase } from "../../config/supabase";
import { upload } from "../../config/multer";
import fs from "fs";
import { decode } from "base64-arraybuffer";

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

router.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const userObject = req.body;
    const userId = req.params.id;

    // const image = fs.readFile(`uploads/${req.params.id}.png`)

    // const userImage = await supabase.storage
    //   .from("user-avatars")
    //   .upload(`avatars/${userId}`, decode(userObject.image), {
    //     contentType: "image/png",
    //   });

    // const updatedUser = await prisma.user.update({
    //   where: {
    //     id: Number(req.params.id),
    //   },
    //   data: {
    //     ...userObject,
    //   },
    // });
  }
);

export default router;
