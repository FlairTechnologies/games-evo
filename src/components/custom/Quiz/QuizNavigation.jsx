// components/QuizNavigation.jsx
import React from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const QuizNavigation = ({ disabled, onNext, isFirstQuestion }) => {
  return (
    <div className="flex items-center justify-between pt-4">
      {/* <Button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="flex items-center w-1/2 gap-2 h-[60px] bg-gray-200 hover:bg-gray-300 text-gray-700"
      >
        <ArrowLeft className="w-5 h-5" />
        Previous
      </Button> */}

      <Button
        onClick={onNext}
        className={`flex items-center w-full rounded-xl mt-10 gap-2 h-[60px] bg-[#FE6249] hover:bg-[#FD624B] text-white text-base ${disabled === true ? "bg-gray-300 text-gray-600" : ""}`}
        disabled={disabled}
      >
        Next
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default QuizNavigation;