import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Home() {
  const { setTotalPages, setCurrentPage, setScores } = useContext(AppContext);
  const [pagesInput, setPagesInput] = useState("");
  const navigate = useNavigate();

  const startSession = () => {
    const pages = parseInt(pagesInput);

    if (!pages || pages <= 0) {
      alert("Please enter a valid number of pages");
      return;
    }

    // update global context
    setTotalPages(pages);
    setCurrentPage(1);
    setScores([]);

    navigate("/timer");
  };

  return (
    <div className="app-container">
      <div className="card">

        <h1 style={{ marginBottom: "10px" }}>📖 Study Timer</h1>
        <p style={{ opacity: 0.8, marginBottom: "20px" }}>
          Hi Twinkle, wishing you all the best for this session !! 
        </p>

        {/* Input */}
        <input
          className="input"
          type="number"
          placeholder="Enter total Questions for this session"
          value={pagesInput}
          onChange={(e) => setPagesInput(e.target.value)}
        />

        {/* Start Button */}
        <button className="btn" onClick={startSession}>
          Start Session
        </button>

        {/* Scoring System */}
        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>📊 Scoring System</h2>
        <ul className="score-list">
          <li>&lt; 5 min — <b>10 points</b></li>
          <li>5–8 min — <b>9 points</b></li>
          <li>8–11 min — <b>8 points</b></li>
          <li>11–14 min — <b>7 points</b></li>
          <li>14–17 min — <b>6 points</b></li>
          <li>17–20 min — <b>5 points</b></li>
          <li>&gt; 20 min — <b>4 points</b></li>
        </ul>

        {/* Score History Button */}
        <button
          className="btn"
          style={{ marginTop: "20px", background: "#555" }}
          onClick={() => navigate("/history")}
        >
          📅 View Score History
        </button>
      </div>
    </div>
  );
}
