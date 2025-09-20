import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar"
import LoginForm from "../components/LoginForm.jsx";
import SignupForm from "../components/SignupForm.jsx";
import styles from "../styles/Login.module.css";

function Login({ user, onLogin }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        showLogin ? (<div className={styles.login}>
            <NavBar/>
            <LoginForm onLogin={onLogin}/>
            <p>If you don't yet have an account, go <button onClick={() => setShowLogin(false)}>here</button>:</p>
        </div>) : (<div className={styles.signup}>
            <NavBar/>
            <SignupForm onLogin={onLogin}/>
            <p>If you already have an account, go <button onClick={() => setShowLogin(true)}>here</button>:</p>
        </div>)
    )
}

export default Login