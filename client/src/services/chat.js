import axios from "axios";

const API_URL = 'http://localhost:5000';

export function getPreviousChats(token){
    return axios.get(`${API_URL}/chat/history`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

export function sendMessage({conversationId, message}, token){
    console.log("hey sending message")
    return axios.post(`${API_URL}/chat/send`, {
        conversationId,
        message},
        {
            headers: {
                 Authorization: `Bearer ${token}`,
                 'Content-Type': 'application/json'
            }
        }
    )
}

export function logout(){
    localStorage.removeItem('token')
}
