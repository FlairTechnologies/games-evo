// src/main.jsx

import { Toaster } from "./components/ui/toaster";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/custom/footer";
// Import your pages
import Game from "./pages/(main)/Game";
import Leadership from "./pages/(main)/Leaderboard";
import QuizStart from "./pages/(main)/StartQuiz";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/authentication/Auth";

const App = () => {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path="/quiz" element={<Game />} />
          <Route path="/leaderboard" element={<Leadership />} />
          <Route path="/start-quiz" element={<QuizStart />} />
          <Route path="/authentication" element={<Auth />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
};
export default App;
