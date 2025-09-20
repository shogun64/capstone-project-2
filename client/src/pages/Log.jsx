import React from "react";
import NavBar from "../components/NavBar"
import styles from "../styles/Log.module.css";

function Log({ user, setUser, log }) {
  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <h2>{log.date}</h2>
      <p>Books read: {log.books_read}</p>
      <p>Pages read: {log.pages_read}</p>
      <p>Words read: {log.words_read}</p>
      <BookList bookList={log.books}></BookList>
    </div>
  )
}

export default Log