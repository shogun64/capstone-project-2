import React from "react";
import styles from "../styles/BookCard.module.css";

function BookCard({book}) {
  return (
    <div className={styles.bookcard}>
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>Full Pages: {book.full_pages}</p>
        <p>Full Words: {book.full_words}</p>
        <p>Pages read: {book.pages_read}</p>
        <p>Words read: {book.words_read}</p>
    </div>
  )
}

export default BookCard