// components/QuizResults.jsx
import React from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const QuizResults = ({ totalScore, totalQuestions, onRestart }) => {
  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-center mb-6">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-xl">
              Your Score: {totalScore}/{totalQuestions * 3}
            </p>
            <p className="text-gray-600">
              Thank you for completing the quiz! Your responses help us
              understand user preferences better.
            </p>
            <Button
              onClick={onRestart}
              className="bg-red-500 hover:bg-red-600 text-white mt-4"
            >
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;