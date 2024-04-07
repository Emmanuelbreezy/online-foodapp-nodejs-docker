import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
dotenv.config();

import { AdminRoute, VendorRoute } from "./routes";
import { MONGO_URI } from "./config";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/admin", AdminRoute);
app.use("/api/vendor", VendorRoute);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send("Hss");
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("err"));

app.listen(port, () => {
  console.clear();
  console.log(`Server running on port ${port}`);
});
