// src/index.ts

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { connectDB } from "./lib/db";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

// Parse incoming requests with JSON payloads
app.use(express.json());

// Enable cookie parsing
// We will use this to store the JWT token in the cookie
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
	res.send("Express + Typescript Server");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.use("*", (req: Request, res: Response) => {
	res.status(404).send("Route not found");
});

app.listen(PORT, () => {
	console.log(`[server] Server is running at http://localhost:${PORT}`);
	// Connect to MongoDB database
	connectDB();
});
