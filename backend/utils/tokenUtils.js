import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/serverConfig.js';

const secret_key = SECRET_KEY;

export const generateToken = (payload) => {
    return jwt.sign(payload, secret_key, {expiresIn: '24h'});
}