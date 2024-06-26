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
exports.Authenticate = void 0;
const utils_1 = require("../utils");
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = yield (0, utils_1.ValidateSignature)(req);
        if (validate) {
            next();
        }
        else {
            res.status(400).json({
                message: "Not authorized",
                status: "error",
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            status: "error",
        });
    }
});
exports.Authenticate = Authenticate;
