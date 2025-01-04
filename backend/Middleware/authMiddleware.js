import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/serverConfig.js';

export const jwtAuthMiddleware = (req, res,next) =>{
    // First check the request headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization)  return res.status(401).json({error: 'Token Not Found'});

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{   
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Ensure the decoded token has required fields
        if(!decoded.id || !decoded.role){
            return res.status(401).json({error: 'Invalid Token: Missing User Information'});
        }
        // Attach user information to the request body
        req.user = {
            id: decoded.id,
            role: decoded.role,
        }
        next();
    }catch(error){
       console.error(error);
       res.status(401).json({error: 'Invalid Token'});
    }
}