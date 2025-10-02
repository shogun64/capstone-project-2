import React, {useState} from "react";
import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import LogList from "../components/LogList"
import useFetchData from "../hooks/useFetchData";
import styles from "../styles/Logs.module.css";

function Logs({ user, setUser }) {
  const [search, setSearch] = useState("")
  const { data, loading, error } = useFetchData(`/api/logs`);
  if (!user) return (<div className={styles.logs}>
        <NavBar user={user} setUser={setUser} />
        <h1>You are not signed in.</h1>
        </div>);
  if (loading) return (<div className={styles.logs}>
        <NavBar user={user} setUser={setUser} />
        <SearchBar search={search} setSearch={setSearch}/>
        <p className={styles.loading}>Loading results...</p>
        </div>);
  if (error) return (
        <div className={styles.logs}>
        <NavBar user={user} setUser={setUser} />
        <SearchBar search={search} setSearch={setSearch}/>
        <p className={styles.error}>Error: {error}</p>
        </div>);

      let loglist = data.logs

      if (search != ""){loglist = data.logs.filter((log) => log.date.includes(search))}

  return (
    <div className={styles.logs}>
        <NavBar user={user} setUser={setUser} />
        <SearchBar search={search} setSearch={setSearch}/>
        <LogList logList={loglist}/>
    </div>
  )
}

export default Logs