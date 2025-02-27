import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import NavbarEmployer from "../components/NavbarEmployer";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";
import EmployerTableSkeleton from "../components/EmployerTableSkeleton";
const EmployerHiringPage = () => {
  const {
    getCompleteInterviewStatus,
    CompleteInterview,
    isLoading,
    error,
    hiredApplication,
    rejectApplication,
  } = jobStore();

  const [openHiredModal, setOpenHiredModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedRejectApplicant, setSelectedRejectApplicant] = useState(null);

  useEffect(() => {
    getCompleteInterviewStatus();
  }, [getCompleteInterviewStatus]);

  const handleHired = async () => {
    if (!selectedApplicant) {
      console.error("No applicant selected");
      return;
    }

    try {
      await hiredApplication(selectedApplicant._id || selectedApplicant.id);
      await getCompleteInterviewStatus();
      setOpenHiredModal(false);
    } catch (error) {
      console.error("Error shortlisting application:", error);
    }
  };

  const handleReject = async () => {
    if (!selectedRejectApplicant) {
      console.error("No applicant selected");
      return;
    }

    try {
      await rejectApplication(
        selectedRejectApplicant._id || selectedRejectApplicant.id
      );
      await getCompleteInterviewStatus();
      setOpenRejectModal(false);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className=" font-semibold mb-4 font-poppins text-3xl">
            Employer Applicants
          </h3>


          <div className="overflow-hidden rounded-lg shadow-lg border border-gray-300">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center font-poppins">
                    Job Title
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center font-poppins">
                    Applicant
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center font-poppins">
                    Status
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center font-poppins">
                    Date Applied
                  </th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-700 text-center font-poppins">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <EmployerTableSkeleton rows={5} />
                ) : error ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-sm text-gray-700 font-poppins"
                    >
                      {error}
                    </td>
                  </tr>
                ) : CompleteInterview && CompleteInterview.length > 0 ? (
                  [...CompleteInterview].reverse().map((applicant) => (
                    <tr key={applicant.id} className="border-b border-gray-300">
                      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
                        {applicant.jobTitle}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
                            <img
                              src={
                                applicant.applicantProfilePicture ||
                                "avatar.png"
                              }
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-700 font-poppins">
                              {applicant.applicantName || "No name provided"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
                        <span
                          className={`inline-block px-4 py-1 text-white rounded-full font-medium ${
                            applicant.status === "Interview Completed"
                              ? "bg-orange-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {applicant.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
                        {applicant.appliedAt
                          ? new Date(applicant.appliedAt).toLocaleDateString(
                              "en-US"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              setOpenHiredModal(true);
                            }}
                            className="w-24 bg-green-500 text-white px-3 py-2 text-sm font-medium rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                          >
                            Hired
                          </button>

                          <button
                            onClick={() => {
                              setSelectedRejectApplicant(applicant);
                              setOpenRejectModal(true);
                            }}
                            className="w-24 bg-red-500 text-white px-3 py-2 text-sm font-medium rounded-full shadow-md hover:bg-red-600 hover:shadow-lg focus:ring-2 focus:ring-red-400 transition-all duration-200"
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
                      colSpan="5"
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
      {openHiredModal && (
        <Modal open={openHiredModal} onClose={() => setOpenHiredModal(false)}>
          <div className="text-center w-96">
            <div className="rounded-full bg-gray-100 w-12 h-12 mx-auto flex justify-center items-center mb-1">
              <img src="hired.png" alt="Hired" className="w-12 h-12" />
            </div>
            <h2 className="text-lg font-semibold mb-4 font-poppins">
              Confirm Hiring
            </h2>
            <p className="font-poppins">
              Are you sure you want to hire{" "}
              <strong>{selectedApplicant?.applicantName}</strong> for the role
              of
              <strong> {selectedApplicant?.jobTitle}</strong>? Once confirmed,
              this action cannot be undone.
            </p>

            <div className="mt-4 flex justify-center gap-16">
              <button
                className="px-10 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-800 font-poppins"
                onClick={() => setOpenHiredModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-10 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 font-poppins"
                onClick={handleHired}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}

      {openRejectModal && (
        <Modal open={openRejectModal} onClose={() => setOpenRejectModal(false)}>
          <div className="text-center w-96">
            <div className="rounded-full bg-gray-100 w-12 h-12 mx-auto flex justify-center items-center mb-1">
              <img src="warning.png" alt="Columns" className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-4 font-poppins">
              Confirm Rejection
            </h2>
            <p className="font-poppins text-center">
              Are you sure you want to reject the application of
              <strong> {selectedRejectApplicant?.applicantName}</strong> for the
              job
              <strong> {selectedRejectApplicant?.jobTitle}</strong>?
            </p>
            <div className="mt-4 flex justify-center gap-16">
              <button
                className="px-10 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-800 font-poppins"
                onClick={() => setOpenRejectModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-10 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 font-poppins "
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

export default EmployerHiringPage;
