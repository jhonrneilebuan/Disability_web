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
import { FaBriefcase, FaClock, FaUsers } from "react-icons/fa";
import AdminDashboardSkeletonLoader from "../components/AdminDashboardSkeletonLoader";
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
    getTotalusers,
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
    userLabels, // <--- Ito ang nawawala
    userCounts, // <--- Ito ang nawawala
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
    labels: userLabels || [], // Use empty array as fallback
    datasets: [
      {
        label: "Total Users",
        data: userCounts || [],
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78, 121, 167, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve effect
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
    getTotalusers();
    getTotalEmployers();
    getTotalApplicants();
    getEmployerVerificationId();
    getPWDVerificationId();
    getDisabilityCounts();
  }, [
    getTotalUsers,
    getTotalusers,
    getTotalEmployers,
    getTotalApplicants,
    getEmployerVerificationId,
    getPWDVerificationId,
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
    }
  }, [totalDisabilityCounts]);

  const maxValue = Math.max(totalUsers, totalEmployers, totalApplicants) + 2;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, [isAdminLoading]);

  if (loading) {
    return <AdminDashboardSkeletonLoader />;
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
            <h3 className="text-lg font-semibold font-poppins">
              Total Applicants
            </h3>
            <p className="text-xl font-bold text-center font-poppins">
              {totalApplicants}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-t from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:scale-105 transform transition duration-300">
          <FaBriefcase size={32} />
          <div>
            <h3 className="text-lg font-semibold font-poppins">
              Total Employers
            </h3>
            <p className="text-xl font-bold text-center font-poppins">
              {totalEmployers}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-t from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:scale-105 transform transition duration-300">
          <FaClock size={32} />
          <div>
            <h3 className="text-lg font-semibold font-poppins">
              Request Employer
            </h3>
            <p className="text-xl font-bold text-center font-poppins">
              {pendingEmployerID}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-t from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:scale-105 transform transition duration-300">
          <FaClock size={32} />
          <div>
            <h3 className="text-lg font-semibold font-poppins">Request PWD</h3>
            <p className="text-xl font-bold text-center font-poppins">
              {pendingPwdID}
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-6 text-center font-poppins">
        User Statistics Overview
      </h3>
      <div className="flex justify-center items-center w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-lg overflow-auto mb-8 font-poppins">
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

      <h3 className="text-2xl font-semibold mb-6 text-center font-poppins ">
        Disability Statistics Overview
      </h3>
      <div className="flex justify-center items-center w-full h-64 md:h-96 bg-white p-6 rounded-lg shadow-lg overflow-auto mb-8 font-poppins">
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
                max:
                  Math.max(
                    ...(Object.values(totalDisabilityCounts || {}) || [0]),
                    0
                  ) + 1,
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
            <h3 className="text-2xl font-semibold text-center font-poppins">
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
          <h3 className="text-2xl font-semibold mb-6 text-center font-poppins">
            User Trends Over Time
          </h3>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
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
