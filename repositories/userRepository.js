import User from "../schema/user.js";

//Finds a user based on their role
export const findByRole = async(role) => {
    return User.findOne({role});
}

//Finds a user using their Aadhar card number
export const findByAadharCardNumber = async(aadharCardNumber) => {
    return User.findOne({aadharCardNumber});
}

// Creates a new user document and saves it in the database
export const createUser = async(data) => {
    const newUser = new User(data);
    return newUser.save();
}

// Finds a user by their unique ID
export const findUserById = async(userId) => {
    // Find the user by their ID in the database
    return User.findById(userId);
}

// Updates a user's password and saves the changes
export const updateUserPassword = async(user) => {
    // Save the updated user with the new password
    return user.save();
}

// Updates the isVoted status of a user and saves the changes
export const updateUserVoteStatus = async(user) => {
    try{
       user.isVoted = true;
       return await user.save();
    }catch(error){
       console.error("Update User Vote Status Error:", error.message);
       throw error;
    }
}