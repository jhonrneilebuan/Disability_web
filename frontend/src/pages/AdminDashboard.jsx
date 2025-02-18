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
import { FaBell, FaBriefcase, FaClock, FaUsers } from "react-icons/fa";
import { adminStore } from "../stores/adminApi";
import { authStore } from "../stores/authStore";

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
  const [isOpen, setIsOpen] = useState(false);

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

  const { notifications, clearNotifications, fetchNotifications } = authStore();

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

  const totalUserCounts = [0, totalApplicants + totalEmployers];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Total Users",
        data: totalUserCounts,
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78, 121, 167, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const { totalDisabilityCounts, getDisabilityCounts } = adminStore();
  const [disabilityChartData, setDisabilityChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Disability Type Count",
        data: [],
        backgroundColor: [
          "#4e79a7",
          "#f28e2c",
          "#e15759",
          "#76b7b2",
          "#59a14f",
        ],
      },
    ],
  });

  useEffect(() => {
    getTotalUsers();
    getTotalEmployers();
    getTotalApplicants();
    getEmployerVerificationId();
    getPWDVerificationId();
    fetchNotifications();
    getDisabilityCounts();
  }, [
    getTotalUsers,
    getTotalEmployers,
    getTotalApplicants,
    getEmployerVerificationId,
    getPWDVerificationId,
    fetchNotifications,
    getDisabilityCounts,
  ]);

  useEffect(() => {
    setBarData({
      labels: ["Applicants", "Employers", "Total of Users"],
      datasets: [
        {
          label: "Total Count",
          data: [totalApplicants, totalEmployers, totalUsers],
          backgroundColor: ["blue", "green", "orange"],
        },
      ],
    });
  }, [totalUsers, totalEmployers, totalApplicants]);

  useEffect(() => {
    if (totalDisabilityCounts) {
      setDisabilityChartData({
        labels: Object.keys(totalDisabilityCounts),
        datasets: [
          {
            label: "Disability Type Count",
            data: Object.values(totalDisabilityCounts),
            backgroundColor: ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f"],
          },
        ],
      });
    }
  }, [totalDisabilityCounts]);

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
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <FaBell className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notifications.length}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute left-0 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
            <div className="p-3 text-gray-700 font-semibold">Notifications</div>
            {notifications.length > 0 ? (
              <ul className="max-h-48 overflow-y-auto">
                {[...notifications].reverse().map((notif, index) => (
                  <li
                    key={notif._id || index}
                    className="px-4 py-2 text-sm border-b hover:bg-gray-100 font-poppins"
                  >
                    {notif?.message || notif}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-sm text-gray-500">
                No new notifications
              </div>
            )}

            {notifications.length > 0 && (
              <button
                onClick={() => {
                  clearNotifications();
                  setIsOpen(false);
                }}
                className="w-full py-2 text-center text-red-600 hover:bg-gray-100"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

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
        Disability Statistics Overview (Bar Chart)
      </h3>
      <div className="flex justify-center items-center w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-lg overflow-auto mb-8">
        <Bar
          data={disabilityChartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Disability Statistics Overview",
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
                max: Math.max(...(Object.values(totalDisabilityCounts || {}) || [0]), 0) + 1,
                ticks: { stepSize: 1 },
              },
            },
          }}
        />
      </div>

      <div className="flex justify-between gap-8 mb-8">
        <div
          className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-auto"
          style={{ maxWidth: "550px", height: "400px" }}
        >
          <div className="flex justify-center mb-6">
            <h3 className="text-2xl font-semibold text-center">
              User Distribution (Pie Chart)
            </h3>
          </div>
          <div className="flex justify-center">
            <div style={{ width: "295px", height: "295px" }}>
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
          </div>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            User Trends Over Time (Line Graph)
          </h3>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
