// src/main.jsx

import { Toaster } from "./components/ui/toaster";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// Import your pages
import Game from "./pages/(main)/Game";
import Leadership from "./pages/(main)/Leaderboard";
import Auth from "./pages/authentication/Auth";

const App = () => {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/leaderboard" element={<Leadership />} />
          <Route path="/authentication" element={<Auth />} />
        </Routes>
      </BrowserRouter>

      {/* <footer className="h-[300px] w-full">
      Hiiiii
    </footer> */}
    </>
  );
};
export default App;
