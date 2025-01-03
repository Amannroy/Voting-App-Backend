import Candidate from "../schema/candidate.js";

// Creates a new candidate document and saves it in the database
export const saveCandidate = async (candidateData) => {
  try {
    const newCandidate = new Candidate(candidateData);
    const savedCandidate = await newCandidate.save();
    return savedCandidate;
  } catch (error) {
    console.error("Saved Candidate Repository Error:", error.message);
    throw error;
  }
};

// Updates a candidate's data using their ID and returns the updated document
export const findUpdatedCandidateData = async (
  candidateID,
  updatedCandidateData
) => {
  try {
    const updateCandidate = await Candidate.findByIdAndUpdate(
      candidateID,
      updatedCandidateData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updateCandidate;
  } catch (error) {
    console.error("Find Candidate By ID and Update Repository Error:", error.message);
    throw error;
  }
};

// Deletes a candidate using their ID and returns the deleted document
export const findDeletedCandidateData = async (
  candidateID,
) => {
  try {
    const deleteCandidate = await Candidate.findByIdAndDelete(candidateID);
    return deleteCandidate;
  } catch (error) {
    console.error("Delete Repository Error:", error.message);
    throw error;
  }
};

// Finds and returns a candidate by their ID
export const findCandidateById = async(candidateID) => {
  try{
     return await Candidate.findById(candidateID);
  }catch(error){
     console.error("Find Candidate By ID Error:", error.message);
     throw error;
  }
}

// Updates the vote count and stores a vote for a specific candidate and user ID
export const updateCandidateVotes = async(candidate, userID) => {
  try{
     candidate.votes.push({user: userID});
     candidate.voteCount++;
     return await candidate.save();
  }catch(error){
     console.error("Update Candidate Votes Error:", error.message);
     throw error;
  }
}

// Fetching candidates from database and sort vote count in descending order
export const findAllCandidates = async () => {
  try {
    console.log("Fetching all candidates");
    const candidates = await Candidate.find().sort({ voteCount: -1 });
    console.log("Candidates fetched:", candidates); // Debug log
    return candidates;
  } catch (error) {
    console.error("Error in findAllCandidates:", error.message);
    throw error;
  }
};


// Get List of all candidates with only name and party fields
export const findAllCandidatesAndSelectOnlyNameAndPartyExcludingID = async() => {
  try{
     // Find all candidates and select only the name and party fields, excluding _id
     return await Candidate.find({}, 'name party -_id')
  }catch(error){
     throw error;
  }
}