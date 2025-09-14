import express from 'express'
import { loginUser,registerUser } from '../controllers/login.js';

const authRouter = express.Router();
authRouter.post('/login', loginUser);
authRouter.post('/signup', registerUser);

export default authRouter;