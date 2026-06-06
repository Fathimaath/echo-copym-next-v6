import React from "react";

const CurvedSection4 = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Chart elements */}
      <g
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Y-axis */}
        <line x1="20" y1="20" x2="20" y2="75" />

        {/* X-axis */}
        <line x1="20" y1="75" x2="80" y2="75" />

        {/* Trending line chart */}
        <polyline points="20,65 30,55 45,35 55,40 70,25" />

        {/* Bar chart */}
        <line x1="30" y1="60" x2="30" y2="75" />
        <line x1="40" y1="50" x2="40" y2="75" />
        <line x1="50" y1="45" x2="50" y2="75" />
        <line x1="60" y1="55" x2="60" y2="75" />
      </g>

      {/* Dots on data points */}
      <g fill="white">
        <circle cx="30" cy="55" r="2" />
        <circle cx="45" cy="35" r="2" />
        <circle cx="55" cy="40" r="2" />
        <circle cx="70" cy="25" r="2" />
      </g>
    </svg>
  );
};

export default CurvedSection4;
