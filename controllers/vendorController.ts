import { Request, Response, NextFunction } from "express";
import { Vendor } from "../models/Vendor.model";
import { EditLoginInputDto, VendorLoginInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utils";

export const vendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInputs>req.body;
  const existingVendor = await Vendor.findOne({ email: email });

  if (!existingVendor) {
    return res.json({ message: "Login credential not valid" });
  }
  const validatePass = await ValidatePassword(
    password,
    existingVendor.password
  );
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

  const token = GenerateSignature(payload);
  return res.status(200).json({
    message: "Login success",
    token: token,
  });
};

export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      msg: "User not authenticated",
    });
  }
  const vendor = await Vendor.findById(user._id);
  return res.json({
    message: "Vendor fetched successfully",
    status: "success",
    data: vendor,
  });
};

export const updateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodType, name, address, phoneNumber } = <EditLoginInputDto>(
      req.body
    );
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const vendor = await Vendor.findById(user._id);
    if (!vendor) {
      return res.status(401).json({
        msg: "Vendor not found",
      });
    }

    vendor.name = name;
    vendor.address = address;
    vendor.phoneNumber = phoneNumber || vendor.phoneNumber;
    vendor.foodType = foodType;

    const savedResult = await vendor.save();

    return res.json({
      message: "Vendor updated successfully",
      status: "success",
      data: savedResult,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};

export const updateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    data: {},
  });
};
