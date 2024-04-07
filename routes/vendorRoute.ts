import express, { Request, Response, NextFunction } from "express";
import {
  addFood,
  getFoods,
  getVendorProfile,
  updateVendorCoverImage,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from "../controllers";
import { Authenticate } from "../middlewares";
import { uploadImages } from "../utils/uploadImage";

const router = express.Router();

router.post("/login", vendorLogin);
router.get("/profile", Authenticate, getVendorProfile);
router.put("/profile", Authenticate, updateVendorProfile);
router.put("/service", Authenticate, updateVendorService);
router.put("/coverimage", uploadImages, Authenticate, updateVendorCoverImage);

router.post("/food", uploadImages, Authenticate, addFood);
router.get("/foods", Authenticate, getFoods);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send("Hellosss");
});

export { router as VendorRoute };
