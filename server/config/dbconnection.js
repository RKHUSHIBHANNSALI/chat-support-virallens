import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async(uri)=>{
    try{
        await mongoose.connect(uri);
        console.log("successfully connected to the database")

    }catch(error){
        console.log(error.message);
    }
}

const uri = process.env.MONGODB_URI;

connectToDB(uri);