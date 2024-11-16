// components/QuizProgress.jsx
import React from 'react';

const QuizProgress = ({ questions, currentQuestion }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {questions.map((q, idx) => (
        <React.Fragment key={q.id}>
          <div
            className={`
              w-3 h-3 rounded-full transition-all duration-200
              ${idx === currentQuestion
                ? 'bg-[#FF8A6C] scale-125'
                : idx < currentQuestion
                ? 'bg-orange-200'
                : 'bg-gray-200'
              }
            `}
          />
          {idx < questions.length - 1 && (
            <div className={`
              w-12 h-0.5
              ${idx < currentQuestion ? 'bg-orange-200' : 'bg-gray-200'}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default QuizProgress;