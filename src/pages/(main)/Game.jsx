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

const TIMER_DURATION = 15; // seconds

const quizQuestions = [
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

const QuizLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-pink-50 to-pink-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Top decorative circles */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-red-100/40 blur-2xl" />

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-96 bg-gradient-to-t from-pink-200/50 via-pink-100/30 to-transparent" />
          <div className="h-32 bg-gradient-to-t from-red-900/10 to-transparent" />
        </div>
      </div>

      {/* Main content container */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl transform transition-all duration-300 hover:shadow-lg bg-white/95 backdrop-blur-md relative border-0 shadow-xl">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-50/50 via-white/80 to-pink-50/50" />
          <div className="relative">{children}</div>
        </Card>
      </div>
    </div>
  );
};

const QuizGame = () => {
  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [disabled, setDisabled] = useState(true);

  // Timer management
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

  // Button disable state management
  useEffect(() => {
    const currentAnswer = answers[quizQuestions[currentQuestion]?.id];
    setDisabled(!currentAnswer);
  }, [answers, currentQuestion]);

  // Timer handlers
  const resetTimer = () => {
    setTimeLeft(TIMER_DURATION);
    setIsTimerActive(true);
  };

  const handleTimeUp = () => {
    const currentQuestionData = quizQuestions[currentQuestion];
    if (!answers[currentQuestionData.id]) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionData.id]: {
          answerId: currentQuestionData.options[2].id,
          score: 1,
        },
      }));
    }
    handleNext();
  };

  // Quiz navigation handlers
  const handleAnswer = (value) => {
    const currentQuestionData = quizQuestions[currentQuestion];
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
    if (currentQuestion < quizQuestions.length - 1) {
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

  // Render results page
  if (showResults) {
    return (
      <>
        <Navbar theme="dark" />
        <QuizResults
          totalScore={totalScore}
          totalQuestions={quizQuestions.length}
          onRestart={handleRestart}
        />
      </>
    );
  }

  // Render quiz page
  return (
    <QuizLayout>
      <CardHeader className="relative z-10">
        <div className="w-full flex items-center justify-between mb-4">
          <QuizProgress
            questions={quizQuestions}
            currentQuestion={currentQuestion}
          />
          <QuizTimer timeLeft={timeLeft} duration={TIMER_DURATION} />
        </div>

        <CardTitle className="text-2xl font-bold text-center">
          {quizQuestions[currentQuestion].question}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6 mt-7">
        <QuizOptions
          options={quizQuestions[currentQuestion].options}
          selectedAnswer={answers[quizQuestions[currentQuestion].id]?.answerId}
          onAnswerSelect={handleAnswer}
        />

        <QuizNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirstQuestion={currentQuestion === 0}
          disabled={disabled}
        />
      </CardContent>
    </QuizLayout>
  );
};

export default QuizGame;
