import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { AdminRoute, VendorRoute } from "./routes";
import { MONGO_URI } from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/admin", AdminRoute);
app.use("/api/vendor", VendorRoute);

mongoose
  .connect(MONGO_URI,)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log("err"));

app.listen(8000, () => {
  console.clear();
  console.log("Server running on port 8000");
});
