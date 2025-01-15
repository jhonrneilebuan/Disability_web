import Sidebar from "../components/Sidebar";
import NavbarEmployer from "../components/NavbarEmployer";

const EmployerPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center text-white">
              <h3 className="text-xl font-semibold">Total Applicants</h3>
              <p className="text-5xl font-bold">125</p>
              <p className="text-md">Applications Received</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center text-white">
              <h3 className="text-xl font-semibold">Total Jobs</h3>
              <p className="text-5xl font-bold">8</p>
              <p className="text-md">Active Job Postings</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-lg shadow-xl flex flex-col items-center justify-center text-center text-white">
              <h3 className="text-xl font-semibold">Analytics</h3>
              <div className="flex flex-col mt-4 w-full max-w-md space-y-4">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>Applications Received</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-300 h-2 rounded-full">
                  <div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm text-white">
                  <span>Applications Processed</span>
                  <span>50%</span>
                </div>
                <div className="w-full bg-gray-300 h-2 rounded-full">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm text-white">
                  <span>Applicants Shortlisted</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-gray-300 h-2 rounded-full">
                  <div
                    className="bg-red-400 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <p className="text-sm mt-2">Performance Metrics</p>
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
