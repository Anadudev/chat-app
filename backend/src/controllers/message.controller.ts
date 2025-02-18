import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

/**
 * Retrieves a list of users for the sidebar, excluding the logged-in user.
 *
 * @param {Request} req - The express request object, containing the logged-in user.
 * @param {Response} res - The express response object used to send back the filtered users.
 *
 * @returns {Promise<void>} - A promise that resolves when the users have been retrieved and sent in the response.
 *
 * @throws {Error} - If there is an error retrieving the users, it sends a 500 status with an error message.
 */

export const getUsersForSidebar = async (req: Request, res: Response) => {
	try {
		const loggedInUser = (req as any).user;
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUser._id }
		}).select("-password");
		res.status(200).json({
			users: filteredUsers
		})
	} catch (error) {
		console.error("[getUsersForSidebar] Error getting users for sidebar: ", error);
		res.status(500).json("Internal server error");
	}
};


/**
 * Retrieves messages between the logged-in user and another user specified by the ID in the request parameters.
 *
 * @param {Request} req - The express request object containing the user information and parameters.
 * @param {Response} res - The express response object used to send back the retrieved messages.
 *
 * @returns {Promise<void>} - A promise that resolves when the messages have been retrieved and sent in the response.
 *
 * @throws {Error} - If there is an error retrieving the messages, it sends a 500 status with an error message.
 */

export const getMessages = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const senderId = (req as any).user._id;
		const messages = await Message.find({
			$or: [
				{ senderId, receiverId: id },
				{ senderId: id, receiverId: senderId }
			]
		});

		res.status(200).json({
			messages
		})
	} catch (error) {
		console.error("[getMessages] Error getting messages: ", error);
		res.status(500).json("Internal server error");
	}
};

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { text, image } = req.body;
		const { id } = req.params;
		const senderId = (req as any).user._id;

		let imageUrl = "";

		if (image){
			const cloudinaryResponse = await cloudinary.uploader.upload(image);
			if (!cloudinaryResponse) {
				return res.status(400).send("Error uploading profile picture");
			}
			imageUrl = cloudinaryResponse.secure_url;
		}

		const message = await Message.create({
			senderId,
			receiverId: id,
			text,
			image: imageUrl
		});

		await message.save();

		// todo: realtime functionality goes here using socket.io
		res.status(200).json({
			message
		})
	} catch (error) {
		console.error("[sendMessage] Error sending message: ", error);
		res.status(500).json("Internal server error");
	}
}
