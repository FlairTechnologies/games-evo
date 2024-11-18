import Logo from "../../assets/images/favicon.png";
import LogoLight from "../../assets/images/logo-light.png";
import {
  X,
  Home,
  Info,
  Phone,
  Mail,
  ChevronRight,
  BarChart4,
  Star,
  Rocket,
  Volleyball,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const Navbar = ({ theme, color }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <Volleyball size={20} />, label: "Start Quiz", href: "/authentication" },
    {
      icon: <BarChart4 size={20} />,
      label: "Leaderboard",
      href: "/leaderboard",
    },
    { icon: <Mail size={20} />, label: "Contact us", href: "mailto:stephenon56@gmail.com" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pt-3`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="hidden md:block flex-shrink-0 transition-transform duration-300 hover:scale-105">
              <a href="/" className="flex items-center">
                <img
                  src={theme === "light" ? LogoLight : Logo}
                  alt="logo"
                  className="w-[170px] md:mt-[-10px] md:ml-[-28px] transform transition-all"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-2 text-${color} hover:text-blue-500 transition-colors duration-200 text-sm font-medium`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Hamburger Button */}
            <div className="">
              <button
                onClick={toggleSidebar}
                className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-${color} hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200`}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 transform transition-all duration-500 ease-out shadow-2xl z-50 rounded-l-3xl overflow-hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Rocket className="w-6 h-6 animate-bounce" />
              Games Evo
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 transform hover:rotate-180"
              aria-label="Close menu"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="py-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={toggleSidebar}
              className="block px-6 py-3 group"
            >
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full group-hover:animate-pulse">
                    <span className="text-purple-600 dark:text-purple-300">
                      {item.icon}
                    </span>
                  </div>
                  <span className="font-semibold text-purple-700 dark:text-purple-200 group-hover:text-pink-600 transition-colors">
                    {item.label}
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  className="text-purple-400 dark:text-purple-600 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Playful Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5 animate-spin" />
            <p className="text-sm font-medium">Unlock Your Gaming Adventure!</p>
            <Star className="w-5 h-5 animate-spin" />
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isSidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />
    </>
  );
};

export default Navbar;
