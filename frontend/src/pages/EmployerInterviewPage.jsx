import { useEffect, useState } from "react";
import EmployerTableSkeleton from "../components/EmployerTableSkeleton";
import Modal from "../components/Modal";
import NavbarEmployer from "../components/NavbarEmployer";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";
import { useSearchParams } from "react-router-dom";

const EmployerInterviewPage = () => {
  const {
    getShortlistedApplicant,
    shortlistedApplicants,
    isLoading,
    interviewLoading,
    error,
    isError,
    scheduleInterview,
    scheduledInterviewApplicants,
    getscheduledInterviewStatus,
    CompleteInterviewApplication,
  } = jobStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setDetailsModal] = useState(false);
  const [openCompleteInterviewModal, setCompleteInterviewModal] =
    useState(false);
  const [selectedCompleteInterviewApplicant, setCompleteInterviewApplicant] =
    useState(null);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const [interviewDetails, setInterviewDetails] = useState({
    scheduled_time: "",
    interview_type: "",
    location: "",
  });
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [formError, setFormError] = useState("");
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl || "create");
  

  useEffect(() => {
    if (activeTab === "create" && !hasRefreshed) {
      refreshData();
      setHasRefreshed(true);
    } else if (activeTab !== "create") {
      setHasRefreshed(false);
    }
    getShortlistedApplicant();
    getscheduledInterviewStatus();
  }, [
    activeTab,
    getShortlistedApplicant,
    getscheduledInterviewStatus,
    hasRefreshed,
  ]);

  console.log("Scheduled Interview Applicants:", scheduledInterviewApplicants);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
    setFormError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setInterviewDetails({
      scheduled_time: "",
      interview_type: "",
      location: "",
    });
    setFormError("");
  };

  const openDetailsModal = (applicant) => {
    setSelectedApplicant(applicant);
    setDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedApplicant(null);
    setDetailsModal(false);
  };

  const handleCompleteInterview = async () => {
    if (!selectedCompleteInterviewApplicant) {
      console.error("No applicant selected");
      return;
    }

    try {
      await CompleteInterviewApplication(
        selectedCompleteInterviewApplicant._id ||
          selectedCompleteInterviewApplicant.id
      );
      await getscheduledInterviewStatus();
      setCompleteInterviewModal(false);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!interviewDetails.scheduled_time || !interviewDetails.interview_type) {
      setFormError("Interview type and scheduled time are required.");
      return;
    }

    if (
      interviewDetails.interview_type === "In-Person" &&
      !interviewDetails.location
    ) {
      setFormError("Location is required for In-Person interviews.");
      return;
    }

    if (
      interviewDetails.interview_type === "Online" &&
      !interviewDetails.platformLink
    ) {
      setFormError("Platform link is required for Online interviews.");
      return;
    }

    try {
      await scheduleInterview(selectedApplicant.id, interviewDetails);
      closeModal();
    } catch (error) {
      setFormError(error || "Failed to schedule interview. Please try again.");
    }
  };

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const refreshData = () => {};

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="font-semibold mb-4 font-poppins text-3xl">
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
              />
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-r-full hover:bg-gray-900 font-poppins"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex mb-4 border-b">
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === "create"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("create")}
            >
              Create Schedule
            </button>
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === "scheduled"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("scheduled")}
            >
              Scheduled Interviews
            </button>
          </div>
          {activeTab === "create" ? (
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
                        className="px-4 py-2 text-center text-sm font-poppins"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : shortlistedApplicants &&
                    shortlistedApplicants.length > 0 ? (
                    shortlistedApplicants.map((applicant) => (
                      <tr
                        key={applicant.id}
                        className="border-b border-gray-300"
                      >
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
                              applicant.status === "Shortlisted"
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
                        <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-poppins"
                            onClick={() => openModal(applicant)}
                          >
                            Schedule Interview
                          </button>
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
          ) : (
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
                      Schedule Status
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
                  ) : isError ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-2 text-center text-sm font-poppins"
                      >
                        {isError}
                      </td>
                    </tr>
                  ) : scheduledInterviewApplicants &&
                    scheduledInterviewApplicants.length > 0 ? (
                    scheduledInterviewApplicants.map((applicant) => (
                      <tr
                        key={applicant._id || applicant.id}
                        className="border-b border-gray-300"
                      >
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
                              applicant.interview.status === "Scheduled"
                                ? "bg-teal-500"
                                : applicant.interview.status === "Completed"
                                ? "bg-green-500"
                                : applicant.interview.status === "Cancelled"
                                ? "bg-red-500"
                                : applicant.interview.status === "Confirmed"
                                ? "bg-blue-500"
                                : applicant.interview.status === "Declined"
                                ? "bg-gray-500"
                                : "bg-gray-300"
                            }`}
                          >
                            {applicant.interview.status || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
                          {applicant.appliedAt
                            ? new Date(applicant.appliedAt).toLocaleDateString(
                                "en-US"
                              )
                            : "N/A"}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center font-poppins">
                          <div className="flex justify-center space-x-2">
                            <button
                              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 font-poppins"
                              onClick={() => openDetailsModal(applicant)}
                            >
                              View Schedule
                            </button>
                            {applicant.interview.status === "Confirmed" && (
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-poppins"
                                onClick={() => {
                                  setCompleteInterviewApplicant(applicant);
                                  setCompleteInterviewModal(true);
                                }}
                              >
                                Interview Complete
                              </button>
                            )}
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
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center font-poppins">
              Schedule Interview
            </h2>

            {formError && (
              <p className="text-red-500 text-sm text-center mb-3 font-poppins">
                {formError}
              </p>
            )}

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm text-gray-600 font-poppins mb-1">
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="scheduled_time"
                  value={interviewDetails.scheduled_time}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 font-poppins"
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-600 font-poppins mb-1">
                  Interview Type
                </label>
                <select
                  name="interview_type"
                  value={interviewDetails.interview_type}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 font-poppins"
                >
                  <option value="">Select Type</option>
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>

              {interviewDetails.interview_type === "In-Person" && (
                <div className="relative">
                  <label className="block text-sm text-gray-600 font-poppins mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={interviewDetails.location}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 font-poppins"
                  />
                </div>
              )}

              {interviewDetails.interview_type === "Online" && (
                <div className="relative">
                  <label className="block text-sm text-gray-600 font-poppins mb-1">
                    Platform Link
                  </label>
                  <input
                    type="text"
                    name="platformLink"
                    placeholder="Enter platform link (e.g., Zoom)"
                    value={interviewDetails.platformLink}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 font-poppins"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeModal}
                disabled={interviewLoading}
                className={`bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-200 font-poppins shadow-md ${
                  interviewLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={interviewLoading}
                className={`bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all duration-200 font-poppins shadow-md flex items-center justify-center ${
                  interviewLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {interviewLoading ? (
                  <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : null}
                {interviewLoading ? "Confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedApplicant && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center font-poppins">
              📅 Interview Schedule
            </h2>

            <div className="space-y-3 text-gray-700 font-medium text-[15px] font-poppins">
              <p>
                <span className="font-semibold text-gray-900">
                  👤 Applicant:
                </span>{" "}
                {selectedApplicant.applicantName}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  💼 Job Title:
                </span>{" "}
                {selectedApplicant.jobTitle}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  📄 Interview Type:
                </span>{" "}
                {selectedApplicant.interview.interview_type}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  📍{" "}
                  {selectedApplicant.interview.interview_type === "Online"
                    ? "Platform"
                    : "Location"}
                  :
                </span>{" "}
                {selectedApplicant.interview.interview_type === "Online"
                  ? selectedApplicant.interview.platformLink || "Not provided"
                  : selectedApplicant.interview.location || "Not provided"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  ⏰ Scheduled Time:
                </span>
                {selectedApplicant.interview.scheduled_time
                  ? new Date(
                      selectedApplicant.interview.scheduled_time
                    ).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Not set"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">📌 Status:</span>
                <span
                  className={`inline-block px-3 py-1 ml-2 text-white rounded-full font-medium ${
                    selectedApplicant.interview.status === "Confirmed"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  {selectedApplicant.interview.status}
                </span>
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all duration-200 font-poppins w-full"
                onClick={closeDetailsModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {openCompleteInterviewModal && (
        <Modal
          open={openCompleteInterviewModal}
          onClose={() => setCompleteInterviewModal(false)}
        >
          <div className="text-center w-[400px] h-[250px]">
            <div className="rounded-full bg-gray-100 w-12 h-12 mx-auto flex justify-center items-center mb-1">
              <img
                src="completed-task.png"
                alt="completed-task"
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-lg font-semibold mb-4 font-poppins">
              Confirm Interview Completion
            </h2>
            <p className="font-poppins text-center ">
              Are you sure you want to confirm the completion of the interview
              for
              <strong>
                {selectedCompleteInterviewApplicant?.applicantName}
              </strong>
              regarding the position of
              <strong> {selectedCompleteInterviewApplicant?.jobTitle}</strong>?
              Once confirmed, this action cannot be undone.
            </p>
            <div className="mt-4 flex justify-center gap-16">
              <button
                className="px-10 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-800 font-poppins"
                onClick={() => setCompleteInterviewModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-10 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 font-poppins text-sm"
                onClick={handleCompleteInterview}
              >
                Completed
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployerInterviewPage;
