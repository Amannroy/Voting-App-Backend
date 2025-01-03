import express from "express";
import { jwtAuthMiddleware } from "../Middleware/authMiddleware.js";
import { allCandidatesController, countVotingController, createCandidateController, deleteCandidateController, getVotingController, updateCandidateController } from "../controllers/candidateController.js";

const router = express.Router();

router.post("/", jwtAuthMiddleware, createCandidateController);
router.put('/:candidateID', jwtAuthMiddleware, updateCandidateController);
router.delete("/:candidateID",jwtAuthMiddleware, deleteCandidateController);
router.get("/vote/:candidateID",jwtAuthMiddleware, getVotingController);
router.get("/voteCount", countVotingController);
router.get("/",allCandidatesController);

export default router;
