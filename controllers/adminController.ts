import { Request, Response, NextFunction } from "express";
import { Vendor } from "../models/Vendor.model";
import { CreateVendorInput } from "../dto";
import { GeneratePassword, GenerateSalt } from "../utils";

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    password,
    address,
    pincode,
    foodType,
    ownerName,
    phoneNumber,
  } = <CreateVendorInput>req.body;

  const existingVendor = await Vendor.findOne({ email: email });

  if (existingVendor) {
    return res.status(401).json({ message: "Email already exists" });
  }

  //generate a salt
  const salt = await GenerateSalt();
  const hashedPass = await GeneratePassword(password, salt);

  const createdVendor = await Vendor.create({
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
  });

  return res.json({
    data: createdVendor,
  });
};

export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (!vendors) {
    return res.json({ message: "No vendors found" });
  }
  return res.json({
    data: vendors,
  });
};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.params;
  const vendor = await Vendor.findById({ id: vendorId });

  if (!vendor) {
    return res.json({ message: "No vendor found" });
  }

  return res.json({
    data: vendor,
  });
};
