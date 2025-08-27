import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isNight, setIsNight] = useState(false);

  // Logout only clears session, keeps data in localStorage
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

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

  return (
    <nav className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-colors duration-500
      ${isNight ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 text-white" 
                 : "bg-yellow-50 text-gray-800 shadow-md"}`}>

      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-wider hover:scale-105 transition-transform duration-300">
        🌸 Brahmpath
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/about"
          className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all font-semibold
            ${isNight ? "bg-white/20 hover:bg-white/40" : "bg-yellow-100 hover:bg-yellow-200"}`}
        >
          About
        </Link>

        <Link
          to="/knowledge"
          className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all font-semibold
            ${isNight ? "bg-white/20 hover:bg-white/40" : "bg-yellow-100 hover:bg-yellow-200"}`}
        >
          Knowledge 📖
        </Link>

        {user && (
          <Link
            to="/tracker"
            className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all font-semibold
              ${isNight ? "bg-white/20 hover:bg-white/40" : "bg-yellow-100 hover:bg-yellow-200"}`}
          >
            Tracker
          </Link>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-xl transition-all shadow-md font-semibold
              ${isNight ? "bg-red-500 hover:bg-red-600" : "bg-red-400 hover:bg-red-500"}`}
          >
            Logout
          </button>
        ) : (
          <span className="font-medium">{isNight ? "Login to begin" : "Login to begin"}</span>
        )}

        {/* Day/Night toggle */}
        <button
          onClick={toggleTheme}
          className={`ml-2 px-3 py-1 rounded-full transition-all
            ${isNight ? "bg-yellow-400 text-indigo-900" : "bg-indigo-900 text-yellow-100"}`}
        >
          {isNight ? "Day 🌞" : "Night 🌙"}
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded-full transition-all
            ${isNight ? "bg-yellow-400 text-indigo-900" : "bg-indigo-900 text-yellow-100"}`}
        >
          {isNight ? "Day 🌞" : "Night 🌙"}
        </button>

        <button onClick={() => setMobileMenu(!mobileMenu)} className="focus:outline-none">
          <div className="w-6 h-0.5 bg-current mb-1"></div>
          <div className="w-6 h-0.5 bg-current mb-1"></div>
          <div className="w-6 h-0.5 bg-current"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className={`absolute top-full left-0 w-full py-4 flex flex-col items-center space-y-2
          ${isNight ? "bg-indigo-900 text-white" : "bg-yellow-50 text-gray-800"} md:hidden`}>
          
          <Link to="/about" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all">About</Link>
          <Link to="/knowledge" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all">Knowledge 📖</Link>
          {user && <Link to="/tracker" className="px-4 py-2 rounded-xl hover:bg-white/20 transition-all">Tracker</Link>}
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
