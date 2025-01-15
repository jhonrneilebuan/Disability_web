import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { jobStore } from "../stores/jobStore";
import NavbarEmployer from "../components/NavbarEmployer";
import { BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
const EmployerJobPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const { 
    jobPosts, 
    //isLoading, 
    //error, 
    getEmployerJobs, 
    deleteJobPost } =
    jobStore();

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
    <div className="flex flex-col h-screen overflow-hidden">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Search by Job Title or Applicant Name"
                className="border border-gray-300 px-4 py-2 rounded-l-full w-96 focus:outline-none"
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
          <hr className="" />
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 overflow-y-auto h-[90vh] pb-24">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="card p-4 bg-white shadow-md rounded-lg"
                >
                  <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                  <div className="flex items-center justify-end mt-4">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-800 mr-2"
                      onClick={() => {}}
                    >
                      Show Applicant
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-800 mr-2"
                      onClick={() => {}}
                    >
                      View
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 mr-2"
                      onClick={() => {}}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800"
                      onClick={() => {
                        setSelectedJob(job);
                        setOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No jobs found.</p>
          )}
        </div>

        {open && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p>
                Are you sure you want to delete the job &quot;{selectedJob?.jobTitle}
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
