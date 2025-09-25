import React from "react";
import { useState } from "react"
import styles from "../styles/LogForm.module.css";

function LogForm({  }) {
    const [date, setDate] = useState("")
    const [books_read, setBooks_read] = useState(0)
    const [pages_read, setPages_read] = useState(0)
    const [words_read, setWords_read] = useState(0)

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='date'>Date:</label>
                    <input type='text' id='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='books_read'>Books Read:</label>
                    <input type='text' id='books_read' value={books_read} onChange={(e) => setBooks_read(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='pages_read'>Pages Read:</label>
                    <input type='text' id='pages_read' value={pages_read} onChange={(e) => setPages_read(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='words_read'>Words Read:</label>
                    <input type='text' id='words_read' value={words_read} onChange={(e) => setWords_read(e.target.value)}/>
                </div>
                <div>
                    <button className="log-button" type='submit' >Submit Log</button>
                </div>
            </form>
        </div>
    )
}

export default LogForm