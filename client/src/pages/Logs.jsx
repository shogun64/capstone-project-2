import React, {useState} from "react";
import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import LogList from "../components/LogList"
import useFetchData from "../hooks/useFetchData";
import styles from "../styles/Logs.module.css";

function Logs({ user, setUser }) {
  const [search, setSearch] = useState("")
  const { data, loading, error } = useFetchData(`/api/logs`);
  if (loading) return (<div>
        <NavBar user={user} setUser={setUser} />
        <SearchBar search={search} setSearch={setSearch}/>
        <p className={styles.loading}>Loading results...</p>
        </div>);
  if (error) return (
        <div>
        <NavBar user={user} setUser={setUser} />
        <SearchBar search={search} setSearch={setSearch}/>
        <p className={styles.error}>Error: {error}</p>
        </div>);
  return (
    <div>
        <NavBar user={user} setUser={setUser} />
        <SearchBar search={search} setSearch={setSearch}/>
        <LogList logList={data}/>
    </div>
  )
}

export default Logs