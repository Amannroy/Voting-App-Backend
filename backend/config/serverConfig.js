import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const NODE_URL = process.env.NODE_URL || "development";
export const PROD__URL = process.env.PROD__URL;
export const SECRET_KEY = process.env.SECRET_KEY;