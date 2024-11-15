// QuizGame.jsx

import QuizNavigation from "../../components/custom/Quiz/QuizNavigation";
import QuizOptions from "../../components/custom/Quiz/QuizOptions";
import QuizProgress from "../../components/custom/Quiz/QuizProgress";
import QuizResults from "../../components/custom/Quiz/QuizResults";
import QuizTimer from "../../components/custom/Quiz/QuizTimer";
import Navbar from "../../components/custom/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import React, { useEffect, useState } from "react";
import { boolean } from "zod";

const TIMER_DURATION = 15; // seconds

const QuizGame = () => {
  const questions = [
    {
      id: 1,
      question: "How would you feel if you could no longer use Netflix?",
      options: [
        { id: "very", label: "Very Disappointed", score: 3 },
        { id: "somewhat", label: "Somewhat Disappointed", score: 2 },
        { id: "not", label: "Not Disappointed", score: 1 },
      ],
    },
    {
      id: 2,
      question: "How often do you use social media?",
      options: [
        { id: "daily", label: "Multiple times daily", score: 3 },
        { id: "weekly", label: "Few times a week", score: 2 },
        { id: "rarely", label: "Rarely or never", score: 1 },
      ],
    },
    {
      id: 3,
      question: "What's your preferred way of learning?",
      options: [
        { id: "visual", label: "Visual content", score: 3 },
        { id: "audio", label: "Audio content", score: 2 },
        { id: "reading", label: "Reading", score: 1 },
      ],
    },
    {
      id: 4,
      question: "How do you prefer to communicate?",
      options: [
        { id: "text", label: "Text/Email", score: 3 },
        { id: "call", label: "Phone calls", score: 2 },
        { id: "person", label: "In person", score: 1 },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // This state will manage the "Next" button's disabled status
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResults) {
      handleTimeUp();
    }

    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive, showResults]);

  useEffect(() => {
    // Check if the current question has an answer to enable/disable the "Next" button
    const currentAnswer = answers[questions[currentQuestion]?.id];
    setDisabled(!currentAnswer);
  }, [answers, currentQuestion]);

  const handleTimeUp = () => {
    if (!answers[questions[currentQuestion].id]) {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: {
          answerId: questions[currentQuestion].options[2].id,
          score: 1,
        },
      }));
    }
    handleNext();
  };

  const resetTimer = () => {
    setTimeLeft(TIMER_DURATION);
    setIsTimerActive(true);
  };

  const handleAnswer = (value) => {
    const currentQuestionData = questions[currentQuestion];
    const selectedOption = currentQuestionData.options.find(
      (opt) => opt.id === value
    );

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionData.id]: {
        answerId: value,
        score: selectedOption.score,
      },
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      resetTimer();
    } else {
      const finalScore = Object.values(answers).reduce(
        (sum, answer) => sum + answer.score,
        0
      );
      setTotalScore(finalScore);
      setShowResults(true);
      setIsTimerActive(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      resetTimer();
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTotalScore(0);
    resetTimer();
  };

  if (showResults) {
    return (
      <>
        <Navbar theme={"light"} color={""} />
        <QuizResults
          totalScore={totalScore}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/2">
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-pink-200 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-red-900/20" />
          </div>
        </div>

        <Card className="w-full max-w-2xl flex flex-col md:flex-row items-center justify-between bg-white/90 backdrop-blur-sm relative mt-10">
          <CardHeader>
            <div className="w-full flex items-center justify-between mb-4 md:mb-0">
              <QuizProgress
                questions={questions}
                currentQuestion={currentQuestion}
              />
            </div>

            <CardTitle className="text-2xl font-bold text-center md:hidden">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>

          <div className="md:w-[90%] md:py-10 md:flex md:flex-col md:items-center md:justify-between">
            <QuizTimer timeLeft={timeLeft} duration={TIMER_DURATION} />

            <div className="text-2xl font-bold text-center hidden md:block  mb-7 mt-[50px] w-[90%]">
              {questions[currentQuestion].question}
            </div>

            <CardContent className="space-y-6 md:w-full">
              <QuizOptions
                options={questions[currentQuestion].options}
                selectedAnswer={
                  answers[questions[currentQuestion].id]?.answerId
                }
                onAnswerSelect={handleAnswer}
              />
            </CardContent>
            <div className="md:block md:w-[91%] mx-auto">
              <QuizNavigation
                onPrevious={handlePrevious}
                onNext={handleNext}
                isFirstQuestion={currentQuestion === 0}
                disabled={disabled}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default QuizGame;
