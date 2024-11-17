import { Navigate } from "react-router-dom";
import Navbar from "../../components/custom/navbar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../components/ui/card";
import {
  BookOpen,
  Brain,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import React from "react";

const StartQuiz = () => {
    const navigate = useNavigate()
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      text: "Test Your Knowledge",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-orange-500 " />,
      text: "Learn New Things",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-emerald-500" />,
      text: "Earn Cash Rewards",
    },
  ];

  const instructions = [
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      title: "Time Management",
      text: "You'll have 10 minutes to complete all questions",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Answer All Questions",
      text: "Each question must be answered to proceed",
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
      title: "No Going Back",
      text: "You cannot return to previous questions",
    },
    {
      icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
      title: "Reward System",
      text: "Earn $1 for each correct answer",
    },
  ];

  return (
    <>
    <Navbar color={""} theme={""}/>
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative h-full w-full">
            {/* Background Shapes */}
            <div className="absolute -left-4 top-0 h-64 w-64 animate-blob rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-purple-700 dark:opacity-10" />
            <div className="animation-delay-2000 absolute -right-4 top-0 h-64 w-64 animate-blob rounded-full bg-yellow-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-yellow-700 dark:opacity-10" />
            <div className="animation-delay-4000 absolute -bottom-8 left-20 h-64 w-64 animate-blob rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-pink-700 dark:opacity-10" />
            <div className="absolute -bottom-8 right-20 h-64 w-64 animate-blob rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-blue-700 dark:opacity-10" />
          </div>
        </div>

        {/* Content */}
        <div className="relative flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-2xl backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-4 pt-6">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                <DollarSign className="h-8 w-8 text-emerald-500" />
              </div>
              <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
                Ready to Win Cash Rewards?
              </CardTitle>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Test your knowledge and earn real money with each correct answer
              </p>
            </CardHeader>

            <CardContent className="space-y-8 p-6">
              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2 text-center"
                  >
                    <div className="rounded-full bg-white p-3 shadow-md dark:bg-gray-800">
                      {feature.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Instructions Section */}
              <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
                <h3 className="mb-4 text-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Instructions
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 rounded-lg bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:bg-gray-800"
                    >
                      <div className="mt-1">{instruction.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {instruction.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {instruction.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  className="relative w-full overflow-hidden bg-orange-500 h-[43px] text-white transition-all hover:bg-orange-600"
                  onClick={() => navigate("/quiz")}
                >
                  <span className="relative z-10 font-medium">
                    Start Earning Now
                  </span>
                </Button>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  🎯 15 questions • ⏱️ 10 minutes • 💰 Up to $15 in rewards
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </>
  );
};

export default StartQuiz;
