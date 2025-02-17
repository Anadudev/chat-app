import { Request, Response } from "express";
import User from "../models/user.model";
import bycrypt from "bcryptjs";
import { generateJWTToken, validateEmail } from "../lib/utils";
import cloudinary from "../lib/cloudinary";


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
			case password.length < 6:
				return res.status(400).send("Password must be at least 6 characters");
			case !validateEmail(email):
				return res.status(400).send("Invalid email format");
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
				_id: newUser._id,
			},
		});
	} catch (error) {
		console.error("[signup] Error signing up user: ", error);
		res.status(500).send("Internal server error");
	}
};

/**
 * Logs a user in and generates a JWT token
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 *
 * @returns {Promise<void>} - A promise that resolves when the user has been logged in and the JWT token has been set
 */
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		// validate user inputs
		switch (true) {
			case !email:
				return res.status(400).send("User email is required");
			case !password:
				return res.status(400).send("User password is required");
			case !validateEmail(email):
				return res.status(400).send("Invalid email format");
		}

		// check if user with email already exists
		const user = await User.findOne({ email }).select("-password");
		if (!user) {
			return res.status(400).send("invalid credentials");
		}

		// check if password is correct
		const isMatch = await bycrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send("Invalid credentials");
		}

		generateJWTToken(user._id.toString(), res);

		res.send(200).json({
			message: "User logged in successfully",
			user
		});
	} catch (error) {
		console.error("[login] Error logging in user: ", error);
		res.status(500).send("Internal server error");
	}
};

/**
 * Logs a user out by clearing the JWT cookie.
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 *
 * @returns {Promise<void>} - A promise that resolves when the user has been logged out
 */
export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie("jwt");
		res.send(200).json({ message: "User logged out successfully" });
	} catch (error) {
		console.error("[logout] Error logging out user: ", error);
		res.status(500).send("Internal server error");
	}
};

/**
 * Updates a user's profile with the given profile picture.
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 *
 * @returns {Promise<void>} - A promise that resolves when the user has been updated
 *
 * @throws {Error} - If there is an error updating the user profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	try {
		// update profile logic
		const { profilePic } = req.body;

		// validate user
		const userId = (req as any).user._id;

		if (!profilePic) {
			return res.status(400).send("Profile picture is required");
		}

		//  upload users profile picture to cloudinary
		const cloudinaryResponse = await cloudinary.uploader.upload(profilePic);
		if (!cloudinaryResponse) {
			return res.status(400).send("Error uploading profile picture");
		}

		// update user profile
		const user = await User.findByIdAndUpdate(userId, { profilePic: cloudinaryResponse.secure_url }, { new: true }).select("-password");

		res.send(200).json({
			message: "User profile updated successfully",
			user
		});
	} catch (error) {
		console.error("[updateProfile] Error updating user profile: ", error);
		res.status(500).send("Internal server error");
	}
};

/**
 * Checks if the user is authenticated.
 *
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 *
 * @returns {Promise<void>} - A promise that resolves when the user has been checked
 *
 * @throws {Error} - If there is an error checking user authentication
 */
export const checkAuth = async (req: Request, res: Response) => {
	try {
		res.status(200).json({
			message: "User is authenticated",
			user: (req as any).user
		});
	} catch (error) {
		console.error("[checkAuth] Error checking user authentication: ", error);
		res.status(500).send("Internal server error");
	}
};
