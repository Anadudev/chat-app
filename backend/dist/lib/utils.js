"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.generateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generates a JSON Web Token (JWT) for the given user ID and sets it as a
 * cookie on the response.
 *
 * @param {string} userId - The user ID to be used to generate the JWT.
 * @param {Response} res - The Express response object to set the cookie on.
 */
const generateJWTToken = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        // httpOnly: prevent the cookie from being accessed by the browser
        httpOnly: true,
        // secure: only use https
        secure: process.env.NODE_ENV !== "development",
        // sameSite: strict, lax, or none
        // - strict: never sent with a request initiated by third party website
        // - lax: sent with requests initiated by third party website, but only for GET requests that are top-level navigations
        // - none: sent with all requests
        sameSite: "strict",
        // maxAge: maximum age of the cookie in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};
exports.generateJWTToken = generateJWTToken;
/**
 * Validate an email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
