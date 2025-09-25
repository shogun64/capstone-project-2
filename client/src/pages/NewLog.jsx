import React from "react";
import NavBar from "../components/NavBar"
import styles from "../styles/NewLog.module.css";

function NewLog({ user, setUser}) {
  console.log("test")
  return (
    <div>
        <NavBar user={user} setUser={setUser} />
    </div>
  )
}

export default NewLog