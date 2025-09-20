import React from "react";
import { useNavigate, NavLink} from "react-router-dom"
import styles from "../styles/NavBar.module.css";

function NavBar({ user, setUser }) {
  const navigate = useNavigate()
  
  const logout = async () => {
        let data = null
        let error = null
        try {
            const response = await fetch('/api/logout', {
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
    <nav className={styles.navbar}>
      <div className={styles.navlinks}>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/logs" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Reading Logs</NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Login/Signup</NavLink>
      </div>
      <button onClick={handleLogout} className={styles.logout}>Logout</button>
    </nav>
  )
}

export default NavBar