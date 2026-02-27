import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import PropTypes from "prop-types";
import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className="w-full mt-6">
      {value === index && <div>{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Navbar */}
      <nav className="sticky top-3 z-50 bg-black/40 backdrop-blur-xl border border-cyan-400/25 rounded-2xl shadow-xl mx-3 md:mx-6 px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-black text-indigo-400 tracking-wide">HouseHunt Nova</h2>
        <div className="flex items-center gap-6">
          <h5 className="font-medium text-gray-200">
            Hi, {user.userData.name}
          </h5>
          <Link
            to="/"
            onClick={handleLogOut}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Log Out
          </Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className="w-full max-w-5xl mx-auto mt-10 bg-gray-900/80 border border-gray-700 shadow-xl rounded-2xl p-6 backdrop-blur-md">
        <div className="flex gap-3">
          <button
            className={`px-6 py-2 text-sm font-semibold transition-colors rounded-xl border ${value === 0
                ? "text-indigo-400 border-cyan-400/50 bg-cyan-500/20"
                : "text-gray-400 border-transparent hover:text-indigo-300 hover:bg-white/5"
              }`}
            onClick={() => setValue(0)}
          >
            All Properties
          </button>
          <button
            className={`px-6 py-2 text-sm font-semibold transition-colors rounded-xl border ${value === 1
                ? "text-indigo-400 border-cyan-400/50 bg-cyan-500/20"
                : "text-gray-400 border-transparent hover:text-indigo-300 hover:bg-white/5"
              }`}
            onClick={() => setValue(1)}
          >
            Booking History
          </button>
        </div>

        {/* Tab Panels */}
        <CustomTabPanel value={value} index={0}>
          <div className="mt-6">
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="mt-6">
            <AllProperty />
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default RenterHome;
