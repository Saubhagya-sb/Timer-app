import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

export default function Final() {
  const [params] = useSearchParams();
  const location = useLocation();

  // Extract values safely
  const {
    totalScore: scoreFromState = 0,
    totalTimeSpentInSeconds = 0,
    totalPages = 0
  } = location.state || {};

  const { scores } = useContext(AppContext);
  const navigate = useNavigate();

  // 👉 Compute final score without modifying const variables
  const computedTotalScore = scores.reduce((a, b) => a + b, 0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studySessions")) || [];

    const newEntry = {
      totalScore: computedTotalScore,
      pages: totalPages,
      totalTime: totalTimeSpentInSeconds,
      timestamp: Date.now()
    };

    stored.push(newEntry);

    localStorage.setItem("studySessions", JSON.stringify(stored));
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <h1>🎉 Session Complete!</h1>
        <h2>Total Score: {computedTotalScore}</h2>
        <h3>I am so proud of youuuuuu !!!!</h3>

        <p className="score-list-title">Score Per Page:</p>
        <ul className="score-list">
          {scores.map((s, i) => (
            <li key={i}>Page {i + 1}: {s} points</li>
          ))}
        </ul>

        <button className="btn" onClick={() => navigate("/")}>Restart</button>
      </div>
    </div>
  );
}
