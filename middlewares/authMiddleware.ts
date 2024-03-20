import { Request, Response, NextFunction } from "express";
import { ValidateSignature } from "../utils";

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = await ValidateSignature(req);
    if (validate) {
      next();
    } else {
      res.status(400).json({
        message: "Not authorized",
        status: "error",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};
