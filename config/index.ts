import dotenv from "dotenv";
dotenv.config();

//export const MONGO_URI = "mongodb+srv://Samuel:p4RAD4W53AbPTDLl@foodapp.poxp1oy.mongodb.net/online_food_appdb?retryWrites=true&w=majority&appName=foodApp"
export const MONGO_URI = process.env.MONGO_URI || '';
export const DATABASE_NAME= process.env.DATABASE_NAME
export const DATABASE_USERNAME= process.env.DATABASE_USERNAME
export const DATABASE_PASSWORD= process.env.DATABASE_PASSWORD
export const DATABASE_COLLECTION= process.env.DATABASE_COLLECTION
export const JWT_SECRET = "jwt_secret_code"