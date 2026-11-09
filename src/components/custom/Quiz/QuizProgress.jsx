// components/QuizProgress.jsx
import React from 'react';

const QuizProgress = ({ total, current }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-6" aria-label={`Question ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, idx) => (
        <React.Fragment key={idx}>
          <div
            className={`
              w-3 h-3 rounded-full transition-all duration-200
              ${idx === current
                ? 'bg-[#FF8A6C] scale-125'
                : idx < current
                ? 'bg-orange-200'
                : 'bg-gray-200'
              }
            `}
          />
          {idx < total - 1 && (
            <div className={`
              w-12 h-0.5
              ${idx < current ? 'bg-orange-200' : 'bg-gray-200'}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default QuizProgress;
