import React, { useEffect, useState } from "react";
import vivekImg from "../assets/vivek.jpg";
import sagarImg from "../assets/sagar.jpg";
import { motion } from "framer-motion"; // For smooth animations

export default function About() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("brahmpathTheme");
    setIsNight(storedTheme === "night");
  }, []);

  return (
    <div className={`min-h-screen p-6 transition-colors duration-500 ${isNight ? "bg-indigo-900 text-white" : "bg-yellow-50 text-gray-900"}`}>
      
      {/* Header */}
      <motion.h1 
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🌸 About Brahmpath &{" "}
        <span className="text-yellow-400 font-extrabold animate-pulse">
          Mehnat Se Udaan
        </span>
      </motion.h1>

      {/* About Website Section */}
      <div className="mb-12 max-w-4xl mx-auto text-center space-y-6">
        <motion.div 
          className={`p-6 rounded-3xl shadow-lg transition-all ${isNight ? "bg-indigo-800/80" : "bg-white/90"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">About Brahmpath</h2>
          <p className="text-lg md:text-xl">
            Brahmpath is a mindful self-development platform that helps users track their journey towards Brahmacharya while providing insights, motivational messages, and wisdom from the Bhagavad Gita.
          </p>
        </motion.div>

        <motion.div 
          className={`p-6 rounded-3xl shadow-lg transition-all ${isNight ? "bg-indigo-800/80" : "bg-white/90"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">About <span className="text-yellow-400 font-extrabold animate-pulse">Mehnat Se Udaan</span></h2>
          <p className="text-lg md:text-xl mb-3">
            <span className="font-extrabold">Mehnat Se Udaan</span> is a self-development channel aimed at inspiring and educating people through real-life experiences, teachings, and stories.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl space-y-2 text-left">
            <li><span className="font-semibold">Lessons from the Bhagavad Gita:</span> Translating timeless wisdom into actionable lessons for modern life.</li>
            <li><span className="font-semibold">Struggles of Students:</span> Showcasing real student challenges, perseverance, and growth.</li>
            <li><span className="font-semibold">Life Stories of People & Farmers:</span> Experiences from rural and urban India reflecting on hardships and values.</li>
            <li><span className="font-semibold">Village Life Stories:</span> Capturing simplicity, struggles, and wisdom of rural communities.</li>
            <li><span className="font-semibold">Real-life Podcasts:</span> Interviews with individuals sharing their journeys, struggles, and insights.</li>
          </ul>
        </motion.div>
      </div>

      {/* Founders Section */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">Meet the Team</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">

        {/* Founder */}
        <motion.div 
          className={`flex flex-col items-center text-center max-w-xs p-6 rounded-3xl shadow-2xl transition-all ${isNight ? "bg-indigo-800/80" : "bg-white/90"} hover:scale-105 hover:shadow-2xl`}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <img
            src={vivekImg}
            alt="Vivek Choure"
            className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-yellow-400"
          />
          <h3 className="text-2xl font-semibold">Vivek Choure</h3>
          <p className="text-lg mt-2 font-medium text-gray-300">Founder</p>
        </motion.div>

        {/* Co-Founder */}
        <motion.div 
          className={`flex flex-col items-center text-center max-w-xs p-6 rounded-3xl shadow-2xl transition-all ${isNight ? "bg-indigo-800/80" : "bg-white/90"} hover:scale-105 hover:shadow-2xl`}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <img
            src={sagarImg}
            alt="Sagar Verma"
            className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-purple-400"
          />
          <h3 className="text-2xl font-semibold">Sagar Verma</h3>
          <p className="text-lg mt-2 font-medium text-gray-300">Co-Founder</p>
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.p 
        className="mt-12 text-center text-lg md:text-xl max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Our mission is to inspire self-growth, mindfulness, and resilience through tracking personal journeys and sharing real-life experiences.
      </motion.p>
    </div>
  );
}
