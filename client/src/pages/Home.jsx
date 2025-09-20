import React from "react";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar"

function Home({ user, setUser }) {
  return (
    <div className={styles.home}>
        <NavBar user={user} setUser={setUser} />
        <h1>Welcome!</h1>
        <h2>Thank you for using our Reading Log Database.</h2>
        <p>Here, you can use our site to keep track of the progress you've made each day on your reading goals.</p>
        <p>After making an account, click on Reading Logs to begin tracking your journey.</p>
    </div>
  )
}

export default Home