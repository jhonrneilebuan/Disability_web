import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { jobStore } from "../stores/jobStore";
import { MapPinned, Banknote, XCircle, Clock3, X, Loader } from "lucide-react";
import SearchBar from "../components/Search";
import FormatTimeDate from "../components/FormatTimeDate";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const JobsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedJobShift, setSelectedJobShift] = useState("listedAnyTime");
  const [selectedJobType, setselectedJobType] = useState("All work types");
  const {
    getJobPosts,
    jobPosts,
    isLoading,
    error,
    saveJob,
    applyJobs,
    getSavedJobs,
    savedJobs,
  } = jobStore();

  useEffect(() => {
    getJobPosts();
  }, [getJobPosts]);

  useEffect(() => {
    getSavedJobs(); 
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  const filteredJobPosts = jobPosts.filter((job) => {
    const matchesKeyword =
      searchKeyword === "" ||
      job.jobTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.jobDescription.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.employer?.fullName
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || job.jobCategory === selectedCategory;

    const matchesLocation =
      location === "" ||
      job.locations?.some((loc) =>
        loc.toLowerCase().includes(location.toLowerCase())
      );

    const matchesJobShift =
      selectedJobShift === "listedAnyTime" || job.jobShift === selectedJobShift;

    const matchesJobType =
      selectedJobType === "All work types" || job.jobType === selectedJobType;

    return (
      matchesKeyword &&
      matchesCategory &&
      matchesLocation &&
      matchesJobShift &&
      matchesJobType
    );
  });

  const categories = [
    "ALL",
    "DESIGN",
    "DEVELOPMENT",
    "MARKETING",
    "SALES",
    "ENGINEERING",
    "HR",
    "FINANCE",
    "MANAGEMENT",
    "PRODUCT",
    "CUSTOMER_SUPPORT",
    "OPERATIONS",
    "RESEARCH",
    "EDUCATION",
    "ADMINISTRATION",
    "IT",
    "CONSULTING",
    "HEALTHCARE",
    "CONSTRUCTION",
    "LEGAL",
    "ART",
    "MEDIA",
  ];

  const jobShifts = [
    "listedAnyTime",
    "Full-Time",
    "Part-Time",
    "Freelance",
    "Contract",
    "Internship",
    "Fixed",
    "Night-Shift",
    "Day-Shift",
  ];

  const jobTypes = [
    "All work types",
    "Full-Time",
    "Part-Time",
    "Freelance",
    "Contract",
    "Internship",
  ];

  const handleSearch = () => {
    setSearch(filteredJobPosts);
  };

  useEffect(() => {
    if (
      selectedJob &&
      savedJobs.some((savedJob) => savedJob.jobId._id === selectedJob._id)
    ) {
      setIsJobSaved(true);
    } else {
      setIsJobSaved(false);
    }
  }, [savedJobs, selectedJob]);

  const handleSaveJob = async (jobId) => {
    await saveJob(jobId); 

    getSavedJobs();

    setIsJobSaved(true);
  };

  const handleApply = async (event) => {
    event.preventDefault();
    console.log("Selected Job:", selectedJob?._id || selectedJob?.id);
    const jobId = selectedJob?._id || selectedJob?.id;

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
        jobId,
        coverLetter,
        accessibilityNeeds,
        resume,
        additionalFiles,
      });

      await applyJobs({
        jobId,
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
    <main className="min-h-screen flex flex-col overflow-auto">
      <Navbar />
      <section className="bg-applicant-bg-3 bg-no-repeat bg-cover bg-center flex-grow flex flex-col items-start justify-start space-y-4 pt-8 h-screen">
        <h1 className="text-7xl font-semibold self-start font-poppins text-white ml-4 pl-4 pt-10 text-shadow-xl sm:text-5xl md:text-6xl">
          LET'S GET YOU <br />
          FIND A JOB
        </h1>
        <p className="text-4xl text-left text-md font-medium font-jakarta ml-4 pl-4 pb-14 text-white text-shadow-xl sm:text-xl md:text-2xl">
          WE'VE GOT {jobPosts?.length || 0} JOBS TO APPLY!
        </p>
        <div className="flex flex-col items-center mx-auto space-y-6">
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            location={location}
            setLocation={setLocation}
            categories={categories}
            onSearch={search}
            setSearch={setSearch}
          />

          <div className="w-full flex flex-col sm:flex-row justify-start sm:space-x-7 sm:space-y-0 space-y-6 pl-8">
            <div className="relative w-full sm:w-48 ">
              <select
                className="px-4 py-3 text-black text-opacity-70 font-light bg-transparent rounded-2xl border-2 border-solid border-browny font-poppins w-full"
                onChange={(e) => setselectedJobType(e.target.value)}
                value={selectedJobType}
              >
                {jobTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-48 mt-4 sm:mt-0">
              <select
                className="px-4 py-3 text-black text-opacity-70 font-light bg-transparent rounded-2xl border-2 border-solid border-browny font-poppins w-full"
                onChange={(e) => setSelectedJobShift(e.target.value)}
                value={selectedJobShift}
              >
                {jobShifts.map((shift, index) => (
                  <option key={index} value={shift}>
                    {shift === "listedAnyTime" ? "Listed Any Time" : shift}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="flex mt-14 h-[150vh] flex-col sm:flex-row">
        <div className="w-full sm:w-2/4 p-4 h-full overflow-y-auto ml-24">
          <div className="space-y-4">
            {filteredJobPosts.length > 0 ? (
              filteredJobPosts.map((job) => (
                <div
                  key={job.id || job._id}
                  className="bg-white rounded-lg border-solid border-2 border-browny shadow-md p-4 cursor-pointer font-poppins hover:bg-gray-100"
                  onClick={() => setSelectedJob(job)}
                >
                  <h3 className="text-xl font-bold">{job.jobTitle}</h3>
                  <p className="text-base text-gray-500">
                    {job.employer?.fullName}
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">{job.jobDescription}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No job posts available.</p>
            )}
          </div>
        </div>

        <div className="w-full sm:w-2/3 p-8 relative font-poppins">
          {selectedJob ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button
                className="absolute top-4 right-4 text-gray-500"
                onClick={() => setSelectedJob(null)}
              >
                <XCircle size={24} />
              </button>

              <h2 className="text-3xl font-extrabold">
                {selectedJob.jobTitle}
              </h2>
              <p className="text-xl font-normal">
                {selectedJob.employer?.fullName}/
                {selectedJob.companyName || selectedJob.employer.companyName}
              </p>

              {selectedJob.locations && selectedJob.locations.length > 0 && (
                <div className="flex items-center space-x-2">
                  <MapPinned className="h-5 w-5 text-gray-500" />
                  <p className="text-xl font-normal">
                    {selectedJob.locations.join(", ")}
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Clock3 className="h-5 w-5 text-gray-500" />
                <p className="text-xl font-normal">{selectedJob.jobType}</p>
              </div>

              {selectedJob.expectedSalary &&
              selectedJob.expectedSalary.minSalary &&
              selectedJob.expectedSalary.maxSalary ? (
                <div className="flex items-center space-x-2">
                  <Banknote className="h-5 w-5 text-gray-500" />
                  <p className="text-xl font-normal">
                    ₱{selectedJob.expectedSalary.minSalary.toLocaleString()} - ₱
                    {selectedJob.expectedSalary.maxSalary.toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Banknote className="h-5 w-5 text-gray-500" />
                  <p className="text-lg font-semibold">
                    Salary information not available
                  </p>
                </div>
              )}

              <div className="mt-4 text-sm flex items-center space-x-2">
                <span>Posted</span>
                <FormatTimeDate
                  date={selectedJob.createdAt}
                  formatType="relative"
                />
              </div>

              <div className="flex space-x-7 mt-6">
                <button
                  className="px-24 py-3 bg-buttonBlue text-white rounded font-poppins font-semibold"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Apply
                </button>
                <button
                  className={`px-20 py-3 rounded border-2 font-poppins font-semibold transition-all ${
                    isJobSaved
                      ? "bg-red-500 scale-105 text-white"
                      : "bg-transparent border-BLUE text-BLUE"
                  }`}
                  onClick={() => handleSaveJob(selectedJob._id)}
                >
                  {isJobSaved ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="mt-8">
                <ul className="space-y-4">
                  <li>
                    <p className="text-base">Application Deadline:</p>
                    <ul className="list-disc pl-6 text-base">
                      <li>
                        {selectedJob.applicationDeadline
                          ? new Date(
                              selectedJob.applicationDeadline
                            ).toLocaleDateString()
                          : "Not available"}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="text-base">Job Qualifications:</p>
                    <ul className="list-disc pl-6 text-base">
                      <li>
                        {selectedJob.jobQualifications || "Not specified"}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="text-base">Job Experience:</p>
                    <ul className="list-disc pl-6 text-base">
                      <li>{selectedJob.jobExperience || "Not specified"}</li>
                    </ul>
                  </li>
                  <li>
                    <p className="text-base">Preferred Language:</p>
                    <ul className="list-disc pl-6 text-base">
                      <li>
                        {selectedJob.preferredLanguage || "Not specified"}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="text-base">Job Skills:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base">
                      {selectedJob.jobSkills &&
                      selectedJob.jobSkills.length > 0 ? (
                        selectedJob.jobSkills.map((skill, index) => (
                          <li key={index} className="text-base text-black">
                            {skill}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No skills listed.</li>
                      )}
                    </ul>
                  </li>
                  <li>
                    <p className="text-base">Job Attachment:</p>
                    <ul className="list-disc pl-6 text-base">
                      <li>
                        {selectedJob.jobAttachment ? (
                          <a
                            href={selectedJob.jobAttachment}
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
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-lg font-medium text-gray-500">
              <p>Click any job to view details</p>
            </div>
          )}
        </div>
      </section>
      {open && selectedJob && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="p-6 w-[90vh] mx-auto relative font-poppins">
            <X
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-gray-300 hover:bg-red-500 text-black w-7 h-7 p-2 rounded-full focus:outline-none cursor-pointer"
            />

            <h2 className="text-xl font-semibold text-black mb-4 font-poppins">
              Apply for : {selectedJob.jobTitle}
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

      <Footer />
    </main>
  );
};

export default JobsPage;
