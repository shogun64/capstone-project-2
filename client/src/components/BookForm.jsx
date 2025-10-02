import React from "react";
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from "../styles/BookForm.module.css";

function BookForm({id}) {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [full_pages, setFull_Pages] = useState(0)
    const [full_words, setFull_Words] = useState(0)
    const [pages_read, setPages_read] = useState(0)
    const [words_read, setWords_read] = useState(0)
    const navigate = useNavigate()

    const newBook = async () => {
        let data = null
        let error = null
        try {
            const response = await fetch(`/api/logs/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, author, full_pages, full_words, pages_read, words_read})
            })
            if (!response.ok) throw new Error("Failed to add book to reading log");
            data = await response.json();
        } catch (err) {
            error = (err.message);
        } finally {
            return {data, error}
        }
    }
    
    async function handleSubmit(event) {
        event.preventDefault()
        const { data, error } = newBook()
        console.log(data, error)
        if (error) return <p className={styles.error}>Error: {error}</p>;
        else navigate(`/logs/${id}`)
    }

    return (
        <div className={styles.bookform}>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title: </label>
                    <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='author'>Author: </label>
                    <input type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='full_pages'>Full Pages: </label>
                    <input type='text' id='full_pages' value={full_pages} onChange={(e) => setFull_Pages(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='full_words'>Full Words: </label>
                    <input type='text' id='full_words' value={full_words} onChange={(e) => setFull_Words(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='pages_read'>Pages Read: </label>
                    <input type='text' id='pages_read' value={pages_read} onChange={(e) => setPages_read(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='words_read'>Words Read: </label>
                    <input type='text' id='words_read' value={words_read} onChange={(e) => setWords_read(e.target.value)}/>
                </div>
                <div>
                    <button className="book-button" type='submit' >Add Book</button>
                </div>
            </form>
        </div>
    )
}

export default BookForm