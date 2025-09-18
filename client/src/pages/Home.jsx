import React from "react";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar"

function Home({ user, setUser }) {
  return (
    <div>
        <NavBar user={user} setUser={setUser} />
    </div>
  )
}

export default Home