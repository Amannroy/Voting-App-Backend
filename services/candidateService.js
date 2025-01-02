import { findAllCandidates, findAllCandidatesAndSelectOnlyNameAndPartyExcludingID, findCandidateById, findDeletedCandidateData, findUpdatedCandidateData, saveCandidate, updateCandidateVotes } from "../repositories/candidateRepository.js";
import { findUserById, updateUserVoteStatus } from "../repositories/userRepository.js";


export const createCandidateService = async(candidateData) => {
    try{
        const savedCandidate = await saveCandidate(candidateData);
        console.log('Data Saved');
        return savedCandidate;
    }catch(error){
        console.error(error);
        console.error("Create Candidate Servcie Error:", error.message);
        throw error;
    }
}

export const updateCandidateService = async(candidateID, updatedCandidateData) => {
    try{
       const updatedCandidate = await findUpdatedCandidateData(candidateID, updatedCandidateData);
       return updatedCandidate;
    }catch(error){
       console.error("Update Candidate Service Error:", error.message);
       throw error;
       
    }
}

export const deleteCandidateService = async(candidateID) => {
    try{
       const deletedCandidate = await findDeletedCandidateData(candidateID);
       return deletedCandidate;
    }catch(error){
       console.error("Delete Candidate Service Error:", error.message);
       throw error;
       
    }
}
export const voteForCandidateService = async(candidateID, userID) => {
    try{
        // Check if candidate exists
       const candidate = await findCandidateById(candidateID);
       if(!candidate){
        const error = new Error("Candidate Not Found");
        error.statusCode = 404;
        throw error;
       }
       
       // Check if user exists
       const user = await findUserById(userID);
       if(!user){
        const error = new Error("User Not Found");
        error.statusCode = 404;
        throw error;
       }

       // Check if the user is an admin
        if(user.role === "admin"){
            const error = new Error("Admin is not allowed to vote");
            error.statusCode = 403;
            throw error;
        }

        //Check if the user has already voted
        if(user.isVoted){
            const error = new Error("You have already voted");
            error.statusCode = 400;
            throw error;
        }

        // Update candidate votes and user vote status
        const updatedCandidate = await updateCandidateVotes(candidate, userID);
        await updateUserVoteStatus(user);

        return updatedCandidate;
    }catch(error){
       console.error("Vote For Candidate Service Error:", error.message);
       throw error;
       
    }
}

export const getVoteCountService = async() => {
    try{
       // Fetch all candidates from repository
      const candidates = await findAllCandidates();
         
      // Map to return only name and vote count
       return candidates.map(candidate => ({party: candidate.party, count: candidate.voteCount}));

    }catch(error){
       throw new Error("Error fetching vote count");
    }
}

export const getAllCandidates = async() => {
    try{
        return await findAllCandidatesAndSelectOnlyNameAndPartyExcludingID();
    }catch(error){
        throw new Error("Error Fetching Candidates");
    }
}