import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const afterSubmit = async(e) =>{
        e.preventDefault();

        setError('');

        if(!email || !password){
            setError('Please fill in both the fields to proceed further');
            return;
        }
        try{
            await login(email,password);
            navigate("/chat")

        }catch(error){
            console.log(error.message);
            console.log(error.response.data.message)
            setError(error.response?.data?.message || error.message);
        }
    }

    return(
        <div className="login-card">
            <div className="login-container">
                <div className="user-symbol">
                    <div className="user-icon">👤</div>
                </div>
                <h2>Login</h2>
                {error && (
                    <div role="alert" className="error">
                        {error}
                    </div>
                )
                }
                <form className="login-form" onSubmit={afterSubmit}>
                    <label>Email</label>
                    <input 
                    type="email"
                    placeholder="sampleemail.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                    type="password"
                    placeholder="securedpassword"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button type="Submit"> LOG IN</button>
                </form>
                <div className="linkto-signup">
                    <p>
                       Don't have an account?<Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
            

        </div>

    );

}