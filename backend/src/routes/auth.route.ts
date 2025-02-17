import express, { Express, Request, Response } from "express";
import { signup, login, logout } from "../controllers/auth.controller";

const router = express.Router();

router.post('/signup', signup as any);

router.post('/login', login as any);

router.post('/logout', logout as any);


export default router;
