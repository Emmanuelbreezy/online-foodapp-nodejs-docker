"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const uploadImage_1 = require("../utils/uploadImage");
const router = express_1.default.Router();
exports.VendorRoute = router;
router.post("/login", controllers_1.vendorLogin);
router.get("/profile", middlewares_1.Authenticate, controllers_1.getVendorProfile);
router.put("/profile", middlewares_1.Authenticate, controllers_1.updateVendorProfile);
router.put("/service", middlewares_1.Authenticate, controllers_1.updateVendorService);
router.put("/coverimage", uploadImage_1.uploadImages, middlewares_1.Authenticate, controllers_1.updateVendorCoverImage);
router.post("/food", uploadImage_1.uploadImages, middlewares_1.Authenticate, controllers_1.addFood);
router.get("/foods", middlewares_1.Authenticate, controllers_1.getFoods);
router.get("/", (req, res, next) => {
    return res.send("Hellosss");
});
