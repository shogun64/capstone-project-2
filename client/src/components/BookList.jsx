import React from "react";
import styles from "../styles/BookList.module.css";

function BookList({bookList}) {
  if (!bookList.length){return <h1>No results</h1>}
      return (
          <div className={styles.booklist}>
              {bookList.map((book) => (
                  <BookCard key={`${book.id}`} book={book} />
              ))}
          </div>
      )
}

export default BookList