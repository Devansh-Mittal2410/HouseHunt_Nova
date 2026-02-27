import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";

const tabs = [
  { name: "Add Property", component: <AddProperty /> },
  { name: "All Properties", component: <AllProperties /> },
  { name: "All Bookings", component: <AllBookings /> },
];

const OwnerHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Navbar */}
      <nav className="sticky top-3 z-50 bg-black/40 backdrop-blur-xl shadow-xl border border-cyan-400/25 rounded-2xl mx-3 md:mx-6">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-black text-indigo-400 tracking-wide">HouseHunt Nova</h2>
          <div className="flex items-center gap-6">
            <h5 className="font-medium text-gray-300">
              Hi {user.userData.name}
            </h5>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 text-sm bg-red-500/80 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex space-x-3">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 font-semibold text-sm transition-all duration-200 rounded-xl border
            ${activeTab === index
                  ? "text-indigo-400 border-cyan-400/50 bg-cyan-500/20 shadow-inner"
                  : "text-gray-400 border-transparent hover:text-indigo-300 hover:bg-white/5"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900/80 border border-gray-700 backdrop-blur-md mt-6 p-6 shadow-2xl rounded-xl transition-all">
          {tabs[activeTab].component}
        </div>
      </div>
    </div>

  );
};

export default OwnerHome;
