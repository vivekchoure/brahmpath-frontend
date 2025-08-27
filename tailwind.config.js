/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // important for React
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Clean premium font
        heading: ["Poppins", "sans-serif"], // Bold heading font
      },
      colors: {
        primary: "#6D28D9", // Purple
        secondary: "#F43F5E", // Rose red
        accent: "#FACC15", // Yellow accent
        dark: "#0F172A", // Deep navy for premium feel
      },
      boxShadow: {
        premium: "0 4px 30px rgba(0, 0, 0, 0.2)", // Smooth shadow
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
