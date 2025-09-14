import jwt from 'jsonwebtoken'
import { User } from '../Schemas/UserSchema.js'

export const protect = async(req,res,next)=>{
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.startsWith('Bearer') ? authorizationHeader.split(' ')[1] : null;
    if(!token){
        return res.status(401).json({message: 'NO token found , hence not authorized'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        req.userId= req.user._id;
        next()
    }catch(error){
        res.status(401).json({message: `${error.message}`})
    }
}