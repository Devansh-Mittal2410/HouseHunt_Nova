import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import AllUsers from "./AllUsers";
import AllProperty from "./AllProperty";
import AllBookings from "./AllBookings";

const AdminHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

if (!user || !user.userData) return null;

  return (
<div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col">
  {/* Navbar */}
  <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[92%] z-50 bg-black/40 backdrop-blur-xl border border-cyan-400/25 rounded-2xl shadow-xl py-3 px-5 md:px-8 flex justify-between items-center">
    <h2 className="text-2xl md:text-3xl font-black text-indigo-400 tracking-wide">HouseHunt Nova</h2>
    <div className="flex items-center space-x-6">
      <span className="text-gray-200">Hi, {user.userData.name}</span>
      <button
        onClick={handleLogOut}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
      >
        Log Out
      </button>
    </div>
  </nav>

  {/* Admin Tabs */}
  <div className="max-w-6xl mx-auto w-full py-28 px-4"> 
    {/* Tabs */}
    <div className="flex space-x-3 mb-6">
      <button
        onClick={() => setActiveTab("users")}
        className={`py-2 px-4 text-base font-semibold rounded-xl transition ${
          activeTab === "users"
            ? "bg-cyan-500/20 border border-cyan-400/40 text-indigo-400"
            : "border border-transparent text-gray-400 hover:text-indigo-300 hover:bg-white/5"
        }`}
      >
        All Users
      </button>
      <button
        onClick={() => setActiveTab("properties")}
        className={`py-2 px-4 text-base font-semibold rounded-xl transition ${
          activeTab === "properties"
            ? "bg-cyan-500/20 border border-cyan-400/40 text-indigo-400"
            : "border border-transparent text-gray-400 hover:text-indigo-300 hover:bg-white/5"
        }`}
      >
        All Properties
      </button>
      <button
        onClick={() => setActiveTab("bookings")}
        className={`py-2 px-4 text-base font-semibold rounded-xl transition ${
          activeTab === "bookings"
            ? "bg-cyan-500/20 border border-cyan-400/40 text-indigo-400"
            : "border border-transparent text-gray-400 hover:text-indigo-300 hover:bg-white/5"
        }`}
      >
        All Bookings
      </button>
    </div>

    {/* Tab Panels */}
    <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-2xl text-gray-200">
      {activeTab === "users" && <AllUsers />}
      {activeTab === "properties" && <AllProperty />}
      {activeTab === "bookings" && <AllBookings />}
    </div>
  </div>
</div>

  );
};

export default AdminHome;
