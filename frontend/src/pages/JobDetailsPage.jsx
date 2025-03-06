import {
  Accessibility,
  Banknote,
  Clock3,
  Download,
  Link,
  Loader,
  MapPinned,
  Undo2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormatTimeDate from "../components/FormatTimeDate";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";
import { jobStore } from "../stores/jobStore";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { getJobById, jobDetails, applyJobs, isLoading, error, jobpostError } =
    jobStore();
  const { user } = authStore();
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (jobId) {
      getJobById(jobId);
    }
  }, [jobId, getJobById]);

  const validateForm = (coverLetter, resume) => {
    const errors = {};

    if (!coverLetter || !coverLetter.trim()) {
      errors.coverLetter = "Cover letter is required.";
    } else if (coverLetter.trim().length < 20) {
      errors.coverLetter = "Cover letter must be at least 50 characters.";
    }
    if (!resume || (resume && resume.size === 0)) {
      errors.resume = "Resume is required.";
    }
    return errors;
  };

  if (!jobDetails) {
    return <div>Job details not found.</div>;
  }

  const handleApplyModal = () => {
    setOpen(true);
  };

  const handleApply = async (event) => {
    event.preventDefault();

    if (!jobDetails?._id) {
      alert("Job ID is missing. Please select a job and try again.");
      return;
    }

    const formData = new FormData(event.target);
    const coverLetter = formData.get("coverLetter");
    const accessibilityNeeds = formData.get("accessibilityNeeds");
    const resume = formData.get("resume");
    const additionalFiles = formData.getAll("additionalFiles");

    const errors = validateForm(coverLetter, resume);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

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
        alert("There was an error submitting your application. Please try again.");
      }
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

  const cleanJobSkills = jobDetails?.jobSkills
    .map((skill) => skill.replace(/[[\]"]/g, "").trim())
    .filter((skill) => skill !== "")
    .join(", ");

  return (
    <main className="min-h-screen mb-5 bg-gray-100">
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-black py-4 px-4 font-poppins"
      >
        <Undo2 className="w-5 h-5 mr-2" />
        Go Back
      </button>
      <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {jobpostError && (
          <p className="text-red-500 text-lg font-semibold text-center">{jobpostError}</p>
        )}
        {!jobDetails ? (
          <p className="text-gray-500 text-lg">No job details available.</p>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold font-poppins">
              {jobDetails?.jobTitle}
            </h2>
            <p className="text-2xl font-normal mt-2 font-poppins">
              {jobDetails?.employer?.fullName || "Employer Name"}/
              {jobDetails?.companyName ||
                jobDetails?.employer?.companyName ||
                "Company Name"}
            </p>

            {jobDetails?.locations?.length > 0 && (
              <div className="flex items-center space-x-2 mt-4">
                <MapPinned className="h-5 w-5 text-gray-500" />
                <p className="text-xl font-normal font-poppins">
                  {jobDetails.locations.join(", ").replace(/[\\[\]"]+/g, "")}
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2 mt-4">
              <Clock3 className="h-5 w-5 text-gray-500" />
              <p className="text-xl font-normal font-poppins">
                {jobDetails?.jobType}
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Accessibility className="h-5 w-5 text-gray-500" />
              <p className="text-xl font-normal font-poppins">
                {Array.isArray(jobDetails?.preferredDisabilities) &&
                jobDetails.preferredDisabilities.length > 0
                  ? jobDetails.preferredDisabilities.join(", ")
                  : "Not specified"}
              </p>
            </div>

            {jobDetails?.expectedSalary?.minSalary &&
            jobDetails?.expectedSalary?.maxSalary ? (
              <div className="flex items-center space-x-2 mt-4">
                <Banknote className="h-5 w-5 text-gray-500" />
                <p className="text-xl font-normal font-poppins">
                  ₱{jobDetails?.expectedSalary?.minSalary?.toLocaleString()} - ₱
                  {jobDetails?.expectedSalary?.maxSalary?.toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="flex items-center space-x-2 mt-4">
                <Banknote className="h-5 w-5 text-gray-500" />
                <p className="text-lg font-semibold font-poppins">
                  Salary information not available
                </p>
              </div>
            )}

            <div className="mt-4 text-sm flex items-center space-x-2">
              <span>Posted</span>
              <FormatTimeDate
                date={jobDetails?.createdAt}
                formatType="relative"
              />
            </div>

            <div className="flex space-x-7 mt-6">
              <button
                className={`px-24 py-3 rounded font-poppins font-semibold transition-all ${
                  user.disabilityInformation.isIdVerified
                    ? "bg-buttonBlue text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (user.disabilityInformation.isIdVerified) {
                    handleApplyModal();
                  }
                }}
                disabled={!user.disabilityInformation.isIdVerified}
              >
                {user.disabilityInformation.isIdVerified
                  ? "Apply"
                  : "Upload ID First"}
              </button>
            </div>

            <div className="mt-8">
              <ul className="space-y-4 font-poppins">
                <li className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Application Deadline:</p>
                    <span className="text-lg">
                      {jobDetails?.applicationDeadline
                        ? new Date(
                            jobDetails?.applicationDeadline
                          ).toLocaleDateString()
                        : "Not available"}
                    </span>
                  </div>
                </li>

                <li className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Job Qualifications:</p>
                    <span className="text-lg">
                      {jobDetails?.jobQualifications || "Not specified"}
                    </span>
                  </div>
                </li>

                <li className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Job Shift:</p>
                    <span className="text-lg">
                      {jobDetails?.jobShift || "Not specified"}
                    </span>
                  </div>
                </li>

                <li className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-base font-medium">Preferred Language:</p>
                    <span className="text-base">
                      {Array.isArray(jobDetails?.preferredLanguages) &&
                      jobDetails?.preferredLanguages.length > 0
                        ? jobDetails?.preferredLanguages.join(", ")
                        : "Not specified"}
                    </span>
                  </div>
                </li>

                <li className="border-b pb-4">
                  <div>
                    <p className="text-lg font-medium mb-2">Job Skills:</p>
                    <ul className="flex flex-wrap gap-2">
                      {cleanJobSkills ? (
                        cleanJobSkills.split(",").map((skill, index) => (
                          <li
                            key={index}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-poppins font-semibold"
                          >
                            {toPascalCase(skill.trim())}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No Skills Specified</li>
                      )}
                    </ul>
                  </div>
                </li>

                <li className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <p className="text-base flex-shrink-0 font-medium pr-10">
                      Job Attachment:
                    </p>
                    <div className="p-4 border border-gray-300 rounded-lg flex items-center flex-1">
                      {jobDetails?.jobAttachment ? (
                        <div className="flex items-center w-full">
                          <a
                            href={jobDetails?.jobAttachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline flex items-center"
                          >
                            <Link size={20} className="mr-2" />
                            View Attachment
                          </a>
                          <a
                            href={jobDetails?.jobAttachment}
                            download
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center ml-auto"
                          >
                            <Download size={20} className="mr-2" />
                            Download
                          </a>
                        </div>
                      ) : (
                        <p className="text-gray-500">No attachment available</p>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
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

            {error && (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {error}
              </p>
            )}

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
                  placeholder="Write your cover letter here..."
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
                {formErrors.coverLetter && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.coverLetter}
                  </p>
                )}
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
                  className="block w-full mt-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none"
                />
                {formErrors.resume && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.resume}
                  </p>
                )}
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
