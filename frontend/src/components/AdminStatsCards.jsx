import React from "react";
import { FaUsers, FaBriefcase, FaUserShield } from "react-icons/fa";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-blue-500 text-white p-6 rounded-lg flex items-center gap-4">
        <FaUsers size={32} />
        <div>
          <h3 className="text-lg font-semibold">Total PWD</h3>
          <p className="text-xl font-bold">{stats.totalPWD}</p>
        </div>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg flex items-center gap-4">
        <FaBriefcase size={32} />
        <div>
          <h3 className="text-lg font-semibold">Total Employers</h3>
          <p className="text-xl font-bold">{stats.totalEmployers}</p>
        </div>
      </div>
      <div className="bg-yellow-500 text-white p-6 rounded-lg flex items-center gap-4">
        <FaUserShield size={32} />
        <div>
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
