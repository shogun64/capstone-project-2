import React from "react";
import LogCard from "../components/LogCard"
import styles from "../styles/LogList.module.css";

function LogList({logList}) {
    if (!logList.logs.length){return <h1>No results</h1>}
    return (
        <div className={styles.loglist}>
            {logList.logs.map((log) => (
                <LogCard key={`${log.id}`} log={log} />
            ))}
        </div>
    )
}

export default LogList