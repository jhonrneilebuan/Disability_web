import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Undo2, MapPinned, Clock3, Banknote, X, Loader } from "lucide-react";
import { jobStore } from "../stores/jobStore";
import FormatTimeDate from "../components/FormatTimeDate";
import Modal from "../components/Modal";


const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { getJobById, jobDetails, applyJobs, isLoading, error } = jobStore();

  useEffect(() => {
    if (jobId) {
      getJobById(jobId);
    }
  }, [jobId, getJobById]);

  //TODO: Update the error state UI
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobDetails) {
    return <div>Job details not found.</div>;
  }

  const handleApplyModal = () => {
    setOpen(true);
  };

  const handleApply = async (event) => {
    event.preventDefault();

    if (!jobId) {
      alert("Job ID is missing. Please select a job and try again.");
      return;
    }

    const formData = new FormData(event.target);
    const coverLetter = formData.get("coverLetter");
    const accessibilityNeeds = formData.get("accessibilityNeeds");
    const resume = formData.get("resume");
    const additionalFiles = formData.getAll("additionalFiles");

    try {
      console.log("Submitting job application with data:", {
        jobId: jobDetails._id,
        coverLetter,
        accessibilityNeeds,
        resume,
        additionalFiles,
      });

      await applyJobs({
        jobId: jobDetails._id,
        coverLetter,
        accessibilityNeeds,
        resume,
        additionalFiles,
      });

      setOpen(false);
    } catch (error) {
      if (error.message === "You have already applied for this job.") {
        alert(error.message);
        setOpen(false);
      } else {
        console.error("Error submitting application:", error);
        alert(
          "There was an error submitting your application. Please try again."
        );
      }
    }
  };

  return (
    <main className="min-h-screen mb-5">
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-black py-4 px-4"
      >
        <Undo2 className="w-5 h-5 mr-2" />
        Go Back
      </button>
      <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-4xl font-extrabold">{jobDetails?.jobTitle}</h2>
        <p className="text-2xl font-normal mt-2">
          {jobDetails?.employer?.fullName || "Employer Name"}/
          {jobDetails?.companyName ||
            jobDetails?.employer?.companyName ||
            "Company Name"}
        </p>

        {jobDetails?.locations?.length > 0 && (
          <div className="flex items-center space-x-2 mt-4">
            <MapPinned className="h-5 w-5 text-gray-500" />
            <p className="text-xl font-normal">
              {jobDetails?.locations.join(", ")}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2 mt-4">
          <Clock3 className="h-5 w-5 text-gray-500" />
          <p className="text-xl font-normal">{jobDetails?.jobType}</p>
        </div>

        {jobDetails?.expectedSalary?.minSalary &&
        jobDetails?.expectedSalary?.maxSalary ? (
          <div className="flex items-center space-x-2 mt-4">
            <Banknote className="h-5 w-5 text-gray-500" />
            <p className="text-xl font-normal">
              ₱{jobDetails?.expectedSalary?.minSalary?.toLocaleString()} - ₱
              {jobDetails?.expectedSalary?.maxSalary?.toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-2 mt-4">
            <Banknote className="h-5 w-5 text-gray-500" />
            <p className="text-lg font-semibold">
              Salary information not available
            </p>
          </div>
        )}

        <div className="mt-4 text-sm flex items-center space-x-2">
          <span>Posted</span>
          <FormatTimeDate date={jobDetails?.createdAt} formatType="relative" />
        </div>

        <div className="flex space-x-7 mt-6">
          <button
            className="px-24 py-3 bg-buttonBlue text-white rounded font-poppins font-semibold"
            onClick={handleApplyModal}
          >
            Apply
          </button>
        </div>

        <div className="mt-8">
          <ul className="space-y-4">
            <li>
              <p className="text-lg">Application Deadline:</p>
              <ul className="list-disc pl-6 text-lg">
                <li>
                  {jobDetails?.applicationDeadline
                    ? new Date(
                        jobDetails?.applicationDeadline
                      ).toLocaleDateString()
                    : "Not available"}
                </li>
              </ul>
            </li>
            <li>
              <p className="text-lg">Job Qualifications:</p>
              <ul className="list-disc pl-6 text-lg">
                <li>{jobDetails?.jobQualifications || "Not specified"}</li>
              </ul>
            </li>
            <li>
              <p className="text-lg">Job Experience:</p>
              <ul className="list-disc pl-6 text-lg">
                <li>{jobDetails?.jobExperience || "Not specified"}</li>
              </ul>
            </li>
            <li>
              <p className="text-lg">Preferred Language:</p>
              <ul className="list-disc pl-6 text-lg">
                <li>{jobDetails?.preferredLanguage || "Not specified"}</li>
              </ul>
            </li>
            <li>
              <p className="text-lg">Job Skills:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                {jobDetails?.jobSkills?.length > 0 ? (
                  jobDetails?.jobSkills.map((skill, index) => (
                    <li key={index} className="text-lg text-black">
                      {skill}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No skills listed.</li>
                )}
              </ul>
            </li>
            <li>
              <p className="text-lg">Job Attachment:</p>
              <ul className="list-disc pl-6 text-lg">
                <li>
                  {jobDetails?.jobAttachment ? (
                    <a
                      href={jobDetails?.jobAttachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View Attachment
                    </a>
                  ) : (
                    "No attachment provided"
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
      {open && jobDetails && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="p-6 w-[90vh] mx-auto relative font-poppins">
            <X
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-gray-300 hover:bg-red-500 text-black w-7 h-7 p-2 rounded-full focus:outline-none cursor-pointer"
            />

            <h2 className="text-xl font-semibold text-black mb-4 font-poppins">
              Apply for : {jobDetails.jobTitle}
            </h2>

            <form
              onSubmit={handleApply}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="5"
                  required
                  placeholder="Write your cover letter here..."
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="accessibilityNeeds"
                  className="block text-sm font-medium text-gray-700"
                >
                  Accessibility Needs
                </label>
                <textarea
                  id="accessibilityNeeds"
                  name="accessibilityNeeds"
                  rows="3"
                  placeholder="Specify any accessibility accommodations required..."
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resume <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="additionalFiles"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Files (Optional)
                </label>
                <input
                  type="file"
                  id="additionalFiles"
                  name="additionalFiles"
                  multiple
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-blue-300 flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-6 h-6 animate-spin" />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default JobDetailsPage;
