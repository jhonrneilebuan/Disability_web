import {
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
import {
  Briefcase,
  CheckCircle,
  Clock,
  User,
  UserCheck,
  VideoIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import NavbarEmployer from "../components/NavbarEmployer";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";
import SkeletonLoader from "../components/SkeletonLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EmployerPage = () => {
  const {
    totalApplicants,
    totalJobs,
    getTotalJobs,
    getTotalPending,
    totalPending,
    getTotalShortlist,
    totalShortlist,
    getTotalInterview,
    totalInterview,
    getTotalHired,
    totalHired,
    getTotalApplicant,
    totalDataOfApplicants,
    totalApplicantCount,
    getJobApplicantsCount,
    isChartLoading,
  } = jobStore();

  useEffect(() => {
    getTotalJobs();
    getTotalPending();
    getTotalShortlist();
    getTotalInterview();
    getTotalHired();
    getTotalApplicant();
    getJobApplicantsCount();
  }, [
    getTotalInterview,
    getTotalJobs,
    getTotalPending,
    getTotalShortlist,
    getTotalHired,
    getTotalApplicant,
    getJobApplicantsCount,
  ]);

  const chartData = {
    labels: totalApplicantCount.map((job) => job.jobTitle),
    datasets: [
      {
        label: "Number of Applicants",
        data: totalApplicantCount.map((job) => job.applicantCount),
        backgroundColor: totalApplicantCount.map(
          (_, index) => `hsl(${(index * 40) % 360}, 70%, 60%)`
        ),
        borderColor: totalApplicantCount.map(
          (_, index) => `hsl(${(index * 40) % 360}, 70%, 40%)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const maxValue =
    Math.max(...totalApplicantCount.map((job) => job.applicantCount)) + 2;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <NavbarEmployer />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-white p-10 overflow-auto h-full">
          <h1 className="font-poppins text-2xl font-light">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-poppins text-black">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Job & Application Summary
              </h3>
              <div className="flex justify-between gap-4">
                {isChartLoading ? (
                  <>
                    <SkeletonLoader className="w-1/3 h-32" />
                    <SkeletonLoader className="w-1/3 h-32" />
                    <SkeletonLoader className="w-1/3 h-32" />
                  </>
                ) : (
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center w-1/3">
                      <div className="bg-blue-300 p-2 rounded-full">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <h4 className="text-md font-semibold mt-1">
                        Total Applicants
                      </h4>
                      <p className="text-xl font-bold mt-1">
                        {totalApplicants ?? "0"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center w-1/3">
                      <div className="bg-green-300 p-2 rounded-full">
                        <Briefcase size={20} className="text-green-800" />
                      </div>
                      <h4 className="text-md font-semibold mt-1">Total Jobs</h4>
                      <p className="text-xl font-bold mt-1">{totalJobs ?? "0"}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center w-1/3">
                      <div className="bg-yellow-300 p-2 rounded-full">
                        <VideoIcon size={20} className="text-yellow-700" />
                      </div>
                      <h4 className="text-base font-semibold mt-1">
                        Total Interviews
                      </h4>
                      <p className="text-xl font-bold mt-1">
                        {totalInterview ?? "0"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Application Status
              </h3>
              <div className="flex justify-between gap-4">
                {isChartLoading ? (
                  <>
                    <SkeletonLoader className="w-1/3 h-32" />
                    <SkeletonLoader className="w-1/3 h-32" />
                    <SkeletonLoader className="w-1/3 h-32" />
                  </>
                ) : (
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center w-1/3">
                      <div className="bg-green-300 p-2 rounded-full">
                        <CheckCircle size={20} className="text-green-800" />
                      </div>
                      <h4 className="text-md font-semibold mt-1">Total Hired</h4>
                      <p className="text-xl font-bold mt-1">
                        {totalHired ?? "0"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center w-1/3">
                      <div className="bg-yellow-300 p-2 rounded-full">
                        <Clock size={20} className="text-yellow-700" />
                      </div>
                      <h4 className="text-md font-semibold mt-1">
                        Total Pending
                      </h4>
                      <p className="text-xl font-bold mt-1">
                        {totalPending ?? "0"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center w-1/3">
                      <div className="bg-blue-300 p-2 rounded-full">
                        <UserCheck size={20} className="text-blue-600" />
                      </div>
                      <h4 className="text-md font-semibold mt-1">
                        Total Shortlisted
                      </h4>
                      <p className="text-xl font-bold mt-1">
                        {totalShortlist ?? "0"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-light text-gray-800 mb-4 font-poppins">
              Analytics Overview
            </h3>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-center mb-4">
                  Applicants Over Time
                </h3>
                {isChartLoading ? (
                  <SkeletonLoader className="h-56" />
                ) : (
                  <Line
                    data={totalDataOfApplicants}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Applicants Over Time" },
                      },
                    }}
                  />
                )}
              </div>

              <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-center mb-4">
                  Job Applicants Chart
                </h3>
                {isChartLoading ? (
                  <SkeletonLoader className="h-56" />
                ) : (
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: true, position: "top" },
                        title: {
                          display: true,
                          text: "Number of Applicants per Job",
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
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerPage;
