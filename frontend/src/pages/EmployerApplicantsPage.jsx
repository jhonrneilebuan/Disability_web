import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";
import NavbarEmployer from "../components/NavbarEmployer";

const EmployerApplicantsPage = () => {
  const {
    getEmployerApplicants,
    employerApplicants,
    isLoading,
    error,
    shortlistApplication,
    rejectApplication
  } = jobStore();

  const [openShortlistModal, setOpenShortlistModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [openRejectModal, setOpenRejectModal] = useState(false); 
  const [selectedRejectApplicant, setSelectedRejectApplicant] = useState(null);

  useEffect(() => {
    getEmployerApplicants();
    console.log("Applicants fetched:", employerApplicants);
  }, [getEmployerApplicants]);

  const handleShortlist = async () => {
    if (!selectedApplicant) {
      console.error("No applicant selected");
      return;
    }

    console.log("Shortlisting applicant:", selectedApplicant);

    try {
      await shortlistApplication(selectedApplicant._id || selectedApplicant.id);
      console.log("Application shortlisted successfully");
      setOpenShortlistModal(false);
    } catch (error) {
      console.error("Error shortlisting application:", error);
    }
  };


  const handleReject = async () => {
    if (!selectedRejectApplicant) {
      console.error("No applicant selected");
      return;
    }

    console.log("Shortlisting applicant:", selectedRejectApplicant);

    try {
      await rejectApplication(selectedRejectApplicant._id || selectedRejectApplicant.id);
      console.log("Application rejected successfully");
      setOpenRejectModal(false);
    } catch (error) {
      console.error("Error reject application:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <h3 className="text-2xl font-semibold mb-4">Employer Applicants</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center">
                    Job Title
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center">
                    Applicant
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center">
                    Date Applied
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center">
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
                ) : employerApplicants && employerApplicants.length > 0 ? (
                  employerApplicants.map((applicant) => (
                    <tr key={applicant.id} className="border-b">
                      <td className="px-4 py-2 text-sm text-gray-700 text-center">
                        {applicant.jobTitle}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 text-center">
                        {applicant.applicantId || "No name provided"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 text-center">
                        {applicant.appliedAt
                          ? new Date(applicant.appliedAt).toLocaleDateString(
                              "en-US"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              setOpenShortlistModal(true);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          >
                            Shortlist
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            onClick={() => {setSelectedRejectApplicant(applicant);
                              setOpenRejectModal(true);
                            }}
                          >
                            Reject
                          </button>
                        </div>
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
      {openShortlistModal && (
        <Modal
          open={openShortlistModal}
          onClose={() => setOpenShortlistModal(false)}
        >
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Shortlist</h2>
            <p>
              Are you sure you want to shortlist{" "}
              <strong>{selectedApplicant?.applicantId}</strong> for the job{" "}
              <strong>{selectedApplicant?.jobTitle}</strong>?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-800"
                onClick={() => setOpenShortlistModal(false)} 
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleShortlist} 
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
       {openRejectModal && (
        <Modal open={openRejectModal} onClose={() => setOpenRejectModal(false)}>
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Rejection</h2>
            <p>
              Are you sure you want to reject the application of
               <strong>  {selectedRejectApplicant?.applicantId}</strong> for the job
              <strong>   {selectedRejectApplicant?.jobTitle}</strong>?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-800"
                onClick={() => setOpenRejectModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployerApplicantsPage;
