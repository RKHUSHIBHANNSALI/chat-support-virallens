import { timeStamp } from "console";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
    sender: {type: String, enum: ['user', 'ai'], required: true},
    content: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now}
});

const conversationScehma = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    messages: [messageSchema],
    updatedAt: {type: Date, default: Date.now}
})

export const Conversation = mongoose.model('Conversation', conversationScehma);