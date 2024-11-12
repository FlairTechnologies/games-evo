// components/QuizProgress.jsx
import React from 'react';

const QuizProgress = ({ questions, currentQuestion }) => {
  return (
    <div className="flex items-center justify-between mb-6 w-[80%]">
      {questions.map((q, idx) => (
        <div key={q.id} className="flex items-center">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${idx <= currentQuestion ? "bg-[#FE6249] text-white" : "bg-gray-300 text-gray-600"}
              ${idx === currentQuestion ? "w-12 h-12 text-xl" : ""}
              transition-all duration-300
            `}
          >
            {q.id}
          </div>
          {idx < questions.length - 1 && (
            <div
              className={`h-0.5 w-[100px] ml-3 ${
                idx < currentQuestion ? "bg-[#FE6249]" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizProgress;