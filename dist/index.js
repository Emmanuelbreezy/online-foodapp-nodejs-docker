"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const routes_1 = require("./routes");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use("/api/admin", routes_1.AdminRoute);
app.use("/api/vendor", routes_1.VendorRoute);
app.get("/", (req, res, next) => {
    return res.send("Hss");
});
mongoose_1.default
    .connect(config_1.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("err"));
app.listen(port, () => {
    console.clear();
    console.log(`Server running on port ${port}`);
});
