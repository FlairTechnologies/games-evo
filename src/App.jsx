import { Toaster } from "./components/ui/toaster";
import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/custom/footer";
import RequireAuth from "./components/custom/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import Game from "./pages/(main)/Game";
import Leaderboard from "./pages/(main)/Leaderboard";
import QuizStart from "./pages/(main)/StartQuiz";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/authentication/Auth";

const App = () => {
  return (
    <AuthProvider>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route
            path="/quiz/:gameId"
            element={
              <RequireAuth>
                <Game />
              </RequireAuth>
            }
          />
          {/* Games are now addressed by id; the old bare route goes to the start screen. */}
          <Route path="/quiz" element={<Navigate to="/start-quiz" replace />} />
          <Route
            path="/start-quiz"
            element={
              <RequireAuth>
                <QuizStart />
              </RequireAuth>
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/authentication" element={<Auth />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </AuthProvider>
  );
};
export default App;
