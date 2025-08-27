import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Footer import
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";
import About from "./pages/About"; // ✅ About page import
import Knowledge from "./pages/Knowledge"; // ✅ Knowledge page import

function App() {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on first render
    const storedUser = localStorage.getItem("brahmpathUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync user state with localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("brahmpathUser", JSON.stringify(user));
    }
    // DO NOT remove user from localStorage on logout to keep data persistent
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/tracker" element={<Tracker user={user} setUser={setUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/knowledge" element={<Knowledge />} /> {/* ✅ Knowledge page route */}
      </Routes>
      <Footer /> {/* ✅ Footer added here */}
    </Router>
  );
}

export default App;
