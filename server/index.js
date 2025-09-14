import express from "express"
import './config/dbconnection.js'
import cors from 'cors'
import authRouter from "./routes/authRoutes.js";
import { chatRouter } from "./routes/chatRoutes.js";
import dotenv from 'dotenv'

dotenv.config();
const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'https://chat-support-virallens-1.onrender.com/']}));

app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/chat', chatRouter)

const PORT = 5000;
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Backend listening on the ${PORT}`)
})