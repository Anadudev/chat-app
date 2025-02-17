// src/index.ts

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import { connectDB } from "./lib/db";


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Express + Typescript Server");
});

app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
	console.log(`[server] Server is running at http://localhost:${PORT}`);
	// Connect to MongoDB database
	connectDB();
});
