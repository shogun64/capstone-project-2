import React from "react";
import { useNavigate, NavLink} from "react-router-dom"
import styles from "../styles/NavBar.module.css";

function NavBar({ user, setUser }) {
  const navigate = useNavigate()
  
  const logout = async () => {
        let data = null
        let error = null
        try {
            const response = await fetch('http://127.0.0.1:5555/logout', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: null
        })
        if (!response.ok) throw new Error("Logout failed");
            data = await response.json();
            setUser(null);
        } catch (err) {
            error = (err.message);
        } finally {
            return {data, error}
        }
    }

  async function handleLogout() {
    const { data, error } = logout()
    if (error) return <p className={styles.error}>Error: {error}</p>;
    navigate('/')
  }

  return (
    <div className={styles.navbar}>
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  )
}

export default NavBar