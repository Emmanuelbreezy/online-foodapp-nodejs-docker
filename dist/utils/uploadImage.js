"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = exports.upload = void 0;
const crypto_1 = require("crypto");
const multer_1 = __importDefault(require("multer"));
const generateRandomUUID = () => {
    const uuid = (0, crypto_1.randomUUID)().replace(/-/g, "");
    return uuid.substring(0, 12);
};
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, generateRandomUUID() + "_" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: imageStorage });
exports.upload = upload;
const uploadImages = upload.array("images");
exports.uploadImages = uploadImages;
