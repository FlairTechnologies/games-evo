// components/QuizNavigation.jsx
import React from 'react';
import { Button } from '../../../components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

// No "Previous" button: the rules are "no going back", and the server enforces it.
const QuizNavigation = ({ disabled, onNext, isLast, isSubmitting }) => {
  return (
    <div className="flex justify-end items-center mt-6">
      <Button onClick={onNext} disabled={disabled}>
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : null}
        {isLast ? 'Finish' : 'Next'}
        {!isSubmitting ? <ArrowRight className="w-4 h-4 ml-2" /> : null}
      </Button>
    </div>
  );
};

export default QuizNavigation;
