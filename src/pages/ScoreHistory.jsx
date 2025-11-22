import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScoreHistory() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studySessions")) || [];
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      localStorage.removeItem("studySessions");
      setHistory([]); // instantly update UI
    }
  };

  const totalScoreToday = history.reduce((a, b) => a + b.totalScore, 0);
  const totalTimeToday = history.reduce((a, b) => a + b.totalTime, 0);

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)}m ${sec % 60}s`;

  return (
    <div className="app-container">
      <div className="card">

        {/* Back Button */}
        <button
          className="btn"
          style={{ marginBottom: "15px", background: "#555" }}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <h1>📅 Today's Score History</h1>

        {history.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No study sessions recorded today.</p>
        ) : (
          <>
            <h3>Total Score: {totalScoreToday}</h3>
            <h4>Total Time: {formatTime(totalTimeToday)}</h4>

            <ul className="score-list">
              {history.map((session, index) => (
                <li key={index}>
                  <b>Session {index + 1}</b> — {session.totalScore} points,  
                  Time: {formatTime(session.totalTime)},  
                  Pages: {session.pages}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Clear Storage Button */}
        <button
          className="btn danger"
          style={{ marginTop: "20px" }}
          onClick={clearHistory}
        >
          🗑️ Clear All History
        </button>
      </div>
    </div>
  );
}
