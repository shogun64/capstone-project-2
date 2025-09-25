import React from "react";
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from "../styles/SignupForm.module.css";

function SignupForm({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPassword_Confirmation] = useState("")
    const navigate = useNavigate()

    const signup = async () => {
            let data = null
            let error = null
            try {
                const response = await fetch('/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password, password_confirmation})
            })
            if (!response.ok) throw new Error("Signup failed");
                data = await response.json();
                r.json().then((user) => onLogin(user));
            } catch (err) {
                error = (err.message);
            } finally {
                return {data, error}
            }
        }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { data, error } = signup()
        if (error) return <p className={styles.error}>Error: {error}</p>;
        navigate('/')
    } 

    return (
        <div>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password-confirmation'>Confirm password: </label>
                    <input type='password' id='password-confirmation' value={password_confirmation} onChange={(e) => 
                        setPassword_Confirmation(e.target.value)}/>
                </div>
                <div>
                    <button className="signup-button" type='submit' >Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm