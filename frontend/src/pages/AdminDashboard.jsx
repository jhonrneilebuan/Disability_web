import { useEffect, useState } from "react";
import { adminStore } from "../stores/adminApi";
import React from "react";
import { FaUsers, FaBriefcase, FaUserShield } from "react-icons/fa";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const AdminDashboard = () => {
  const {
    totalUsers,
    getTotalUsers,
    getTotalEmployers,
    totalEmployers,
    getTotalApplicants,
    totalApplicants,
    isAdminLoading,
    error,
  } = adminStore();

  // State to manage chart data for Bar Chart
  const [barData, setBarData] = useState({
    labels: ["Applicants","Employers", "Users" ],
    datasets: [
      {
        label: "Total Count",
        data: [totalApplicants, totalEmployers, totalUsers],
        backgroundColor: ["#4e79a7", "#f28e2c", "#e15759"],
      },
    ],
  });

  const pieData = {
    labels: ["Employers", "Applicants"],
    datasets: [
      {
        data: [totalEmployers, totalApplicants],
        backgroundColor: ["#f28e2c", "#e15759"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Users",
        data: [30, 40, 45, 60, 70],
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78, 121, 167, 0.2)",
        fill: true,
      },
    ],
  };

  useEffect(() => {
    getTotalUsers();
    getTotalEmployers();
    getTotalApplicants();
  }, [getTotalUsers, getTotalEmployers, getTotalApplicants]);

  useEffect(() => {
    setBarData({
      labels: ["Applicants", "Employers","Users" ],
      datasets: [
        {
          label: "Total Count",
          data: [totalApplicants, totalEmployers, totalUsers],
          backgroundColor: ["#4e79a7", "#f28e2c", "#e15759"],
        },
      ],
    });
  }, [totalUsers, totalEmployers, totalApplicants]);

  const maxValue = Math.max(totalUsers, totalEmployers, totalApplicants) + 2;

  if (isAdminLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg flex items-center gap-4">
          <FaUsers size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Applicants</h3>
            <p className="text-xl font-bold">{totalApplicants}</p>
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg flex items-center gap-4">
          <FaBriefcase size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Employers</h3>
            <p className="text-xl font-bold">{totalEmployers}</p>
          </div>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg flex items-center gap-4">
          <FaUserShield size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
        User Statistics Overview (Bar Chart)
      </h3>
      <div className="w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-md overflow-auto mb-8">
        <Bar
          data={barData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "User Statistics Overview",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: maxValue,
                ticks: { stepSize: 1 },
              },
            },
          }}
        />
      </div>

      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
        User Distribution (Pie Chart)
      </h3>
      <div className="w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-md overflow-auto mb-8">
        <Pie
          data={pieData}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw}`,
                },
              },
            },
          }}
        />
      </div>

      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
        User Trends Over Time (Line Graph)
      </h3>
      <div className="w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-md overflow-auto">
        <Line
          data={lineData}
          options={{
            responsive: true,
            plugins: {
              title: { display: true, text: "User Trends Over Time" },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.dataset.label}: ${context.raw}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
