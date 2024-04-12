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
exports.getVendorById = exports.getVendors = exports.createVendor = exports.FindVendor = void 0;
const Vendor_model_1 = require("../models/Vendor.model");
const utils_1 = require("../utils");
const FindVendor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    return email
        ? yield Vendor_model_1.Vendor.findOne({ email: email })
        : yield Vendor_model_1.Vendor.findById(id);
});
exports.FindVendor = FindVendor;
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address, pincode, foodType, ownerName, phoneNumber, } = req.body;
    const existingVendor = yield (0, exports.FindVendor)("", email);
    if (existingVendor) {
        return res.status(401).json({ message: "Email already exists" });
    }
    //generate a salt
    const salt = yield (0, utils_1.GenerateSalt)();
    const hashedPass = yield (0, utils_1.GeneratePassword)(password, salt);
    const createdVendor = yield Vendor_model_1.Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: hashedPass,
        salt: salt,
        ownerName: ownerName,
        phoneNumber: phoneNumber,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: []
    });
    return res.json({
        data: createdVendor,
    });
});
exports.createVendor = createVendor;
const getVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield Vendor_model_1.Vendor.find();
    if (!vendors) {
        return res.json({ message: "No vendors found" });
    }
    return res.json({
        data: vendors,
    });
});
exports.getVendors = getVendors;
const getVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorId = req.params.id;
    const vendor = yield Vendor_model_1.Vendor.findById(vendorId);
    if (!vendor) {
        return res.json({ message: "No vendor found" });
    }
    return res.json({
        data: vendor,
    });
});
exports.getVendorById = getVendorById;
