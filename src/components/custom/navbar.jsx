import LogoLight from "../../assets/images/logo-light.png";
import Logo from "../../assets/images/favicon.png";
import {
  X,
  Home,
  Info,
  Phone,
  Mail,
  ChevronRight,
  BarChart4,
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
    { icon: <Home size={20} />, label: "Home", href: "#home" },
    { icon: <Info size={20} />, label: "About", href: "#about" },
    {
      icon: <BarChart4 size={20} />,
      label: "Leaderboard",
      href: "/leaderboard",
    },
    { icon: <Mail size={20} />, label: "Contact us", href: "#contact" },
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 transform transition-all duration-300 ease-out shadow-2xl z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`hidden md:block text-xl font-bold text-${color} tracking-tight`}>
            Games Evo
          </h2>
          <div className="md:hidden flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <a href="/" className="flex items-center">
              <img
                src={theme === "light" ? LogoLight : Logo}
                alt="logo"
                className="w-[100px] md:mt-[-10px] md:ml-[-28px] transform transition-all"
              />
            </a>
          </div>
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-${color} transition-colors duration-200`}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="py-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={toggleSidebar}
              className={`flex items-center justify-between px-6 py-4 text-${color} hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group`}
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                  {item.icon}
                </span>
                <span className="font-medium group-hover:text-blue-500 transition-colors duration-200">
                  {item.label}
                </span>
              </div>
              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
              />
            </a>
          ))}
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
