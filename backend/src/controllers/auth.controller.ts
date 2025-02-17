import { Request, Response } from "express";
import User from "../models/user.model";
import bycrypt from "bcryptjs";
import { generateJWTToken } from "../lib/utils";

/**
 * Signup user endpoint
 *
 * @remarks
 * This endpoint is used to create a new user.
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 *
 * @returns {Promise<void>} - A promise that resolves when the user has been created
 */
export const signup = async (req: Request, res: Response) => {
	try {
		// signup logic
		const { name, email, password } = req.body;

		// validate user inputs
		switch (true) {
			case !name:
				return res.status(400).send("user name is required");
			case !email:
				return res.status(400).send("User email is required");
			case !password:
				return res.status(400).send("User password is required");
			case (password.length < 6): 
			return res.status(400).send("Password must be at least 6 characters");
		}

		// check if user with email already exists
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).send("User with this email already exists");
		}

		// hash users password
		const salt = await bycrypt.genSalt(10);
		const hashedPassword = await bycrypt.hash(password, salt);

		// create new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		if (!newUser) {
			return res.status(400).send("Invalid user data");
		}

		generateJWTToken(newUser._id.toString(), res);

		// save user
		await newUser.save();

		res.send(200).json({
			message: "User registered successfully",
			user: {
				name: newUser.name,
				email: newUser.email,
				id: newUser._id,
			},
		});
	} catch (error) {
		console.error("[signup] Error signing up user: ", error);
		res.status(500).send("Internal server error");
	}
};

export const login = (req: Request, res: Response) => {
	try {
		res.send("login route");
	} catch (error) { }
};

export const logout = (req: Request, res: Response) => {
	try {
		res.send("logout route");
	} catch (error) { }
};
