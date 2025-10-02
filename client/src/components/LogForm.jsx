import React from "react";
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import styles from "../styles/LogForm.module.css";

function LogForm() {
    const today = new Date();
    const [date, setDate] = useState(String(today.getDate()))
    const [books_read, setBooks_read] = useState(0)
    const [pages_read, setPages_read] = useState(0)
    const [words_read, setWords_read] = useState(0)
    const navigate = useNavigate()

    const newlog = async () => {
        let data = null
        let error = null
        try {
            const response = await fetch('/api/logs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date, books_read, pages_read, words_read})
            })
            if (!response.ok) throw new Error("Failed to add reading log");
            data = await response.json();
        } catch (err) {
            error = (err.message);
        } finally {
            return {data, error}
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const { data, error } = newlog()
        console.log(data, error)
        if (error) return <p className={styles.error}>Error: {error}</p>;
        else navigate('/logs')
    }

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='date'>Date: </label>
                    <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='books_read'>Books Read: </label>
                    <input type='text' id='books_read' value={books_read} onChange={(e) => setBooks_read(e.target.value)}/>
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
                    <button className="log-button" type='submit' >Submit Log</button>
                </div>
            </form>
            <p>You can add books to the log after it's been created.</p>
        </div>
    )
}

export default LogForm