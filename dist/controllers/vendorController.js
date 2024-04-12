"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoods = exports.addFood = exports.updateVendorService = exports.updateVendorProfile = exports.updateVendorCoverImage = exports.getVendorProfile = exports.vendorLogin = void 0;
const Vendor_model_1 = require("../models/Vendor.model");
const utils_1 = require("../utils");
const models_1 = require("../models");
const vendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingVendor = yield Vendor_model_1.Vendor.findOne({ email: email });
    if (!existingVendor) {
        return res.json({ message: "Login credential not valid" });
    }
    const validatePass = yield (0, utils_1.ValidatePassword)(password, existingVendor.password);
    if (!validatePass) {
        return res.json({ message: "Email/password not valid" });
    }
    const payload = {
        _id: existingVendor._id,
        email: existingVendor.email,
        foodType: existingVendor.foodType,
        name: existingVendor.name,
        role: "20001",
    };
    const token = (0, utils_1.GenerateSignature)(payload);
    return res.status(200).json({
        message: "Login success",
        token: token,
    });
});
exports.vendorLogin = vendorLogin;
const getVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            msg: "User not authenticated",
        });
    }
    const vendor = yield Vendor_model_1.Vendor.findById(user._id);
    return res.json({
        message: "Vendor fetched successfully",
        status: "success",
        data: vendor,
    });
});
exports.getVendorProfile = getVendorProfile;
const updateVendorCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const files = req.files;
        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }
        const vendor = yield Vendor_model_1.Vendor.findById(user._id);
        if (!vendor) {
            return res.status(401).json({
                msg: "Vendor not found",
            });
        }
        const images = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
        vendor.coverImages.push(...images);
        const savedResult = yield vendor.save();
        return res.json({
            message: "Vendor cover updated successfully",
            status: "success",
            data: savedResult,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: "error",
        });
    }
});
exports.updateVendorCoverImage = updateVendorCoverImage;
const updateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodType, name, address, phoneNumber } = (req.body);
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }
        const vendor = yield Vendor_model_1.Vendor.findById(user._id);
        if (!vendor) {
            return res.status(401).json({
                msg: "Vendor not found",
            });
        }
        vendor.name = name;
        vendor.address = address;
        vendor.phoneNumber = phoneNumber || vendor.phoneNumber;
        vendor.foodType = foodType;
        const savedResult = yield vendor.save();
        return res.json({
            message: "Vendor updated successfully",
            status: "success",
            data: savedResult,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: "error",
        });
    }
});
exports.updateVendorProfile = updateVendorProfile;
const updateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }
        const vendor = yield Vendor_model_1.Vendor.findById(user._id);
        if (!vendor) {
            return res.status(401).json({
                msg: "Vendor not found",
            });
        }
        vendor.serviceAvailable = !vendor.serviceAvailable;
        const savedResult = yield vendor.save();
        return res.json({
            message: "Vendor service updated successfully",
            status: "success",
            data: savedResult,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: "error",
        });
    }
});
exports.updateVendorService = updateVendorService;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, foodType, readyTime, price } = req.body;
        const files = req.files;
        // const requiredFields = [
        //   "name",
        //   "image_url",
        //   "amenitiesId"
        // ];
        // const missingField = validateRequiredFields(requiredFields, req.body);
        // if (missingField) {
        //   return res.status(400).json({
        //     message: `${missingField} is required`,
        //     status: "error",
        //   });
        // }
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }
        const vendor = yield Vendor_model_1.Vendor.findById(user._id);
        if (!vendor) {
            return res.status(401).json({
                msg: "Vendor not found",
            });
        }
        const images = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
        const createFood = yield models_1.Food.create({
            vendorId: vendor._id,
            name: name,
            description: description,
            category: category,
            foodType: foodType,
            images: images,
            readyTime: readyTime,
            price: price,
            rating: 0,
        });
        vendor.foods.push(createFood);
        const saveResult = yield vendor.save();
        return res.json({
            message: "Food created successfully",
            status: "success",
            data: saveResult,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: "error",
        });
    }
});
exports.addFood = addFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }
        const vendor = yield Vendor_model_1.Vendor.findById(user._id).populate('foods');
        if (!vendor) {
            return res.status(401).json({
                msg: "Vendor not found",
            });
        }
        const foods = vendor.foods;
        return res.json({
            message: "Vendor service updated successfully",
            status: "success",
            data: foods,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: "error",
        });
    }
});
exports.getFoods = getFoods;
