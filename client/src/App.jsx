import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Logs from "./pages/Logs";
import Log from "./pages/Log";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />}>
            <Route index element={< Logs />} />
            <Route path="/log" element={<Log />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App