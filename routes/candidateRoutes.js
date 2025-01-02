import express from "express";
import { jwtAthMiddleware } from "../Middleware/authMiddleware.js";
import { allCandidatesController, countVotingController, createCandidateController, deleteCandidateController, getVotingController, updateCandidateController } from "../controllers/candidateController.js";

const router = express.Router();

router.post("/", jwtAthMiddleware, createCandidateController);
router.put('/:candidateID', jwtAthMiddleware, updateCandidateController);
router.delete("/:candidateID",jwtAthMiddleware, deleteCandidateController);
router.get("/vote/:candidateID",jwtAthMiddleware, getVotingController);
router.get('/vote/count', countVotingController);
router.get('/',allCandidatesController);

export default router;
