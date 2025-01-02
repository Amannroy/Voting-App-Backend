import { getProfileService, loginService, profilePasswordService, signUpService } from "../services/userService.js";

export const signUp = async(req,res) => {
    try{
        const data = req.body;
       const {response} = await signUpService(data);
       return res.status(201).json({message: "User created successfully", response});
    }catch(error){
       console.error("User controller error", error);
       return res.status(error.statusCode || 500).json({message: error.message || 'Internal Server Error'});       
    }
}

export const login = async(req,res) => {
    try{
      const {aadharCardNumber, password} = req.body;
      const token = await loginService(aadharCardNumber, password);
      res.status(200).json({token});
    }catch(error){
      console.error("Login Controller Error:",error.message);
      res.status(error.statusCode || 500).json({error: error.message || 'Internal Server Error'});
    }
}

export const getProfile = async(req, res) => {
    try{
       const userData = req.body;
       console.log("User Data: ", userData);

       const userId = userData.id;
       const user = await getProfileService(userId);
    
       res.status(200).json({user});
    }catch(error){
       console.error('Profile Controller Error',error.message);
       res.status(500).json({error: error.message || 'Internal Server Error'});
    }
}

export const profilePassword = async(req, res) => {
    try{
        // Extracting Id from the token
        const userId = req.user.id;

        // Extracting current and new passwords from request body
        const {currentPassword, newPassword} = req.body;
        
        // Check if the currentPassword and newPassword are present in the request body
        if(!currentPassword || !newPassword){
            return res.status(400).json({error: 'Both currentPassword and newPassword are required'});
        }

        // Calling the serice to update the user
        const user = await profilePasswordService(userId, currentPassword, newPassword);
        console.log(user);
        

        res.status(200).json({message: 'Password Updated'});
    }catch(error){
         console.error("Update Password Controller Error:",error);
         res.status(error.statusCode || 500).json({error: error.message || 'Internal Server Error'});
    }
}