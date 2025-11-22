import React, { useContext } from "react";
import { AppContext } from "../App";

export default function ProgressBar() {
  const { totalPages, currentPage } = useContext(AppContext);
  const percent = (currentPage - 1) / totalPages * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-bar" style={{ width: `${percent}%` }}></div>
    </div>
  );
}