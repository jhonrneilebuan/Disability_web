import { BriefcaseBusiness, Calendar, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FormatTimeDate from "../components/FormatTimeDate";
import Modal from "../components/Modal";
import NavbarEmployer from "../components/NavbarEmployer";
import Sidebar from "../components/Sidebar";
import { jobStore } from "../stores/jobStore";

const EmployerJobPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (jobId) => {
    if (isDropdownOpen === jobId) {
      setIsDropdownOpen(null);
    } else {
      setIsDropdownOpen(jobId);
    }
  };

  const {
    jobPosts,
    //isLoading,
    //error,
    getEmployerJobs,
    deleteJobPost,
  } = jobStore();

  useEffect(() => {
    getEmployerJobs();
  }, [getEmployerJobs]);

  useEffect(() => {
    if (searchQuery === "") {
      setIsSearchSubmitted(false);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    setIsSearchSubmitted(true);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredJobs = jobPosts.filter((job) => {
    if (isSearchSubmitted) {
      return job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleDeleteJob = async () => {
    if (!selectedJob) return;
    try {
      await deleteJobPost(selectedJob._id);
      console.log("Job deleted successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex w-2/3">
              <input
                type="text"
                placeholder="Search by Job Title or Applicant Name"
                className="border border-gray-300 px-4 py-2 rounded-l-full w-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleEnterKey}
              />
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-r-full hover:bg-gray-900"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <Link
              to="/employer/job-post"
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
            >
              <BriefcaseBusiness className="w-4 h-4 me-2" />
              Post a job
            </Link>
          </div>
          <hr />
          <div className="overflow-y-auto max-h-[80vh] pb-5">
            {filteredJobs.length > 0 ? (
              [...filteredJobs].reverse().map((job) => (
                <div
                  key={job._id}
                  className="p-4 bg-white shadow-md m-2 relative"
                >
                  <h3 className="text-2xl font-semibold font-poppins">
                    {job.jobTitle}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 font-poppins font-semibold">
                      {job.employer.fullName || "N/A"} |{" "}
                      {job.companyName || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <BriefcaseBusiness
                          className="h-5 w-5 font-poppins font-semibold mr-2"
                          strokeWidth={3}
                        />
                        <span className="text-sm">
                          <span className="text-blue-500 text-normal font-poppins font-semibold mr-1">
                            {job.totalApplicants || 0}
                          </span>
                          <span className="text-black text-normal font-poppins font-semibold">
                            {" "}
                            applicants
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-1" strokeWidth={3} />
                        <span className="text-sm text-blue-500 text-normal font-poppins font-semibold">
                          <FormatTimeDate
                            date={job.createdAt}
                            formatType="relative"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 px-2 py-1 border border-gray-200 bg-gray-200 rounded-full mr-2 font-poppins font-semibold">
                        {job.jobCategory || "N/A"}
                      </span>
                      <span className="text-sm text-gray-600 px-2 py-1 border border-gray-200 bg-gray-200 rounded-full mr-2 font-poppins font-semibold">
                        {job.preferredLanguage || "N/A"}
                      </span>
                      <span className="text-sm text-gray-600 px-2 py-1 border border-gray-200 bg-gray-200  rounded-full mr-2 font-poppins font-semibold">
                        {job.jobType || "N/A"}
                      </span>
                      <span className="text-sm text-gray-600 px-2 py-1 border border-gray-200 bg-gray-200  rounded-full font-poppins font-semibold">
                        {job.jobLevel || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        className="p-2 text-gray-700 hover:bg-gray-200 rounded-full"
                        onClick={() => toggleDropdown(job._id)}
                      >
                        <div className="rounded-2xl border border-1 border-gray py-2 px-2">
                          <MoreHorizontal className="h-5 w-5 text-blue-500" />
                        </div>
                      </button>
                      {isDropdownOpen === job._id && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-28 z-10 font-poppins font-semibold">
                          <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => {}}
                          >
                            View
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => {}}
                          >
                            Update
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                            onClick={() => {
                              setSelectedJob(job);
                              setOpen(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center font-poppins ">No jobs found.</p>
            )}
          </div>
        </div>

        {open && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p>
                Are you sure you want to delete the job &quot;
                {selectedJob?.jobTitle}
                &quot;?
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
                  onClick={handleDeleteJob}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default EmployerJobPage;
