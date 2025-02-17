import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
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
export const isProtected = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).send("Unauthorized");
		}
		const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
		if (!decoded) {
			return res.status(401).send("Unauthorized");
		}
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(401).send("Unauthorized");
		}
		(req as any).user = user;
		next();
	} catch (error) {
		console.error("[isProtected] Error verifying token: ", error);
	}
}
