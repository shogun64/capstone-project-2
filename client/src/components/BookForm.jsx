import React from "react";
import { useState } from "react"
import styles from "../styles/BookForm.module.css";

function BookForm({  }) {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [full_pages, setFull_Pages] = useState(0)
    const [full_words, setFull_Words] = useState(0)
    const [pages_read, setPages_read] = useState(0)
    const [words_read, setWords_read] = useState(0)
    
    async function handleSubmit(event) {
            navigate('/')
    }

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='author'>Author:</label>
                    <input type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='full_pages'>Password:</label>
                    <input type='text' id='full_pages' value={full_pages} onChange={(e) => setFull_Pages(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='full_words'>Password:</label>
                    <input type='text' id='full_words' value={full_words} onChange={(e) => setFull_Words(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='pages_read'>Password:</label>
                    <input type='text' id='pages_read' value={pages_read} onChange={(e) => setPages_read(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='words_read'>Password:</label>
                    <input type='text' id='words_read' value={words_read} onChange={(e) => setWords_read(e.target.value)}/>
                </div>
                <div>
                    <button className="log-button" type='submit' >Submit Log</button>
                </div>
            </form>
        </div>
    )
}

export default BookForm