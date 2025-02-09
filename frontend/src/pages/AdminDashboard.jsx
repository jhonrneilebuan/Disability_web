import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { FaBriefcase, FaUsers, FaClock } from "react-icons/fa";
import { adminStore } from "../stores/adminApi";

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
    getEmployerVerificationId,
    pendingEmployerID,
    getPWDVerificationId,
    pendingPwdID,
    error,
  } = adminStore();

  const [barData, setBarData] = useState({
    labels: ["Applicants", "Employers", "Users"],
    datasets: [
      {
        label: "Total Count",
        data: [totalApplicants, totalEmployers, totalUsers],
        backgroundColor: ["#4e79a7", "#f28e2c", "#e15759"],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  });

  const pieData = {
    labels: ["Employers", "Applicants"],
    datasets: [
      {
        data: [totalEmployers, totalApplicants],
        backgroundColor: ["#f28e2c", "#e15759"],
        hoverOffset: 10,
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
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    getTotalUsers();
    getTotalEmployers();
    getTotalApplicants();
    getEmployerVerificationId();
    getPWDVerificationId();
  }, [
    getTotalUsers,
    getTotalEmployers,
    getTotalApplicants,
    getEmployerVerificationId,
    getPWDVerificationId,
  ]);

  useEffect(() => {
    setBarData({
      labels: ["Applicants", "Employers", "Users"],
      datasets: [
        {
          label: "Total Count",
          data: [totalApplicants, totalEmployers, totalUsers],
          backgroundColor: ["blue", "green", "orange"],
        },
      ],
    });
  }, [totalUsers, totalEmployers, totalApplicants]);

  const maxValue = Math.max(totalUsers, totalEmployers, totalApplicants) + 2;

  if (isAdminLoading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl font-semibold">{`Error: ${error}`}</div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-blue-200 p-8 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="bg-gradient-to-t from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:scale-105 transform transition duration-300">
          <FaUsers size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Applicants</h3>
            <p className="text-xl font-bold">{totalApplicants}</p>
          </div>
        </div>
        <div className="bg-gradient-to-t from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:scale-105 transform transition duration-300">
          <FaBriefcase size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Employers</h3>
            <p className="text-xl font-bold">{totalEmployers}</p>
          </div>
        </div>
        <div className="bg-gradient-to-t from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:scale-105 transform transition duration-300">
          <FaClock size={32} />
          <div>
            <h3 className="text-lg font-semibold">Request Employer</h3>
            <p className="text-xl font-bold">{pendingEmployerID}</p>
          </div>
        </div>
        <div className="bg-gradient-to-t from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:scale-105 transform transition duration-300">
          <FaClock size={32} />
          <div>
            <h3 className="text-lg font-semibold">Request PWD</h3>
            <p className="text-xl font-bold">{pendingPwdID}</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-6 text-center">
        User Statistics Overview (Bar Chart)
      </h3>
      <div className="flex justify-center items-center w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-lg overflow-auto mb-8">
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
                  label: (context) =>
                    `${context.dataset.label}: ${context.raw}`,
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

      <h3 className="text-2xl font-semibold mb-6 text-center">
        User Distribution (Pie Chart)
      </h3>
      <div className="flex justify-center items-center w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-lg overflow-auto mb-8">
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

      <h3 className="text-2xl font-semibold mb-6 text-center">
        User Trends Over Time (Line Graph)
      </h3>
      <div className="flex justify-center items-center w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-lg overflow-auto">
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
