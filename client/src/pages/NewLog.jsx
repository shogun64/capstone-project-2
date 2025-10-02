import React from "react";
import NavBar from "../components/NavBar"
import LogForm from "../components/LogForm"
import styles from "../styles/NewLog.module.css";

function NewLog({ user, setUser}) {
  if (!user) return (<div className={styles.newlog}>
        <NavBar user={user} setUser={setUser} />
        <h1>You are not signed in.</h1>
        </div>);
  return (
    <div className={styles.newlog}>
        <NavBar user={user} setUser={setUser} />
      <LogForm />
    </div>
  )
}

export default NewLog