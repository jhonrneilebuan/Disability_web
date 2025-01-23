import { Briefcase, User, VideoIcon } from "lucide-react";
import NavbarEmployer from "../components/NavbarEmployer";
import Sidebar from "../components/Sidebar";

const EmployerPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-white p-20">
          <h1 className="font-poppins text-2xl font-light">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-4 shadow-md flex flex-col items-center justify-center text-center text-black bg-gradient-to-r from-blue-200 to-blue-400">
              <div className="bg-blue-300 p-2 rounded-full">
                <User size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mt-3">Total Applicants</h3>
              <p className="text-3xl font-bold mt-1">125</p>
              <p className="text-sm mt-1">Applications Received</p>
            </div>

            <div className="p-4 shadow-md flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-green-400 to-green-600">
              <div className="bg-green-300 p-2 rounded-full">
                <Briefcase size={24} className="text-green-800" />
              </div>
              <h3 className="text-lg font-semibold mt-3">Total Jobs</h3>
              <p className="text-3xl font-bold mt-1">8</p>
              <p className="text-sm mt-1">Active Job Postings</p>
            </div>

            <div className="p-4 shadow-md flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-yellow-300 to-yellow-500">
              <div className="bg-yellow-300 p-2 rounded-full">
                <VideoIcon size={24} className="text-yellow-700" />
              </div>
              <h3 className="text-lg font-semibold mt-3">
                Available Interviews
              </h3>
              <p className="text-3xl font-bold mt-1">?</p>
              <p className="text-sm mt-1">Coming Soon</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Manage Job Postings & Applications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Active Job Postings
                </h4>
                <p className="text-4xl font-bold text-gray-900">5</p>
                <p className="text-md text-gray-600">Jobs Currently Open</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Pending Applications
                </h4>
                <p className="text-4xl font-bold text-gray-900">32</p>
                <p className="text-md text-gray-600">
                  Applications Awaiting Review
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Shortlisted Candidates
                </h4>
                <p className="text-4xl font-bold text-gray-900">7</p>
                <p className="text-md text-gray-600">Candidates Shortlisted</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Recent Activities
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h4 className="text-lg font-semibold text-gray-700">
                Recent Job Post
              </h4>
              <ul className="list-disc ml-6 mt-2 text-gray-700">
                <li>Posted a job for Graphic Designer</li>
                <li>Reviewed application from Tan</li>
                <li>Updated job description for Content Writer</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerPage;
