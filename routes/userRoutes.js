import express from "express";
import { getProfile, login, profilePassword, signUp } from "../controllers/userController.js";
import { jwtAthMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile",jwtAthMiddleware, getProfile);
router.put('/profile/password', jwtAthMiddleware, profilePassword);

export default router;
