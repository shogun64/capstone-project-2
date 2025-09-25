import React from "react";
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from "../styles/LoginForm.module.css";

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        let data = null
        let error = null
        try {
            const response = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
            })
            if (!response.ok) throw new Error("Login failed");
            data = await response.json();
            r.json().then((user) => onLogin(user));
        } catch (err) {
            error = (err.message);
        } finally {
            return {data, error}
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const { data, error } = login()
        if (error) return <p className={styles.error}>Error: {error}</p>;
        navigate('/')
    }

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className="login-button" type='submit' >Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm