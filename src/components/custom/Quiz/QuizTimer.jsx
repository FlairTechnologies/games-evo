// components/QuizTimer.jsx

import { Progress } from "../../../components/ui/progress";
import { Timer } from "lucide-react";
import React from "react";

const QuizTimer = ({ timeLeft, duration }) => {
  const formatTime = (seconds) => {
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="absolute top-6 right-4 flex items-center gap-2 text-2xl font-semibold">
        <Timer
          className={`w-6 h-6 ${
            timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-700"
          }`}
        />
        <span
          className={`${
            timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-gray-700"
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>
      {/* <Progress
        value={(timeLeft / duration) * 100}
        className={`w-full h-2 mb-6 ${
          timeLeft <= 5 ? "bg-red-500 animate-pulse" : ""
        }`}
      /> */}
    </>
  );
};

export default QuizTimer;
