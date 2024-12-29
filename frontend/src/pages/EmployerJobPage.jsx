import Sidebar from "../components/SideBar";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { jobStore } from "../stores/jobStore";

const EmployerJobPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const { jobPosts, isLoading, error, getEmployerJobs, deleteJobPost } =
    jobStore();

  useEffect(() => {
    getEmployerJobs();
  }, [getEmployerJobs]);

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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {jobPosts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {jobPosts.map((job) => (
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
              Are you sure you want to delete the job "{selectedJob?.jobTitle}"?
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
  );
};

export default EmployerJobPage;
