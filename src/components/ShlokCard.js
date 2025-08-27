// components/ShlokCard.js
import React from "react";
import { Sparkles } from "lucide-react";

const ShlokCard = ({ adhyay, shlok, explanation }) => {
  return (
    <div
      className={`relative p-8 m-6 max-w-4xl mx-auto rounded-2xl 
      shadow-[0_0_30px_rgba(255,215,0,0.25)] 
      bg-gradient-to-br from-[#0d0d0d]/95 via-[#1a0f00]/90 to-[#000000]/95 
      border border-yellow-400/40
      transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]`}
    >
      {/* Glowing sparkles corner */}
      <div className="absolute top-2 right-2 text-yellow-300/70 animate-pulse">
        <Sparkles size={20} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-extrabold mb-4 tracking-wide text-center text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]">
        📖 श्रीमद्भगवद्गीता - अध्याय {adhyay}
      </h2>

      {/* Shlok */}
      <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-6 text-center whitespace-pre-line text-gray-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
        {shlok}
      </p>

      {/* Divider */}
      <div className="w-20 h-[2px] mx-auto mb-6 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>

      {/* Explanation */}
      <p className="text-lg leading-relaxed text-center italic text-gray-300">
        {explanation}
      </p>
    </div>
  );
};

export default ShlokCard;
