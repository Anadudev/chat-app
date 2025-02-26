var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Jwt from "jsonwebtoken";
import User from "../models/user.model";
/**
 * A middleware function that verifies the JWT token in the request cookie and
 * sets the user to the request object if the token is valid.
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 *
 * @throws {UnauthorizedError} If the JWT token is invalid or missing
 */
export const isProtected = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).send("Unauthorized");
        }
        const user = yield User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).send("Unauthorized");
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("[isProtected] Error verifying token: ", error);
    }
});
