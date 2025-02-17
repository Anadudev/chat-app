import express, { Express, Request, Response } from "express";
import {
	signup,
	login,
	logout,
	updateProfile,
	checkAuth
} from "../controllers/auth.controller";
import { isProtected } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", signup as any);

router.post("/login", login as any);

router.post("/logout", logout as any);

router.put("/update-profile", isProtected as any, updateProfile as any);

router.get("/check", isProtected as any, checkAuth as any);

export default router;
