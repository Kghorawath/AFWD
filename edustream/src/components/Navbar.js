// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="font-bold text-lg text-gray-800 dark:text-white">EduStream</Link>
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:underline">Home</Link>
        <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:underline">Courses</Link>
        <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:underline">Cart</Link>
        <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:underline">Dashboard</Link>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
