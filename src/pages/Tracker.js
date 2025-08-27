import { useState, useEffect } from "react";

export default function Tracker({ user, setUser }) {
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState({});
  const [todayStatus, setTodayStatus] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isNight, setIsNight] = useState(false);

  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Load theme and user from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("brahmpathTheme");
    setIsNight(storedTheme === "night");

    const storedUser = JSON.parse(localStorage.getItem("brahmpathUser"));
    if (storedUser) {
      setUser(storedUser);
      setStreak(storedUser.streak || 0);
      setHistory(storedUser.history || {});
      const dateKey = `${yyyy}-${mm + 1}-${dd}`;
      if (storedUser.history && storedUser.history[dateKey]) {
        setTodayStatus(storedUser.history[dateKey]);
      }
    }
  }, [dd, mm, yyyy, setUser]);

  if (!user) return <div className="p-4">Please login first!</div>;

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getDateKey = (year, month, day) => `${year}-${month + 1}-${day}`;

  const saveUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("brahmpathUser", JSON.stringify(updatedUser));
  };

  const handleObserved = (day) => {
    const dateKey = getDateKey(currentYear, currentMonth, day);
    const updatedHistory = { ...history, [dateKey]: "observed" };
    let updatedStreak = streak;

    // If todayStatus was "observed" before, streak remains same, otherwise increase by 1
    if (todayStatus !== "observed") updatedStreak += 1;

    setHistory(updatedHistory);
    setStreak(updatedStreak);
    setTodayStatus("observed");
    setShowOptions(false);
    saveUser({ ...user, history: updatedHistory, streak: updatedStreak });
  };

  const handleRelapsed = (day) => {
    const dateKey = getDateKey(currentYear, currentMonth, day);
    const updatedHistory = { ...history, [dateKey]: "relapsed" };
    setHistory(updatedHistory);
    setStreak(0);
    setTodayStatus("relapsed");
    setShowOptions(false);
    saveUser({ ...user, history: updatedHistory, streak: 0 });
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else setCurrentMonth(currentMonth + 1);
  };

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  // Monthly & total counts
  let monthlyCount = 0;
  let totalCount = 0;
  Object.keys(history).forEach((key) => {
    const status = history[key];
    if (status === "observed") totalCount += 1;
    const [year, month] = key.split("-").map(Number);
    if (year === currentYear && month === currentMonth + 1 && status === "observed") {
      monthlyCount += 1;
    }
  });

  return (
    <div
      className={`p-4 min-h-screen transition-colors duration-500
        ${isNight ? "bg-indigo-900 text-white" : "bg-yellow-50 text-gray-900"}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Welcome, {user.name}</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              const newTheme = !isNight;
              setIsNight(newTheme);
              localStorage.setItem("brahmpathTheme", newTheme ? "night" : "day");
            }}
            className={`px-3 py-1 rounded-full font-semibold transition-all
              ${isNight ? "bg-yellow-400 text-indigo-900" : "bg-indigo-900 text-yellow-100"}`}
          >
            {isNight ? "Day 🌞" : "Night 🌙"}
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 bg-indigo-500 text-white rounded">◀</button>
        <p className="font-bold text-lg md:text-xl">{monthNames[currentMonth]} {currentYear}</p>
        <button onClick={handleNextMonth} className="px-3 py-1 bg-indigo-500 text-white rounded">▶</button>
      </div>

      {/* Stats */}
      <div className="flex flex-col md:flex-row justify-around items-center mb-6 space-y-2 md:space-y-0">
        <div className={`px-4 py-2 rounded-xl shadow-md font-semibold text-center ${isNight ? "bg-green-800 text-green-200" : "bg-green-100 text-green-800"}`}>
          Brahmacharya Stream: {streak}
        </div>
        <div className={`px-4 py-2 rounded-xl shadow-md font-semibold text-center ${isNight ? "bg-yellow-800 text-yellow-200" : "bg-yellow-100 text-yellow-800"}`}>
          Days followed this month: {monthlyCount}
        </div>
        <div className={`px-4 py-2 rounded-xl shadow-md font-semibold text-center ${isNight ? "bg-blue-800 text-blue-200" : "bg-blue-100 text-blue-800"}`}>
          Total days followed: {totalCount}
        </div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysArray.map((day) => {
          const dateKey = getDateKey(currentYear, currentMonth, day);
          const status = history[dateKey];
          const isToday = currentYear === yyyy && currentMonth === mm && day === dd;
          const canClick = isToday && todayStatus !== "relapsed"; // allow change if not relapsed

          let bgClass = "bg-gray-200 text-gray-500 cursor-not-allowed";
          if (status === "observed") bgClass = "bg-green-500 text-white cursor-pointer";
          else if (status === "relapsed") bgClass = "bg-red-500 text-white cursor-not-allowed";
          else if (!status && day < dd && currentMonth === mm && currentYear === yyyy) bgClass = "bg-yellow-400 text-white";
          else if (canClick) bgClass = "bg-indigo-500 text-white cursor-pointer";

          return (
            <div
              key={day}
              onClick={() => canClick && setShowOptions(true)}
              className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all ${bgClass}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Action buttons for today */}
      {showOptions && todayStatus !== "relapsed" && (
        <div className="flex space-x-2 justify-center mb-4">
          <button onClick={() => handleObserved(dd)} className="bg-green-500 px-4 py-2 rounded-xl text-white font-semibold shadow-md hover:bg-green-600 transition-all">
            Yes
          </button>
          <button onClick={() => handleRelapsed(dd)} className="bg-red-500 px-4 py-2 rounded-xl text-white font-semibold shadow-md hover:bg-red-600 transition-all">
            No
          </button>
        </div>
      )}

      {/* Today Status */}
      {todayStatus && (
        <p className="mt-2 font-semibold text-center">
          You marked today as: <span className={todayStatus === "observed" ? "text-green-500" : "text-red-500"}>{todayStatus}</span>
        </p>
      )}
    </div>
  );
}
