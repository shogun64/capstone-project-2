import React from "react";
import styles from "../styles/LogList.module.css";

function LogList({logList}) {
    if (!logList.length){return <h1>No results</h1>}
    return (
        <div className={styles.loglist}>
            {logList.map((log) => (
                <LogCard key={`${log.id}`} log={log} />
            ))}
        </div>
    )
}

export default LogList