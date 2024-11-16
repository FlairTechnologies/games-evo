// components/QuizNavigation.jsx
import React from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const QuizNavigation = ({ disabled, onNext, isFirstQuestion }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant="outline"
        onClick={() => window.history.back()}
        disabled={disabled}
        className={'invisible'}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      
      <Button
        onClick={onNext}
        disabled={disabled}
      >
        Next
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default QuizNavigation;