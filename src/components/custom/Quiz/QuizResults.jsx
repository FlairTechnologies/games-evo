// components/QuizResults.jsx

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Share2, Trophy } from "lucide-react";
import React from "react";

const QuizResults = ({ totalScore, totalQuestions, onRestart }) => {
  return (
    // <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
    //   <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm">
    //     <CardHeader>
    //       <div className="flex justify-center mb-6">
    //         <Trophy className="w-16 h-16 text-yellow-500" />
    //       </div>
    //       <CardTitle className="text-2xl font-bold text-center">
    //         Quiz Complete!
    //       </CardTitle>
    //     </CardHeader>
    //     <CardContent className="space-y-6">
    //       <div className="text-center space-y-4">
    //         <p className="text-xl">
    //           Your Score: {totalScore}/{totalQuestions * 3}
    //         </p>
    //         <p className="text-gray-600">
    //           Thank you for completing the quiz! Your responses help us
    //           understand user preferences better.
    //         </p>
    //         <Button
    //           onClick={onRestart}
    //           className="bg-red-500 hover:bg-red-600 text-white mt-4"
    //         >
    //           Take Quiz Again
    //         </Button>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F5C] to-[#0E1130] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 md:p-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#ffffff] mb-2">
          Quiz Result
        </h2>

        {/* Trophy Icon and Profile */}
        <div className="flex justify-center items-center mb-4 relative">
          <Trophy className="w-20 h-20 text-yellow-500" />
          {/* <img
            src={profileImage}
            alt="Winner"
            className="w-12 h-12 rounded-full absolute top-6"
          /> */}
          <div className="absolute bottom-1 bg-yellow-500 text-white text-sm rounded-full px-2 py-1">
            Winner
          </div>
        </div>

        {/* Message */}
        <p className="text-lg font-semibold text-[#ffffff] mb-2">
          Congratulations!
        </p>
        <p className="text-gray-300 mb-6">
          Consequatur adipiscing elit. Aenean euismod bibendum laoreet.
        </p>

        {/* Score and Coins */}
        <div className="text-[#1DB954] font-bold text-2xl mb-2">
          {/* {score}/{totalQuestions} */}
        </div>
        <div className="text-gray-200">YOUR SCORE</div>

        {/* <div className="text-yellow-400 font-bold text-2xl mt-4 mb-2">
          {coins}
        </div> */}
        <div className="text-gray-200">EARNED COINS</div>

        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <Button className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
            <Share2 className="mr-2" /> Share Results
          </Button>
          <Button
            onClick={onRestart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Take New Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
