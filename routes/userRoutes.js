import express from "express";
import { getProfile, login, profilePassword, signUp } from "../controllers/userController.js";
import { jwtAuthMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile",jwtAuthMiddleware, getProfile);
router.put('/profile/password', jwtAuthMiddleware, profilePassword);

export default router;
