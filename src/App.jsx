import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import Final from "./pages/Final";

export const AppContext = React.createContext();

export default function App() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scores, setScores] = useState([]);

  return (
    <AppContext.Provider value={{ totalPages, setTotalPages, currentPage, setCurrentPage, scores, setScores }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </AppContext.Provider>
  );
}