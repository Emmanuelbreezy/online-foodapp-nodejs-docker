import express, { Request, Response, NextFunction } from "express";
import { getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

router.post("/login", vendorLogin);
router.get("/profile", Authenticate, getVendorProfile);
router.put("/profile", Authenticate, updateVendorProfile);
router.put("/service", Authenticate, updateVendorService);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Hello, from vendor" });
});

export { router as VendorRoute };
