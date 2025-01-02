import {
  createUser,
  findByAadharCardNumber,
  findByRole,
  findUserById,
  updateUserPassword,
} from "../repositories/userRepository.js";
import { generateToken } from "../utils/tokenUtils.js";
import {
  validateAadharCardNumber,
  validateEmail,
  validatePassword,
} from "../validation/validation.js";

export const signUpService = async (data) => {
  try {
    // Check if there is already an admin user

    if (data.role === "admin") {
      const adminUser = await findByRole("admin");
      if (adminUser) {
        const error = new Error("Admin user already exists");
        error.statusCode = 400;
        throw error;
      }
    }

    // Validate Input Fields
    validateEmail(data.email);
    validatePassword(data.password);
    validateAadharCardNumber(data.aadharCardNumber);

    // Check if a user with the same Aadhar card Number already exists
    const existingUser = await findByAadharCardNumber(data.aadharCardNumber);
    if (existingUser) {
      const error = new Error(
        "User with the same Aadhar Card Number already exists"
      );
      error.statusCode = 400;
      throw error;
    }

    // Create and save the new user
    const newUser = await createUser(data);

    return { response: newUser };
  } catch (error) {
    console.error("Sign Up Service Error:", error);
    throw error;
  }
};

export const loginService = async (aadharCardNumber, password) => {
  try {
    // Check if aadharCardNumber or password is missing
    if (!aadharCardNumber || !password) {
      const error = new Error("Aadhar Card Number and Password are required");
      error.statusCode = 400;
      throw error;
    }

    // Find the user by aadharCardNumber
    const user = await findByAadharCardNumber(aadharCardNumber);

    if(!user){
      const error = new Error("Invalid Aadhar Card Number or Password");
      error.statusCode = 401;
      throw error;
    }

    // Compare the password with the stored hashed password
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
      const error = new Error("Invalid Aadhar Card Number or Password");
      error.statusCode = 401;
      throw error;
    }

    // Generate a JWT Token
    const payload = {
      id: user.id,
    };

    const token = generateToken(payload);
    return token;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
};

export const getProfileService = async (userId) => {
  try {
    // Fetch the user profile by ID
    const user = await findUserById(userId);

    // if the user is not found, throw an error
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return user;
  } catch (error) {
    console.error("profile Service Error:", error.message);
    throw error;
  }
};

export const profilePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  try {
    // Find the user by ID
    const user = await findUserById(userId);

    // Check if the user exists
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Check if the current password matches
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      const error = new Error("Invalid current password");
      error.statusCode = 401;
      throw error;
    }

    // Update the user's password
    user.password = newPassword;
    await updateUserPassword(user);

    console.log("Password Updated");
    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    console.error("Update Password Service Error:", error.message);
    throw error;
  }
};

export const checkAdminRoleService = async(userID) => {
  try{
      const user = await findUserById(userID);
      return user.role === "admin";
  }catch(error){
      console.error("Check Admin Role Service Error:", error.message);
      throw error;
  }
}
