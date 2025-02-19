// src/index.ts

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { connectDB } from "./lib/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

// Parse incoming requests with JSON payloads
app.use(express.json());


// Increase the limit to 50mb (adjust as needed)
// to handle PayloadTooLargeError: request entity too large
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Parse incoming requests with JSON payloads
app.use(express.json({ limit: '50mb' }));

// Enable cookie parsing
// We will use this to store the JWT token in the cookie
app.use(cookieParser());

// Enable CORS
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));

// Define a route for the root path


app.get("/", (req: Request, res: Response) => {
	res.send("Express + Typescript Server");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use("*", (req: Request, res: Response) => {
	res.status(404).send("Route not found");
});

app.listen(PORT, () => {
	console.log(`[server] Server is running at http://localhost:${PORT}`);
	// Connect to MongoDB database
	connectDB();
});
