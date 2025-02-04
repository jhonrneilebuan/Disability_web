import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/AdminSideBarNav";
import StatsCards from "../components/AdminStatsCards";
import BarChart from "../components/AdminBarChart";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalPWD: 0,
    totalEmployers: 0,
    totalUsers: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const barData = {
    labels: ["Total PWD", "Total Employers", "Total Users"],
    datasets: [
      {
        label: "User Statistics",
        data: [stats.totalPWD, stats.totalEmployers, stats.totalUsers],
        backgroundColor: ["#3b82f6", "#10b981", "#fbbf24"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar
        handleNavigation={handleNavigation}
        handleLogout={handleLogout}
      />
      <main className="flex-1 bg-white shadow-md rounded-lg p-6 mx-4 my-4 overflow-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
          Dashboard Overview
        </h2>
        <StatsCards stats={stats} />
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center md:text-left">
            User Statistics Overview
          </h3>
          <BarChart barData={barData} />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
