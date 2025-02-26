import express from "express";
import { isProtected } from "../middleware/auth.middleware";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller";
const router = express.Router();
router.get("/users", isProtected, getUsersForSidebar);
router.get("/:id", isProtected, getMessages);
router.post("/send/:id", isProtected, sendMessage);
export default router;
