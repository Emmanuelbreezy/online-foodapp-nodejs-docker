import { randomUUID } from "crypto";
import multer from "multer";

const generateRandomUUID = () => {
  const uuid = randomUUID().replace(/-/g, "");
  return uuid.substring(0, 12);
};

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (_, file, cb) {
    cb(null, generateRandomUUID() + "_" + file.originalname);
  },
});

const upload = multer({ storage: imageStorage });

const uploadImages = upload.array("images");

export { upload, uploadImages };
