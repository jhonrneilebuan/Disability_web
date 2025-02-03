import { Bookmark, Briefcase, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import FormatTimeDate from "../components/FormatTimeDate";
import Loader2 from "../components/Loader";
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

  const {
    applications = [],
    savedApplications = [],
    withdrawApplication,
    isLoading,
    //error,
    getSavedJobs,
    savedJobs = [],
    unsaveJob,
    getApplicationsByApplicant,
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
        : '';
  
      const status = application.status ? application.status.toLowerCase() : '';
  
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

  if (isLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Loader2 />
      </main>
    );
  }

  // TODO: Implement error state later :>

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="bg-applicant-bg-3 bg-transparent bg-no-repeat bg-cover bg-center flex-grow flex flex-col space-y-4 pt-8 h-screen">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center font-poppins text-white pt-36 pb-7 text-shadow-xl">
          MY JOB APPLICATIONS
        </h1>

        <div className="flex flex-col items-center mx-auto space-y-6 min-w-full">
          <div className="bg-semiTransparent rounded-3xl shadow-custom overflow-hidden p-6 max-w-4xl w-full mx-auto">
            <div className="relative">
              <input
                placeholder="Search by job titles or keywords..."
                className="px-10 py-2 rounded-md w-full text-black text-opacity-70 placeholder-black placeholder-opacity-50 bg-browny border-none font-poppins focus:outline-none focus:ring-1 focus:ring-darkBrowny"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                <Search size={20} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start w-full max-w-4xl space-x-4 mt-4">
            <div className="relative w-full sm:w-auto">
              <select
                className="px-4 py-3 text-black text-opacity-70 font-light bg-transparent rounded-2xl border-2 border-solid border-browny font-poppins w-full"
                onChange={handleStatusFilter}
                value={selectedStatus}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                className="px-4 py-3 text-black text-opacity-70 font-light bg-transparent rounded-2xl border-2 border-solid border-browny font-poppins w-full"
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
        {activeTab === "applied" ? (
          sortedApplications.length > 0 ? (
            sortedApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between mb-6 border-2 border-browny border-solid w-full overflow-auto"
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
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {application.status}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDetails(application)}
                    className="px-4 py-2 text-sm sm:text-base bg-browny text-white rounded-md"
                  >
                    View Details
                  </button>
                  {application.status !== "Rejected" && (
                    <button
                      onClick={() => handleWithdraw(application._id)}
                      className="px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-md"
                    >
                      Withdraw Application
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg sm:text-xl font-poppins text-center text-gray-500">
              No applications found.
            </p>
          )
        ) : filteredSavedJobs.length > 0 ? (
          filteredSavedJobs.map((savedJob) => (
            <div
              key={savedJob._id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between mb-6 border-2 border-browny border-solid w-full overflow-auto"
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
                  className="px-4 py-2 text-sm sm:text-base bg-browny text-white rounded-md"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleUnsave(savedJob._id)}
                  className="px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-md"
                >
                  Unsave Job
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg sm:text-xl font-poppins text-center text-gray-500">
            No saved jobs found.
          </p>
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
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Unsave</h2>
              <p>
                Are you sure you want to remove this job from your saved jobs?
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-800"
                  onClick={() => setUnsaveModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800"
                  onClick={confirmUnsave}
                >
                  Unsave
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
                    {selectedApplication.jobId?.locations?.join(", ") ||
                      "Not specified"}
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
                    {selectedApplication.jobId?.preferredLanguage || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Qualifications:</strong>{" "}
                    {selectedApplication.jobId?.jobQualifications || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Experience:</strong>{" "}
                    {selectedApplication.jobId?.jobExperience || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Skills:</strong>{" "}
                    {selectedApplication.jobId?.jobSkills?.join(", ") || "N/A"}
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
