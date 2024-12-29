import React, { useEffect } from "react";
import Sidebar from "../components/SideBar";
import { jobStore } from "../stores/jobStore";

const EmployerApplicantsPage = () => {
  const { getEmployerApplicants, employerApplicants, isLoading, error } =
    jobStore();

  useEffect(() => {
    getEmployerApplicants();
  }, [getEmployerApplicants]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h3 className="text-2xl font-semibold mb-4">Employer Applicants</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Job Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Applicant
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Date Applied
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-sm text-gray-700"
                  >
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-sm text-gray-700"
                  >
                    {error}
                  </td>
                </tr>
              ) : employerApplicants.length > 0 ? (
                employerApplicants.map((applicant, index) => (
                  <tr
                    key={`${applicant.applicantId}-${applicant.jobTitle}`}
                    className="border-b"
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {applicant.jobTitle}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {applicant.applicantId || "No name provided"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(applicant.appliedAt).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">
                        View
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600">
                        Shortlist
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-sm text-gray-700"
                  >
                    No applicants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerApplicantsPage;
