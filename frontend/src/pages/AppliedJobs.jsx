import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { jobStore } from "../stores/jobStore";
import FormatTimeDate from "../components/FormatTimeDate";
import { Search } from "lucide-react";

const AppliedJobs = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    applications = [],
    isLoading,
    error,
    getApplicationsByApplicant,
  } = jobStore();

  useEffect(() => {
    getApplicationsByApplicant();
  }, [getApplicationsByApplicant]);

  const filteredApplications = applications.filter((application) => {
    const matchesKeyword =
      application.jobId?.jobTitle
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      application.status.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchesKeyword;
  });

  return (
    <div className="min-h-screen bg-pastelBlueGray flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-start space-y-4 pt-8">
        <h1 className="text-4xl font-extrabold text-center font-jakarta text-black pt-12">
          My Job Applications
        </h1>

        <div className="w-full max-w-4xl mx-auto ">
          <div className="relative mb-6">
            <input
              placeholder="Search by job titles or keywords..."
              className="px-10 py-2 rounded w-full text-black placeholder-black bg-white bg-opacity-50 border border-black focus:outline-none"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
              <Search size={20} />
            </div>
          </div>
        </div>
        

        <div className="space-y-4 w-full max-w-4xl mx-auto pb-5">
          <h2 className="text-2xl font-semibold font-jakarta text-black mb-4">
            Applied Jobs
          </h2>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-jakarta mb-2">
                    Job Title: {application.jobId?.jobTitle}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-xl font-semibold font-jakarta">
                      Date Applied:
                    </p>
                    <p className="text-xl font-semibold font-jakarta">
                      <FormatTimeDate date={application.createdAt} />
                    </p>
                  </div>
                  <p className="text-xl font-semibold font-jakarta mb-4">
                    Status: {application.status}
                  </p>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-buttonBlue text-white rounded hover:bg-blue-600 mr-5"
                    onClick={() => {}}
                  >
                    View details
                  </button>
                  <button
                    className="px-4 py-2 bg-buttonBlue text-white rounded hover:bg-blue-600"
                    onClick={() => {}}
                  >
                    Withdraw Application
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
