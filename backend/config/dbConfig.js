import mongoose from "mongoose";
import { MONGODB_URL, NODE_URL, PROD__URL } from "./serverConfig.js";

export default async function connectDB(){
    try{
       if(NODE_URL === 'development'){
        await mongoose.connect(MONGODB_URL);
       }else if(NODE_URL === 'production'){
        await mongoose.connect(PROD__URL);
       }
       console.log(`Connected to mongodb database from ${NODE_URL} environment`);
    }catch(error){
        console.log('Error connecting to database', error);
        
    }
}