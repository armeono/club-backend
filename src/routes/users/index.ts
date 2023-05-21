import { Request, Response, Router } from "express";
import { prisma } from "../../../prisma/client";
import { supabase } from "../../config/supabase";
import { profilePicUpload } from "../../config/multer";
import fs from "fs";
import { decode } from "base64-arraybuffer";

const router = Router();

interface ExtendedRequest extends Request {
  file: any;
}

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
  profilePicUpload.single("image"),
  async (req: ExtendedRequest, res: Response) => {
    let userObject = req.body;
    const userId = req.params.id;

    const userImageURL = await supabase.storage
      .from("user-avatars")
      .getPublicUrl(`avatars/${req.file.filename}`);

    try {
      userObject = {
        ...userObject,
        image: userImageURL ? userImageURL.data.publicUrl : "",
      };
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          ...userObject,
        },
      });

      res.status(200).send(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

export default router;
