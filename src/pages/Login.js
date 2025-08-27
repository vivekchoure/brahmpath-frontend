import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [isNight, setIsNight] = useState(false);
  const navigate = useNavigate();

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("brahmpathTheme");
    setIsNight(storedTheme === "night");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isNight;
    setIsNight(newTheme);
    localStorage.setItem("brahmpathTheme", newTheme ? "night" : "day");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      const storedUser = JSON.parse(localStorage.getItem("brahmpathUser"));
      let userObj;
      if (storedUser && storedUser.name === username) {
        // use previous data
        userObj = storedUser;
      } else {
        userObj = { name: username, streak: 0, history: {} };
      }
      setUser(userObj);
      localStorage.setItem("brahmpathUser", JSON.stringify(userObj));
      navigate("/"); // redirect to home
    }
  };

  return (
    <div className={`h-screen flex items-center justify-center transition-colors duration-500
      ${isNight ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white"
                 : "bg-yellow-50 text-gray-900"}`}>

      {/* Toggle Theme */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded-full font-semibold transition-all
            ${isNight ? "bg-yellow-400 text-indigo-900 hover:bg-yellow-300"
                       : "bg-indigo-900 text-yellow-100 hover:bg-indigo-800"}`}>
          {isNight ? "Day 🌞" : "Night 🌙"}
        </button>
      </div>

      {/* Login Card */}
      <div className={`backdrop-blur-md p-10 rounded-2xl shadow-lg w-72 md:w-96 transition-colors duration-500
        ${isNight ? "bg-indigo-800/80 text-white border border-indigo-700"
                   : "bg-white/80 text-gray-900 border border-yellow-200"}`}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">🌸 Brahmpath</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`p-3 rounded-lg focus:outline-none focus:ring-2 transition-all
              ${isNight ? "bg-indigo-700 text-white placeholder-gray-300 ring-yellow-400"
                         : "bg-white text-gray-900 placeholder-gray-400 ring-purple-400"}`}
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-xl shadow-lg font-semibold transition-all
              ${isNight ? "bg-purple-700 hover:bg-purple-800 text-white"
                         : "bg-pink-500 hover:bg-pink-600 text-white"}`}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
