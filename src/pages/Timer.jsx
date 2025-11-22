import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import ProgressBar from "../components/ProgressBar";

export default function Timer() {
  const { totalPages, currentPage, setCurrentPage, scores, setScores } = useContext(AppContext);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isRunning) interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const getScore = (seconds) => {
    const m = seconds / 60;
    if (m < 5) return 10;
    if (m < 8) return 9;
    if (m < 11) return 8;
    if (m < 14) return 7;
    if (m < 17) return 6;
    if (m < 20) return 5;
    return 4;
  };

  const stopTimer = () => {
    setIsRunning(false);
    const score = getScore(timer);

    // Update scores
    const updatedScores = [...scores, score];
    setScores(updatedScores);

    // Compute total score & time
    const totalScore = updatedScores.reduce((a, b) => a + b, 0);
    const totalTime = updatedScores.length === totalPages
      ? updatedScores.length * timer // last timer
      : 0;

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setTimer(0);
    } else {
      navigate("/final", {
        state: {
          totalScore,
          totalTimeSpentInSeconds: scores.length * timer + timer,
          totalPages,
        },
      });
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <ProgressBar />

        <h1>Question {currentPage} / {totalPages}</h1>

        <div className="timer">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </div>

        {!isRunning ? (
          <button className="btn" onClick={() => setIsRunning(true)}>Start Timer</button>
        ) : (
          <button className="btn danger" onClick={stopTimer}>Stop & Save Score</button>
        )}
      </div>
    </div>
  );
}
