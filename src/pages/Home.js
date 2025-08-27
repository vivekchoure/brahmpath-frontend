import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ user, setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isNight, setIsNight] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("brahmpathTheme");
    setIsNight(storedTheme === "night");
  }, []);

  // Auto-fill username if user exists
  useEffect(() => {
    if (user) setUsername(user.name);
  }, [user]);

  // Toggle night/day theme
  const toggleTheme = () => {
    setIsNight((prev) => {
      const newTheme = !prev;
      localStorage.setItem("brahmpathTheme", newTheme ? "night" : "day");
      return newTheme;
    });
  };

  // Login handler
  const handleLogin = () => {
    if (username.trim()) {
      const storedUser = JSON.parse(localStorage.getItem("brahmpathUser"));
      let userObj;
      if (storedUser && storedUser.name === username) {
        // Preserve existing streak and history
        userObj = storedUser;
      } else {
        userObj = { name: username, streak: 0, history: {} };
      }
      setUser(userObj);
      localStorage.setItem("brahmpathUser", JSON.stringify(userObj));
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 md:px-0 transition-colors duration-500
        ${isNight
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white"
          : "bg-yellow-50 text-gray-900"}`}
    >
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded-full font-semibold transition-all
            ${isNight
              ? "bg-yellow-400 text-indigo-900 hover:bg-yellow-300"
              : "bg-indigo-900 text-yellow-100 hover:bg-indigo-800"}`}
        >
          {isNight ? "Day 🌞" : "Night 🌙"}
        </button>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-wider text-center">
        🌸 Welcome to Brahmpath
      </h1>

      {!user ? (
        <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300
              ${isNight
                ? "bg-indigo-700 text-white placeholder-gray-300 ring-yellow-400"
                : "bg-white text-gray-900 placeholder-gray-400 ring-purple-400"}`}
          />
          <button
            onClick={handleLogin}
            className={`w-full px-6 py-3 rounded-xl shadow-lg font-semibold transition-all
              ${isNight
                ? "bg-purple-700 hover:bg-purple-800 text-white"
                : "bg-pink-500 hover:bg-pink-600 text-white"}`}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 text-center">
          <p className="text-lg sm:text-xl">Logged in as: <span className="font-semibold">{user.name}</span></p>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Your Brahmacharya Stream: 🔥 <span className="text-yellow-400">{user.streak} days</span>
          </h2>
          <button
            onClick={() => navigate("/tracker")}
            className={`px-6 py-3 rounded-xl shadow-lg font-semibold transition-all
              ${isNight
                ? "bg-pink-600 hover:bg-pink-700 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
          >
            Go to Tracker
          </button>
        </div>
      )}
    </div>
  );
}
