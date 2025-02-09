import { Download, Link } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import NavbarEmployer from "../components/NavbarEmployer";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";

const EmployerApplicantsPage = () => {
  const {
    getEmployerApplicants,
    employerApplicants,
    isLoading,
    error,
    shortlistApplication,
    rejectApplication,
  } = jobStore();

  const [openShortlistModal, setOpenShortlistModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedRejectApplicant, setSelectedRejectApplicant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [selectedViewApplicant, setSelectedViewApplicant] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  useEffect(() => {
    getEmployerApplicants();
  }, [getEmployerApplicants]);

  useEffect(() => {
    if (searchQuery === "") {
      setIsSearchSubmitted(false);
    }
  }, [searchQuery]);

  const handleShortlist = async () => {
    if (!selectedApplicant) {
      console.error("No applicant selected");
      return;
    }

    try {
      await shortlistApplication(selectedApplicant._id || selectedApplicant.id);
      await getEmployerApplicants();
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

    try {
      await rejectApplication(
        selectedRejectApplicant._id || selectedRejectApplicant.id
      );
      await getEmployerApplicants();
      setOpenRejectModal(false);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  const handleSearch = () => {
    setIsSearchSubmitted(true);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredApplicants = employerApplicants
    .filter((applicant) =>
      searchQuery && isSearchSubmitted
        ? applicant.jobTitle
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (applicant.applicantId &&
            applicant.applicantId
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
        : true
    )
    .filter((applicant) =>
      filterStatus === "All" ? true : applicant.status === filterStatus
    );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className=" font-semibold mb-4 font-poppins text-3xl">
            Employer Applicants
          </h3>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-2/3">
              <input
                type="text"
                placeholder="Search by Job Title or Applicant Name"
                className="border border-gray-300 px-4 py-2 rounded-l-full w-full focus:outline-none font-poppins"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleEnterKey}
              />
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-r-full hover:bg-gray-900 font-poppins"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <select
              className="border border-gray-300 px-4 py-2 rounded-lg font-poppins"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

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
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-sm text-gray-700"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-sm text-gray-700"
                    >
                      {error}
                    </td>
                  </tr>
                ) : filteredApplicants && filteredApplicants.length > 0 ? (
                  [...filteredApplicants].reverse().map((applicant) => (
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
                            applicant.status === "Pending"
                              ? "bg-orange-500"
                              : applicant.status === "Rejected"
                              ? "bg-red-500"
                              : applicant.status === "Shortlisted"
                              ? "bg-blue-500"
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
                            className="w-24 bg-green-500 text-white px-3 py-2 text-sm font-medium rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:ring-2 focus:ring-green-400 transition-all duration-200"
                            onClick={() => {
                              setSelectedViewApplicant(applicant);
                              setOpenViewModal(true);
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              setOpenShortlistModal(true);
                            }}
                            className="w-24 bg-blue-500 text-white px-3 py-2 text-sm font-medium rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                          >
                            Shortlist
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
      {openShortlistModal && (
        <Modal
          open={openShortlistModal}
          onClose={() => setOpenShortlistModal(false)}
        >
          <div className="text-center w-96">
            <div className="rounded-full bg-gray-100 w-12 h-12 mx-auto flex justify-center items-center mb-1">
              <img src="shortlist.png" alt="Columns" className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-semibold mb-4 font-poppins">
              Confirm Shortlist
            </h2>
            <p className="font-poppins">
              Are you sure you want to shortlist{" "}
              <strong>{selectedApplicant?.applicantId}</strong> for the job{" "}
              <strong>{selectedApplicant?.jobTitle}</strong>?
            </p>
            <div className="mt-4 flex justify-center gap-16">
              <button
                className="px-10 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-800 font-poppins"
                onClick={() => setOpenShortlistModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-10 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 font-poppins"
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
          <div className="text-center w-96">
            <div className="rounded-full bg-gray-100 w-12 h-12 mx-auto flex justify-center items-center mb-1">
              <img src="warning.png" alt="Columns" className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-4 font-poppins">
              Confirm Rejection
            </h2>
            <p className="font-poppins text-center">
              Are you sure you want to reject the application of
              <strong> {selectedRejectApplicant?.applicantId}</strong> for the
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
      {openViewModal && (
        <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
          <div className="p-6 w-full min-w-[900px]  mx-autofont-poppins">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center font-poppins">
              Applicant Application
            </h2>

            <div className="space-y-4 text-sm text-gray-700 ">
              <div className="flex items-start gap-3">
                <span className="font-medium text-gray-900 font-poppins min-w-[150px]">
                  Accessibility Needs:{" "}
                </span>
                <p className="font-poppins text-justify flex-1">
                  {selectedViewApplicant?.accessibilityNeeds || "Not provided"}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-medium text-gray-900 font-poppins min-w-[150px]">
                  Cover Letter:
                </span>
                <p className="font-poppins text-justify flex-1">
                  {selectedViewApplicant?.coverLetter ||
                    "No cover letter provided."}
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <span className="font-medium text-gray-900 w-40 font-poppins">
                    Resume:
                  </span>
                  <div className="p-4 border border-gray-300 rounded-lg flex items-center flex-1 min-w-0 max-w-xl">
                    {selectedViewApplicant?.resume ? (
                      <div className="flex items-center w-full">
                        <a
                          href={selectedViewApplicant.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline flex items-center font-poppins font-normal"
                        >
                          <Link size={20} className="mr-2" />
                          View Resume
                        </a>
                        <a
                          href={selectedViewApplicant.resume}
                          download
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center ml-auto font-poppins"
                        >
                          <Download size={20} className="mr-2" />
                          Download
                        </a>
                      </div>
                    ) : (
                      <p className="text-gray-500">No resume available</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="font-medium text-gray-900 w-40 font-poppins">
                    Additional Files:
                  </span>
                  <div className="flex flex-col gap-4 flex-1 min-w-0 max-w-xl">
                    {selectedViewApplicant?.additionalFiles?.length > 0 ? (
                      selectedViewApplicant.additionalFiles.map(
                        (file, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-300 rounded-lg flex items-center"
                          >
                            <a
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline flex items-center font-poppins font-normal"
                            >
                              <Link size={20} className="mr-2" />
                              View File {index + 1}
                            </a>
                            <a
                              href={file}
                              download
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center ml-auto font-poppins"
                            >
                              <Download size={20} className="mr-2" />
                              Download
                            </a>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">
                        No additional files provided.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployerApplicantsPage;
