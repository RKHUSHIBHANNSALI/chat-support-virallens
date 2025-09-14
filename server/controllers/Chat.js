import express from 'express';
import { Conversation } from '../Schemas/ChatSchema.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});

export const getPreviousChats = async(req,res)=>{
    const conversations = await Conversation.find({user: req.userId}).sort({updatedAt: -1}).lean();
    return res.json(conversations);
}

export const sendMessage = async(req,res)=>{
    const {message,conversationId} = req.body;
    if(!message) return res.status(400).json({message: 'Please enter message it is required'});

    let conversation = null;
    if(!conversation){
        conversation = new Conversation({user: req.userId, messages: []})
    }

    conversation.messages.push({sender: 'user', content: message});
    conversation.updatedAt = new Date();
    await conversation.save();


    const history = conversation.messages.map(m=>({
        role: m.sender === 'user' ? 'user' : 'ai',
        content: m.content
    }));

    const completion = await openai.chat.completions.create({
        model: 'openai/gpt-3.5-turbo',
        messages: history,
    })

    const aiReply = completion.choices[0].message.content.trim();

    conversation.messages.push({sender: 'ai', content: aiReply});
    conversation.updatedAt = new Date();
    await conversation.save();

    res.json({ conversationId: conversation._id, reply: aiReply});
}