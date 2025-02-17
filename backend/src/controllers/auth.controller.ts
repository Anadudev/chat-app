import { Request, Response } from "express";
import User from "../models/user.model";
import bycrypt from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
	try {
		// signup logic
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).send('All fields are required');
		}
		// password length validation
		if (password.length < 6) {
			return res.status(400).send('Password must be at least 6 characters');
		}

		// check if user with email already exists
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).send('User with this email already exists');
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
			return res.status(400).send('Invalid user data');
		}


		// save user
		await newUser.save();

		res.send('signup route');
	} catch (error) {

	}
}

export const login = (req: Request, res: Response) => {
	try {
		res.send('login route');
	} catch (error) {

	}
}

export const logout = (req: Request, res: Response) => {
	try {
		res.send('logout route');
	} catch (error) {

	}
}
