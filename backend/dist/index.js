"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const db_1 = require("./lib/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_1 = require("./lib/socket");
// Load environment variables from .env file
dotenv_1.default.config();
// const app: Express = express();
const PORT = process.env.PORT || 5001;
// Parse incoming requests with JSON payloads
socket_1.app.use(express_1.default.json());
// Increase the limit to 50mb (adjust as needed)
// to handle PayloadTooLargeError: request entity too large
socket_1.app.use(body_parser_1.default.json({ limit: '50mb' }));
socket_1.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
// Parse incoming requests with JSON payloads
socket_1.app.use(express_1.default.json({ limit: '50mb' }));
// Enable cookie parsing
// We will use this to store the JWT token in the cookie
socket_1.app.use((0, cookie_parser_1.default)());
// Enable CORS
socket_1.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
// Define a route for the root path
socket_1.app.get("/", (req, res) => {
    res.send("Express + Typescript Server");
});
socket_1.app.use("/api/auth", auth_route_1.default);
socket_1.app.use("/api/messages", message_route_1.default);
socket_1.app.use("*", (req, res) => {
    res.status(404).send("Route not found");
});
socket_1.server.listen(PORT, () => {
    console.log(`[server] Server is running at http://localhost:${PORT}`);
    // Connect to MongoDB database
    (0, db_1.connectDB)();
});
