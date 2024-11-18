import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Navbar from "../components/custom/navbar"
import {
  Trophy,
  Users,
  Brain,
  Star,
  Globe,
  Gift,
  Sparkles,
  Rocket,
  Heart,
  HelpCircle,
  MessageCircle,
  Timer,
  Target,
  Medal,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate()
  const features = [
    {
      title: "Sports Quizzes",
      description: "Test your sports knowledge with exciting challenges!",
      icon: <Trophy className="w-10 h-10" />,
      color: "bg-pink-500",
    },
    {
      title: "Global League",
      description: "Compete with sports fans worldwide!",
      icon: <Globe className="w-10 h-10" />,
      color: "bg-purple-500",
    },
    {
      title: "Champion Rewards",
      description: "Win medals, trophies, and amazing prizes!",
      icon: <Gift className="w-10 h-10" />,
      color: "bg-blue-500",
    },
  ];

  const stats = [
    {
      value: "1M+",
      label: "Active Players",
      icon: <Users className="w-6 h-6" />,
    },
    {
      value: "50K+",
      label: "Daily Matches",
      icon: <Target className="w-6 h-6" />,
    },
    {
      value: "100+",
      label: "Championships",
      icon: <Medal className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      quote: "QuizChamp makes sports trivia incredibly exciting! 🏆",
      author: "Sarah M.",
      role: "League Champion",
    },
    {
      quote: "The perfect way to test my sports knowledge! 🎯",
      author: "John D.",
      role: "MVP Player",
    },
    {
      quote: "I've learned so much about different sports! 🌟",
      author: "Mike R.",
      role: "Tournament Winner",
    },
  ];

  const howToPlay = [
    {
      title: "Choose Your Sport",
      description: "Select from various sports categories",
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: "Beat the Clock",
      description: "Answer questions before time runs out",
      icon: <Timer className="w-8 h-8" />,
    },
    {
      title: "Score Points",
      description: "Earn points for correct answers",
      icon: <Star className="w-8 h-8" />,
    },
    {
      title: "Win Trophies",
      description: "Collect trophies and climb the leaderboard",
      icon: <Trophy className="w-8 h-8" />,
    },
  ];

  const faqs = [
    {
      question: "How do I join tournaments?",
      answer:
        "Access the Tournaments tab and choose from available championships. Entry requirements vary by tournament level.",
    },
    {
      question: "What rewards can I win?",
      answer:
        "Win digital trophies, medals, exclusive badges, and sometimes real sports merchandise!",
    },
    {
      question: "Are there different difficulty levels?",
      answer:
        "Yes! Choose from Rookie, Pro, and Legend difficulties to match your expertise.",
    },
    {
      question: "Can I challenge my friends?",
      answer:
        "Absolutely! Create private matches or join the same tournament to compete directly.",
    },
  ];

  return (
    <>
    <Navbar theme={""} color={""}/>
    <div className="font-sans text-gray-900 overflow-hidden">
      
      {/* Hero Section with sports-themed animations */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-white py-20 px-4 grid place-items-center" id="hero">
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-50 animate-bounce" />
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-white rounded-full opacity-50 animate-bounce" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-300 rounded-lg opacity-50 animate-pulse" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Welcome to Game Evo! <span className="text-black">🎮</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Where Sports Knowledge Meets Adventure! ✨
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-100 rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              onClick={()=>navigate("/authentication")}
            >
              Join the Fun! 🚀
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-100" id="feature">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">
            Awesome Features 🌟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`inline-block p-4 mb-4 rounded-full ${feature.color} text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-100" id="how-to-play">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">
            How to Play 🎮
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howToPlay.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center text-white animate-spin">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-100" id="stat">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-3xl shadow-xl text-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 text-white mb-4 animate-pulse">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-pink-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-100 to-white" id="testimonial">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">
            What Players Say 💬
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4">
                  <MessageCircle className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                  <p className="text-gray-600 text-center italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="text-center mt-4">
                  <h4 className="font-bold text-purple-600">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-100 to-white" id="FAQ">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">
            Frequently Asked Questions 🤔
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-102"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-600 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-400 to-pink-400 text-white" id="CTA">
        <div className="max-w-3xl mx-auto text-center transform transition-all duration-300 hover:scale-102">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the League? 🏆
          </h2>
          <p className="text-xl mb-8">Become a QuizChamp champion today!</p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-100 rounded-full px-8 py-6 text-lg font-bold transform transition-all duration-300 hover:scale-105"
            onClick={()=>navigate("/authentication")}
          >
            Join the Fun! 🎯
          </Button>
        </div>
      </section>
    </div>
    </>
  );
};

export default LandingPage;
