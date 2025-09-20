import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LogCard.module.css";

function LogCard({log}) {
  return (
    <div className={styles.logcard}>
        <h2><Link to={`/logs/${log.id}`}>{log.date}</Link></h2>
        <p>Books read: {log.books_read}</p>
        <p>Pages read: {log.pages_read}</p>
        <p>Words read: {log.words_read}</p>
    </div>
  )
}

export default LogCard