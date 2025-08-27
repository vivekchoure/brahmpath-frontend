import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa"; // YouTube icon

export default function Footer() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("brahmpathTheme");
    setIsNight(storedTheme === "night");
  }, []);

  return (
    <footer
      className={`mt-12 py-6 px-6 flex flex-col md:flex-row justify-between items-center transition-colors duration-500
        ${isNight ? "bg-indigo-900 text-white" : "bg-yellow-50 text-gray-900"}`}
    >
      {/* YouTube Channel Display */}
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <FaYoutube className="text-red-600 text-2xl" />
        <span className="font-bold text-lg md:text-xl">Mehnat Se Udaan</span>
      </div>

      {/* Copyright */}
      <p className="text-sm md:text-base">
        &copy; {new Date().getFullYear()} Brahmpath. All rights reserved.
      </p>
    </footer>
  );
}
