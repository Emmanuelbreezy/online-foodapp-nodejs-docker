import jwt from "jsonwebtoken"
import { Request } from "express";
import { VendorPayloadDto, AuthPayloadDto } from "../dto";
import { JWT_SECRET } from "../config";


export const GenerateSignature = (payload:VendorPayloadDto) => {
	const sign = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return sign
}

export const ValidateSignature = async(req:Request) => {
    const signature = req.get("Authorization");
    if(signature){
        const token = signature.split(' ')[1]
        const payload = jwt.verify(token, JWT_SECRET) as AuthPayloadDto
        req.user = payload;
        return true
    }
    return false;
}