import React, { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Final() {
  const { scores } = useContext(AppContext);
  const navigate = useNavigate();
  const totalScore = scores.reduce((a, b) => a + b, 0);

  return (
    <div className="app-container">
      <div className="card">
        <h1>🎉 Session Complete!</h1>
        <h2>Total Score: {totalScore}</h2>
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
