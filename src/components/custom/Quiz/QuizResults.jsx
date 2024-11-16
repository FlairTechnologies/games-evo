import React from "react";
import Trophy from "../../../assets/images/trophy.jpg";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../components/ui/card";
import { Share2, Trophy as TrophyIcon, Sparkles } from "lucide-react";

const QuizResults = ({ totalScore, totalQuestions, onRestart }) => {
  const percentage = (totalScore / (totalQuestions * 3)) * 100;
  
  const getMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding!";
    if (percentage >= 70) return "Great Job!";
    if (percentage >= 50) return "Well Done!";
    return "Keep Practicing!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
        <div className="md:flex items-center gap-8 p-6">
          {/* Trophy Section */}
          <div className="flex-shrink-0 w-full md:w-1/2 mb-8 md:mb-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 to-transparent rounded-2xl transition-all duration-300 group-hover:from-pink-300/30" />
              <img 
                src={Trophy} 
                alt="victory"
                className="w-full h-[350px] object-cover rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <CardContent className="space-y-8 p-0">
              {/* Completion Message */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Quiz Complete!
                  </h1>
                  <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-lg text-gray-600 font-medium">
                  {getMessage(percentage)}
                </p>
              </div>

              {/* Score Display */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Final Score
                </p>
                <div className="flex items-center justify-center gap-2">
                  {/* <TrophyIcon className="w-8 h-8 text-yellow-500" /> */}
                  <p className="text-5xl font-bold text-gray-800">
                    {totalScore}
                    <span className="text-2xl text-gray-500">
                      /{totalQuestions * 3}
                    </span>
                  </p>
                </div>
                <p className="text-md text-gray-600">
                  {percentage.toFixed(1)}% Accuracy
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button 
                  className="group bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-6 rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  <Share2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </Button>
                <Button
                  onClick={onRestart}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
                >
                  Take Quiz Again
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizResults;