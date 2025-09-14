# Minimal AI Customer Support Agent

A full-stack chat application that authenticates users using jwt , hashes password using bcrypt , lets them converse with an AI assistant, and persists each conversation in MongoDB.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
- [API Endpoints](#api-endpoints)  

## Features

- JWT-based authentication (signup, login)  
- Bcrypt password hashing & protected routes  
- Real-time chat UI with optimistic updates and auto-scroll  
- AI-generated responses via OpenRouter.ai  


## Tech Stack

| Layer           | Technology                  |
| --------------- | ----------------------------|
| Backend         | Node.js · Express           |
| Database        | MongoDB · Mongoose          |
| Authentication  | JWT · bcrypt                |
| AI Integration  | OpenRouter.ai (openai SDK)  |
| Frontend        | React · Axios · CSS Modules |
| Env & DevOps    | dotenv · GitHub Desktop  . onRender   |

## Getting Started

### Prerequisites

- Node.js v14+ and npm  
- MongoDB Atlas account or local MongoDB instance  
- OpenRouter.ai API key  
- Create `.env` files inside `server/` and specify the following PORT, MONGODB_URI, JWT_SECRET, API_KEY , OPENAI_BASE_URL

### Installation

1. Clone the repository  
   ```bash
   git clone git@github.com:RKHUSHIBHANNSALI/chat-support-virallens.git
   cd chat-support 
2. Enter the backend directory with cd server command and run npm i and node index.js to have the server started 

3. Enter the frontend directory using cd client and run npm start

### API end points 

1. /api/auth/signup to get the users signed up
2. /api/auth/login to login the user and go ahead for the chat support 
3. /chat/history to retrieve the previous conversations
4. /chat/send to send the query and OpenRouter providing with the answers







