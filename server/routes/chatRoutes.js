import express from 'express'
import { getPreviousChats, sendMessage } from '../controllers/Chat.js'
import { protect } from '../middlewares/authorizationMiddleware.js';
export const chatRouter = express.Router();
chatRouter.post('/send', protect, sendMessage);
chatRouter.get('/history',protect, getPreviousChats);

