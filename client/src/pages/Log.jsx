import React from "react";
import NavBar from "../components/NavBar"
import styles from "../styles/Log.module.css";

function Log({ user, setUser }) {
  return (
    <div>
      <NavBar user={user} setUser={setUser} />
    </div>
  )
}

export default Log