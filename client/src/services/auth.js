import axios from 'axios';

const API_URL = 'http://localhost:5000'

export async function login(email,password){
    const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
    });
    if(response.data.token){
        localStorage.setItem('token', response.data.token);
    }
    
    return {
        id:  response.data.id,
        email: response.data.email
    }
}

export async function signup(firstName, lastName, email, password) {
    const response = await axios.post(`${API_URL}/api/auth/signup`,{
        firstName,
        lastName,
        email,
        password
    });

    if(response.data.token){
        localStorage.setItem('token', response.data.token);
    };

    return {
        id: response.data.id,
        email: response.data.email
    }
    
}