import { Request, Response, NextFunction } from "express";
import { Vendor } from "../models/Vendor.model";
import { EditLoginInputDto, VendorLoginInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utils";
import { CreateFoodInputDto } from "dto/food.dto";
import { Food } from "../models";
import { validateRequiredFields } from "utils/validateField";



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
    message: "Login success!!!!!",
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

export const updateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const files = req.files as [Express.Multer.File]

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

    const images = files?.map((file:Express.Multer.File) => file.filename);
    vendor.coverImages.push(...images);
    const savedResult = await vendor.save();

    return res.json({
      message: "Vendor cover updated successfully",
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
  try {
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

    vendor.serviceAvailable = !vendor.serviceAvailable;
    const savedResult = await vendor.save();

    return res.json({
      message: "Vendor service updated successfully",
      status: "success",
      data: savedResult,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};

export const addFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInputDto
    >req.body;
    const files = req.files as [Express.Multer.File]

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

    const vendor = await Vendor.findById(user._id);
    if (!vendor) {
      return res.status(401).json({
        msg: "Vendor not found",
      });
    }

    const images = files?.map((file:Express.Multer.File) => file.filename);

    const createFood = await Food.create({
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
    const saveResult = await vendor.save();

    return res.json({
      message: "Food created successfully",
      status: "success",
      data: saveResult,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const vendor = await Vendor.findById(user._id).populate('foods');
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
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};
