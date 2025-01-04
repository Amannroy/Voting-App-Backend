import {
  createCandidateService,
  deleteCandidateService,
  getAllCandidates,
  getVoteCountService,
  updateCandidateService,
  voteForCandidateService,
} from "../services/candidateService.js";
import { checkAdminRoleService } from "../services/userService.js";

export const createCandidateController = async (req, res) => {
  try {
    const userID = req.user.id;

    // Check if the user has an admin role
    const isAdmin = await checkAdminRoleService(userID);
    if (!isAdmin) {
      return res.status(403).json({ message: "User does not have admin role" });
    }

    // Pass the candidate data to the service
    const candidateData = req.body;
    const response = await createCandidateService(candidateData);

    res.status(200).json({ response });
  } catch (error) {
    console.error("Create Candidate Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCandidateController = async (req, res) => {
  try {
    const userID = req.user.id;

    // Check if the user has an admin role
    const isAdmin = await checkAdminRoleService(userID);
    if (!isAdmin) {
      return res.status(403).json({ message: "User does not have admin role" });
    }

    // Extract the id from the URL parameter
    const candidateID = req.params.candidateID;
    // Updated data for the user
    const updatedCandidateData = req.body;

    const response = await updateCandidateService(
      candidateID,
      updatedCandidateData
    );

    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("Candidate Data Updated");
    res
      .status(200)
      .json({ message: "Candidate Updated Successfully", response });
  } catch (error) {
    console.log("Updated Candidate Controller Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteCandidateController = async (req, res) => {
  try {
    const userID = req.user.id;

    // Check if the user has an admin role
    const isAdmin = await checkAdminRoleService(userID);
    if (!isAdmin) {
      return res.status(403).json({ message: "User does not have admin role" });
    }

    // Extract the id from the URL parameter
    const candidateID = req.params.candidateID;

    const response = await deleteCandidateService(candidateID);

    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    console.log("Candidate Data Deleted");
    res
      .status(200)
      .json({ message: "Candidate Deleted Successfully", response });
  } catch (error) {
    console.log("Deleted Candidate Controller Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVotingController = async (req, res) => {
  const candidateID = req.params.candidateID;
  const userID = req.user.id;

  try {
    // Call service to handle voting logic
    const result = await voteForCandidateService(candidateID, userID);

    res.status(200).json({ message: "Vote Recorded Successfully", result });
  } catch (error) {
    console.error("Vote Candidate Controller Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const countVotingController = async (req, res) => {
  try {
    console.log("Request URL:", req.url);
    console.log("Request Params:", req.params); 
    console.log("Request Query:", req.query);   

    const voteRecord = await getVoteCountService();
    return res.status(200).json(voteRecord);
  } catch (error) {
    console.error("Error in countVotingController:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const allCandidatesController = async(req, res) => {
    try{
        const candidates = await getAllCandidates();
        return res.status(200).json(candidates);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}