import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { signup } from "../services/auth.js";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [firstName, setFirstName] = useState('');
    const [lasstName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const afterSubmit = async(e) =>{
        e.preventDefault();

        setError('');

        if(!email || !password){
            setError('Email and password are required fields');
            return;
        }

        try{
            await signup(firstName,lasstName,email,password);
            navigate("/login")
        }catch(error){
            setError(error.response?.data?.message || error.message);

        }
    }

    return(
        <div className="login-card">
            <div className="login-container">
                <div className="user-symbol">
                    <div className="user-icon">👤</div>
                </div>
                <h2>Sign up</h2>
                {error && (
                    <div role="alert" className="error">
                        {error}
                    </div>
                )
                }
                <form className="login-form" onSubmit={afterSubmit}>
                    <label>First Name</label>
                    <input 
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    />
                    <label>Last Name</label>
                    <input 
                    type="text"
                    placeholder="Last Name"
                    value={lasstName}
                    onChange={(e)=>setLastName(e.target.value)}
                    />
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
                    <button type="Submit"> SIGN UP</button>
                </form>
                <div className="linkto-signup">
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>

    )




}