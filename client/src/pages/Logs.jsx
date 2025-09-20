import React from "react";
import NavBar from "../components/NavBar"
import useFetchData from "../hooks/useFetchData";
import styles from "../styles/Logs.module.css";

function Logs({ user, setUser }) {
  const { data, loading, error } = useFetchData(`http://127.0.0.1:5555/logs`);
  if (loading) return <p className={styles.loading}>Loading results...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  return (
    <div>
        <NavBar user={user} setUser={setUser} />
    </div>
  )
}

export default Logs