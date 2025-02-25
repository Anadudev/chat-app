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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getMessages = exports.getUsersForSidebar = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const socket_1 = require("../lib/socket");
const socket_2 = require("../lib/socket");
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
const getUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = req.user;
        const filteredUsers = yield user_model_1.default.find({
            _id: { $ne: loggedInUser._id }
        }).select("-password");
        res.set(200).json({
            users: filteredUsers
        });
    }
    catch (error) {
        console.error("[getUsersForSidebar] Error getting users for sidebar: ", error);
        res.set(500).json("Internal server error");
    }
});
exports.getUsersForSidebar = getUsersForSidebar;
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
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const senderId = req.user._id;
        const messages = yield message_model_1.default.find({
            $or: [
                { senderId, receiverId: id },
                { senderId: id, receiverId: senderId }
            ]
        });
        res.set(200).json({
            messages
        });
    }
    catch (error) {
        console.error("[getMessages] Error getting messages: ", error);
        res.set(500).json("Internal server error");
    }
});
exports.getMessages = getMessages;
/**
 * Sends a message from the logged-in user to another user specified by the ID in the request parameters.
 * Optionally uploads an image to Cloudinary if provided in the request body.
 *
 * @param {Request} req - The express request object containing the message data and user information.
 * @param {Response} res - The express response object used to send back the created message.
 *
 * @returns {Promise<void>} - A promise that resolves when the message has been sent and saved in the database.
 *
 * @throws {Error} - If there is an error sending the message or uploading the image, it sends a 400 or 500 status with an error message.
 */
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, image } = req.body;
        const { id } = req.params;
        const senderId = req.user._id;
        let imageUrl = "";
        if (image) {
            const cloudinaryResponse = yield cloudinary_1.default.uploader.upload(image);
            if (!cloudinaryResponse) {
                return res.set(400).send("Error uploading profile picture");
            }
            imageUrl = cloudinaryResponse.secure_url;
        }
        const message = yield message_model_1.default.create({
            senderId,
            receiverId: id,
            text,
            image: imageUrl
        });
        yield message.save();
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(id);
        if (receiverSocketId) {
            socket_2.io.to(receiverSocketId).emit("newMessage", message);
        }
        res.set(200).json({
            message
        });
    }
    catch (error) {
        console.error("[sendMessage] Error sending message: ", error);
        res.set(500).json("Internal server error");
    }
});
exports.sendMessage = sendMessage;
