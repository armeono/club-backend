import multer from "multer";
import fs from "fs";
import { supabase } from "./supabase";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/`);
  },
  filename: async (req, file, cb) => {
    const fileName = `${req.params.id}.png`;
    cb(null, fileName);

    setTimeout(async () => {
      try {
        const fileData = fs.readFileSync(`uploads/${fileName}`);

        let { data, error } = await supabase.storage
          .from("user-avatars")
          .upload(`avatars/${fileName}`, fileData, {
            contentType: "image/png",
            upsert: true,
          });

        if (error) console.log(error);

        const imageURL = await supabase.storage
          .from("user-avatars")
          .getPublicUrl(data.path);

        req.body.image = imageURL;

        fs.unlinkSync(`uploads/${fileName}`);
      } catch (err) {
        console.log(err);
      }
    }, 100);
  },
});

export const profilePicUpload = multer({ storage: storage });
