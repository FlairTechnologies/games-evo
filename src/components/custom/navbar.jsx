// Navbar.jsx

import LogoLight from "../../assets/images/logo-light.png";
import Logo from "../../assets/images/logo.png";
import React, { useState } from "react";

const Navbar = ({ theme, color }) => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-80 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
        <div className="flex items-center justify-between h-21">
          <div className="flex items-center">
            {/* Logo */}
            <a href="/">
              <img
                src={theme === "light" ? LogoLight : Logo}
                alt="logo"
                className="w-[170px] md:mt-[-10px] md:ml-[-28px]"
              />
            </a>
          </div>

          {/* Nav Links */}
          {/* <div className="hidden space-x-4">
            <a href="#home" className="text-white hover:text-gray-300 transition duration-150">Home</a>
            <a href="#about" className="text-white hover:text-gray-300 transition duration-150">About</a>
            <a href="#services" className="text-white hover:text-gray-300 transition duration-150">Services</a>
            <a href="#contact" className="text-white hover:text-gray-300 transition duration-150">Contact</a>
          </div> */}

          {/* Mobile Menu Icon */}
          <div className="">
            <button className={`text-${color}`}>
              <svg
                className="h-9 w-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
