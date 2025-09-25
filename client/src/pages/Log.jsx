import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar"
import BookList from "../components/BookList"
import BookForm from "../components/BookForm"
import useFetchData from "../hooks/useFetchData";
import styles from "../styles/Log.module.css";

function Log({ user, setUser }) {
  const { logid } = useParams();
  const { data, loading, error } = useFetchData(`/api/logs/${logid}`);
  if (loading) return (<div className={styles.log}>
        <NavBar user={user} setUser={setUser} />
        <p className={styles.loading}>Loading log...</p>
        </div>);
  if (error) return (
        <div className={styles.log}>
        <NavBar user={user} setUser={setUser} />
        <p className={styles.error}>Error: {error}</p>
        </div>);
  return (
    <div className={styles.log}>
      <NavBar user={user} setUser={setUser} />
      <h2>{data.date}</h2>
      <p>Books read: {data.books_read}</p>
      <p>Pages read: {data.pages_read}</p>
      <p>Words read: {data.words_read}</p>
      <BookList bookList={data.books}></BookList>
      <BookForm />
    </div>
  )
}

export default Log