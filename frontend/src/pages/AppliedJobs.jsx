import {
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Link,
  MapPin,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppliedJobSkeleton from "../components/AppliedJobSkeleton";
import Footer from "../components/Footer";
import FormatTimeDate from "../components/FormatTimeDate";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { jobStore } from "../stores/jobStore";

const AppliedJobs = () => {
  const [open, setOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [unsaveModalOpen, setUnsaveModalOpen] = useState(false);
  const [detailsModalOpen, setdetailsModalOpen] = useState(false);
  const [selectedSavedJob, setSelectedSavedJob] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("applied");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  const {
    applications = [],
    savedApplications = [],
    withdrawApplication,
    isLoading,
    error,
    isError,
    confirmApplication,
    declineApplication,
    getSavedJobs,
    savedJobs = [],
    unsaveJob,
    getApplicationsByApplicant,
    isApplicationLoading,
  } = jobStore();

  useEffect(() => {
    getApplicationsByApplicant();
    getSavedJobs();
  }, [getApplicationsByApplicant, getSavedJobs]);

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleDateSort = (e) => {
    setSelectedDate(e.target.value);
  };

  const filterApplications = (applications) => {
    return applications.filter((application) => {
      const jobTitle = application.jobId?.jobTitle
        ? application.jobId.jobTitle.toLowerCase()
        : "";

      const status = application.status ? application.status.toLowerCase() : "";

      const matchesKeyword =
        jobTitle.includes(searchKeyword.toLowerCase()) ||
        status.includes(searchKeyword.toLowerCase());

      const matchesStatus = selectedStatus
        ? status === selectedStatus.toLowerCase()
        : true;

      const matchesDate = selectedDate
        ? new Date(application.createdAt).toDateString() ===
          new Date(selectedDate).toDateString()
        : true;

      return matchesKeyword && matchesStatus && matchesDate;
    });
  };

  const filteredApplications =
    activeTab === "applied"
      ? filterApplications(applications)
      : filterApplications(savedApplications);

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (selectedDate === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (selectedDate === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  const filteredSavedJobs = savedJobs.filter((savedJob) =>
    savedJob.jobId?.jobTitle.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleWithdraw = (applicationId) => {
    setSelectedApplication(applicationId);
    setOpen(true);
  };

  const handleUnsave = (savedJobId) => {
    setSelectedSavedJob(savedJobId);
    setUnsaveModalOpen(true);
  };

  const handleDetails = (application) => {
    setSelectedApplication(application);
    setdetailsModalOpen(true);
  };

  const confirmWithdraw = async () => {
    try {
      await withdrawApplication(selectedApplication);
    } catch (error) {
      console.error("Error withdrawing application:", error);
    } finally {
      setOpen(false);
      setSelectedApplication(null);
    }
  };

  const confirmUnsave = async () => {
    try {
      await unsaveJob(selectedSavedJob);
      toast.success("Job removed from saved successfully.");
    } catch (error) {
      console.error("Error unsaving job:", error);
      toast.error("Failed to remove saved job.");
    } finally {
      setUnsaveModalOpen(false);
      setSelectedSavedJob(null);
    }
  };

  const openModal = (application) => {
    setCurrentApplication(application);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!currentApplication) {
      console.error("No application selected");
      return;
    }

    try {
      await confirmApplication(currentApplication._id || currentApplication.id);
      toast.success("Interview confirmed successfully.");
      await getApplicationsByApplicant();
      setShowModal(false);
    } catch (error) {
      console.error("Error confirming interview schedule:", error);
      toast.error("Failed to confirm interview.");
    }
  };

  const handleDecline = async () => {
    if (!currentApplication) {
      console.error("No application selected");
      return;
    }

    try {
      await declineApplication(currentApplication._id || currentApplication.id);
      toast.success("Interview declined successfully.");
      await getApplicationsByApplicant();
      setShowModal(false);
    } catch (error) {
      console.error("Error declining interview schedule:", error);
      toast.error("Failed to decline interview.");
    }
  };

  const toPascalCase = (input) => {
    const str = typeof input === "string" ? input : String(input || "");
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
      .replace(/^[a-z]/, (char) => char.toUpperCase())
      .replace(/([A-Z])/g, " $1")
      .trim();
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-start pt-32 bg-applicant-nbg-6 bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="text-6xl font-semibold text-center font-poppins text-white pb-7 text-shadow-xl">
            My Job Applications
          </h1>

          <div className="flex flex-col items-center mx-auto space-y-6 min-w-full">
            <div className="bg-semiTransparent rounded-3xl shadow-custom overflow-hidden p-6 max-w-4xl w-full mx-auto">
              <div className="relative">
                <input
                  placeholder="Search by job titles or keywords..."
                  className="px-10 py-2 rounded-md w-full text-browny text-opacity-70 placeholder-black placeholder-opacity-50 bg-lightBrown border-none font-poppins focus:outline-none focus:ring-1 focus:ring-darkBrowny"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                  <Search size={20} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full max-w-4xl space-x-4 mt-4">
              <div className="relative w-full sm:w-auto">
                <select
                  className="px-4 py-3 text-black font-light bg-lightBrown rounded-2xl border-2 border-solid border-browny font-poppins w-full"
                  onChange={handleStatusFilter}
                  value={selectedStatus}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Interview Scheduled">
                    Interview Scheduled
                  </option>
                  <option value="Interview Completed">
                    Interview Completed
                  </option>
                  <option value="Hired">Hired</option>
                </select>
              </div>

              <div className="relative w-full sm:w-auto">
                <select
                  className="px-4 py-3 text-black font-light bg-lightBrown rounded-2xl border-2 border-solid border-browny font-poppins w-full"
                  onChange={handleDateSort}
                  value={selectedDate}
                >
                  <option value="">Sort by Date</option>
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto p-6 max-w-4xl overflow-auto">
        <h3 className="font-medium font-poppins text-3xl sm:text-4xl my-6">
          Activity
        </h3>
        <div className="flex space-x-4 mb-10">
          <button
            className={`py-2 font-poppins text-xl sm:text-2xl flex items-center space-x-2 ${
              activeTab === "applied"
                ? "underline underline-offset-8 text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("applied")}
          >
            <Briefcase size={24} />
            <span>Applied Jobs</span>
          </button>
          <button
            className={`py-2 font-poppins text-xl sm:text-2xl flex items-center space-x-2 ${
              activeTab === "saved"
                ? "underline underline-offset-8 text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark size={24} />
            <span>Saved Jobs</span>
          </button>
        </div>
        {activeTab === "applied" && (
          <>
            {isApplicationLoading ? (
              <AppliedJobSkeleton rows={5} />
            ) : isError ? (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {isError}
              </p>
            ) : sortedApplications.length > 0 ? (
              sortedApplications.map((application) => (
                <div
                  key={application._id}
                  className="bg-white rounded-2xl border mt-3 border-gray-200 shadow-md  p-6 flex flex-col justify-between mb-6 border-solid w-full overflow-auto"
                >
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-base font-poppins mb-2">
                      Job Title: {application.jobId?.jobTitle}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="text-lg sm:text-xl font-base font-poppins">
                        Date Applied:
                      </p>
                      <p className="text-lg sm:text-xl font-base font-poppins">
                        <FormatTimeDate
                          date={application.createdAt}
                          formatType="relative"
                        />
                      </p>
                    </div>
                    <p className="text-lg sm:text-xl font-base font-poppins mb-4">
                      Status:{" "}
                      <span
                        className={`${
                          application.status === "Pending"
                            ? "text-orange-500"
                            : application.status === "Shortlisted"
                            ? "text-blue-500"
                            : application.status === "Rejected"
                            ? "text-red-500"
                            : application.status === "Interview Scheduled"
                            ? "text-purple-500"
                            : application.status === "Interview Completed"
                            ? "text-teal-500"
                            : application.status === "Hired"
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      >
                        {application.status}
                      </span>
                    </p>

                    {showModal && currentApplication && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                        <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
                          <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-black hover:text-gray-600 transition"
                          >
                            <XCircle className="w-6 h-6" />
                          </button>
                          <h4 className="text-4xl font-bold text-browny mb-8 text-center font-poppins">
                            Interview Details
                          </h4>
                          <div className="space-y-6 font-poppins text-black">
                            <p className="text-lg flex items-center">
                              <CheckCircle className="w-5 h-5 text-browny mr-2" />
                              <span className="font-semibold">Type:</span>{" "}
                              {currentApplication.interview.interview_type ||
                                "Not specified"}
                            </p>

                            <p className="text-lg flex items-center">
                              <Calendar className="w-5 h-5 text-browny mr-2" />
                              <span className="font-semibold">Date:</span>{" "}
                              {currentApplication.interview.scheduled_time
                                ? new Date(
                                    currentApplication.interview.scheduled_time
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "Not set"}
                            </p>

                            <p className="text-lg flex items-center mt-2">
                              <Clock className="w-5 h-5 text-browny mr-2" />
                              <span className="font-semibold">Time:</span>{" "}
                              {currentApplication.interview.scheduled_time
                                ? new Date(
                                    currentApplication.interview.scheduled_time
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                : "Not set"}
                            </p>

                            {currentApplication.interview.interview_type ===
                            "In-Person" ? (
                              <p className="text-lg flex items-center">
                                <MapPin className="w-5 h-5 text-browny mr-2" />
                                <span className="font-semibold">
                                  Location:
                                </span>{" "}
                                {currentApplication.interview.location ||
                                  "To be announced"}
                              </p>
                            ) : (
                              currentApplication.interview.interview_type ===
                                "Online" && (
                                <p className="text-lg flex items-center">
                                  <Link className="w-5 h-5 text-browny mr-2" />
                                  <span className="font-semibold">
                                    Platform Link:
                                  </span>{" "}
                                  {currentApplication.interview.platformLink ||
                                    "To be announced"}
                                </p>
                              )
                            )}
                          </div>

                          {currentApplication.interview.status ===
                            "Scheduled" && (
                            <div className="flex justify-end space-x-4 mt-8">
                              <button
                                onClick={handleConfirm}
                                className="px-6 py-3 w-full bg-green-600 text-white text-lg rounded-md shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={handleDecline}
                                className="px-6 py-3 w-full bg-red-600 text-white text-lg rounded-md shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                    <button
                      onClick={() => handleDetails(application)}
                      className="px-6 py-3 text-base font-poppins bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                      View Details
                    </button>

                    {application.status !== "Rejected" &&
                      application.status !== "Hired" && (
                        <button
                          onClick={() => handleWithdraw(application._id)}
                          className="px-6 py-3 text-base font-poppins bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                        >
                          Withdraw Application
                        </button>
                      )}

                    {(application.status === "Interview Scheduled" ||
                      application.status === "Interview Completed") &&
                      application.interview && (
                        <button
                          onClick={() => openModal(application)}
                          className="px-6 py-3 text-base font-poppins bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                        >
                          View Interview Details
                        </button>
                      )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg sm:text-xl font-poppins text-center text-gray-500">
                No applications found.
              </p>
            )}
          </>
        )}

        {activeTab === "saved" && (
          <>
            {isLoading ? (
              <AppliedJobSkeleton rows={5} />
            ) : error ? (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {error}
              </p>
            ) : filteredSavedJobs.length > 0 ? (
              filteredSavedJobs.map((savedJob) => (
                <div
                  key={savedJob._id}
                  className="bg-white rounded-2xl border mt-3 border-gray-200 shadow-md p-6 flex flex-col justify-between mb-6 border-solid w-full overflow-auto"
                >
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-base font-poppins mb-2">
                      Job Title: {savedJob.jobId?.jobTitle}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="text-lg sm:text-xl font-base font-poppins">
                        Date Saved:
                      </p>
                      <p className="text-lg sm:text-xl font-base font-poppins">
                        <FormatTimeDate
                          date={savedJob.createdAt}
                          formatType="relative"
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDetails(savedJob)}
                      className="px-4 py-2 text-sm sm:text-base bg-browny text-white rounded-md font-poppins"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUnsave(savedJob._id)}
                      className="px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-md font-poppins"
                    >
                      Remove Favorite{" "}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg sm:text-xl font-poppins text-center text-gray-500">
                No saved jobs found.
              </p>
            )}
          </>
        )}

        {open && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Withdrawal</h2>
              <p>
                Are you sure you want to withdraw your application for this job?
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800"
                  onClick={confirmWithdraw}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </Modal>
        )}
        {unsaveModalOpen && (
          <Modal
            open={unsaveModalOpen}
            onClose={() => setUnsaveModalOpen(false)}
          >
            <div className="text-center font-poppins">
              <h2 className="text-lg font-semibold mb-4">Remove Saved Job</h2>
              <p className="text-gray-600">
                Are you sure you want to remove this job from your saved list? <br/>
                You won’t be able to access it later.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-800 transition duration-200"
                  onClick={() => setUnsaveModalOpen(false)}
                >
                  Keep Saved
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 transition duration-200"
                  onClick={confirmUnsave}
                >
                  Remove
                </button>
              </div>
            </div>
          </Modal>
        )}
        {detailsModalOpen && selectedApplication && (
          <Modal
            open={detailsModalOpen}
            onClose={() => setdetailsModalOpen(false)}
          >
            <div className=" p-6 max-w-3xl mx-auto relative font-poppins">
              <X
                onClick={() => setdetailsModalOpen(false)}
                className="absolute top-1 right-1 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full focus:outline-none"
              />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {selectedApplication.jobId?.jobTitle || "No Job Title"}
                  </h2>
                  <p className="text-gray-600">
                    <strong>Company:</strong>{" "}
                    {selectedApplication.jobId?.companyName || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Location(s):</strong>{" "}
                    {selectedApplication.jobId?.locations
                      ?.map((location) => location.replace(/['"]+/g, ""))
                      .join(", ") || "Not specified"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-black">
                    {selectedApplication.jobId?.expectedSalary
                      ? `₱${selectedApplication.jobId.expectedSalary.minSalary.toLocaleString()} - ₱${selectedApplication.jobId.expectedSalary.maxSalary.toLocaleString()}`
                      : "Salary not specified"}
                  </p>
                </div>
              </div>
              <hr className="mb-6" />

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="mb-2">
                    <strong>Job Type:</strong>{" "}
                    {selectedApplication.jobId?.jobType || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Shift:</strong>{" "}
                    {selectedApplication.jobId?.jobShift || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Level:</strong>{" "}
                    {selectedApplication.jobId?.jobLevel || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Preferred Language:</strong>{" "}
                    {Array.isArray(
                      selectedApplication.jobId?.preferredLanguages
                    ) &&
                    selectedApplication.jobId?.preferredLanguages.length > 0
                      ? selectedApplication.jobId.preferredLanguages.join(", ")
                      : "N/A"}
                  </p>

                  <p className="mb-2">
                    <strong>Qualifications:</strong>{" "}
                    {selectedApplication.jobId?.jobQualifications || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Skills:</strong>{" "}
                    {Array.isArray(selectedApplication.jobId?.jobSkills) &&
                    selectedApplication.jobId.jobSkills.length > 0
                      ? selectedApplication.jobId.jobSkills
                          .map((skill) =>
                            toPascalCase(
                              String(skill)
                                .replace(/[[\]"]/g, "")
                                .trim()
                            )
                          )
                          .filter((skill) => skill !== "")
                          .join(", ")
                      : "N/A"}
                  </p>

                  <p className="mb-4">
                    <strong>Job Description:</strong>{" "}
                    {selectedApplication.jobId?.jobDescription ||
                      "No description available"}
                  </p>
                  <p className="mb-4">
                    <strong>Application Status:</strong>{" "}
                    {selectedApplication.status || "N/A"}
                  </p>
                  <p className="mb-4">
                    <strong>Date Applied:</strong>{" "}
                    <FormatTimeDate
                      date={selectedApplication.createdAt}
                      formatType="date"
                    />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center mb-6">
                <p className="font-semibold text-gray-800">Attachments:</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedApplication.resume || "#"}
                    download="Resume"
                    className="px-4 py-2 underline text-blue-900 hover:text-zinc-950 underline-offset-8 "
                  >
                    Download Resume
                  </a>
                  {selectedApplication.additionalFiles?.map((file, index) => (
                    <a
                      key={index}
                      href={file}
                      download={`File_${index + 1}`}
                      className="px-4 py-2 underline text-blue-900 hover:text-zinc-950 underline-offset-8 "
                    >
                      Download File {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default AppliedJobs;
