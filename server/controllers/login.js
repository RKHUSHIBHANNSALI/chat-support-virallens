import { User } from "../Schemas/UserSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
export const registerUser = async(req,res)=>{
    try{
        const{firstName, lastName, email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"})
        }

        const existing = await User.findOne({email: email});

        if(existing){
            return res.status(409).json({message: "This email already exists please login"})
        }

        const user = await  new User(req.body);
        await user.save();
        const id = user._id
        const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        res.status(201).json({
            id: user._id,
            email: user.email,
            token: token

        });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const loginUser = async(req,res)=>{
    try{
        const{firstName, lastName, email, password} = req.body;
        const existingUser = await User.findOne({email: email});
        const isPasswordCorrect = existingUser ? await bcrypt.compare(password, existingUser.password): false;
        if(!existingUser || !isPasswordCorrect){
            return res.status(401).json({message: "Invalid Credentials"})
        }
        const id = existingUser._id
        const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})

        return res.json({
            id: id,
            email: email,
            token: token
        })

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

