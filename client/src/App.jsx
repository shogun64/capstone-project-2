import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Logs from "./pages/Logs";
import Log from "./pages/Log";
import Login from "./pages/Login";
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login user={user} onLogin={setUser} />} />
          <Route path="/logs" element={<Logs user={user} setUser={setUser}/>}>
            <Route index element={<Logs user={user} setUser={setUser}/>} />
            <Route path=":logid" element={<Log user={user} setUser={setUser}/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App