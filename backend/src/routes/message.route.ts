import express, { Express, Request, Response } from "express";
import { isProtected } from "../middleware/auth.middleware";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.get("/users", isProtected as any, getUsersForSidebar as any);
router.get("/:id", isProtected as any, getMessages as any);
router.post("/send/:id", isProtected as any, sendMessage as any);

export default router
