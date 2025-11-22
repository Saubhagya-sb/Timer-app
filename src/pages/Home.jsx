import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Home() {
  const { setTotalPages, setScores, setCurrentPage } = useContext(AppContext);
  const [pages, setPages] = useState("");
  const navigate = useNavigate();

  const start = () => {
    if (pages > 0) {
      setTotalPages(Number(pages));
      setScores([]);
      setCurrentPage(1);
      navigate("/timer");
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>📘 Study Timer</h1>
        <p>Hi Twinkle !!!! Enter the number of pages you plan to study this session.</p>
        <p>This is the Scoring System:</p>
        <l className="List">
            <li> 0-5 min : 10 points</li>
            <li> 5-8 min : 9 points</li>
            <li> 8-11 min : 8 points </li>
            <li> 11-14 min : 7 points</li>
            <li> 14-17 min : 6 points</li>
            <li> 17-20 min : 5 points</li>
            <li> 20- min : 4 points</li>
        </l>
        <input
          className="input"
          type="number"
          placeholder="Number of Questions"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />

        <button className="btn" onClick={start}>Start</button>
      </div>
    </div>
  );
}