import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { jobStore } from "../stores/jobStore";
import Modal from "../components/Modal";
import { XCircle } from "lucide-react";
import FormatTimeDate from "../components/FormatTimeDate";
const JobsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const { getJobPosts, jobPosts, isLoading, error } = jobStore();

  useEffect(() => {
    getJobPosts();
  }, [getJobPosts]);

  if (isLoading) {
    return <p>Loading job posts...</p>;
  }

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

    return matchesKeyword && matchesCategory;
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

  return (
    <div className="min-h-screen bg-pastelBlueGray flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-start justify-start space-y-4 pt-8">
        <h1 className="text-5xl font-extrabold self-start font-jakarta text-white ml-4 pl-20 pt-10">
          LET'S GET YOU <br />
          FIND A JOB
        </h1>
        <p className="text-3xl text-left text-md font-medium font-jakarta ml-4 text-white pb-10 pl-20 ">
          WE'VE GOT {jobPosts?.length || 0} JOBS TO APPLY!
        </p>
        <div className="bg-lightGray bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-custom overflow-hidden p-8 mx-auto max-w-3xl w-full">
          <div className="flex space-x-4 items-center">
            <input
              placeholder="Keyword"
              className="px-4 py-2 rounded w-full text-black placeholder-black bg-white bg-opacity-50 border border-black focus:outline-none"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <select
              className="px-4 py-2 rounded bg-white text-gray-800 appearance-none md:w-2/3"
              aria-label="Select category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category.toUpperCase()}>
                  {category.replace("_", " ")}
                </option>
              ))}
            </select>

            <button className="bg-buttonBlue hover:bg-indigo-700 px-6 py-2 rounded text-black">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full max-w-4xl mx-auto mt-10 mb-5">
        {filteredJobPosts.length > 0 ? (
          filteredJobPosts.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-6 flex justify-between items-start space-x-4"
            >
              <div className="flex-1">
                <h3 className="text-4xl font-semibold font-jakarta mb-2">
                  {job.jobTitle}
                </h3>
                <p className="text-base font-medium font-jakarta mb-2">
                  {job.jobCategory}
                </p>
                <p className="text-base font-medium font-jakarta mb-2">
                  {job.employer
                    ? job.employer.fullName.toUpperCase()
                    : "Employer not found"}
                </p>
                <p className="text-base font-medium font-jakarta mb-2">
                  {job.locations && job.locations.join(", ")}
                </p>

                <p className="text-base font-medium font-jakarta text-justify">
                  {job.jobDescription}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold text-gray-800">
                  {job.expectedSalary &&
                  job.expectedSalary.minSalary &&
                  job.expectedSalary.maxSalary
                    ? `PHP ${job.expectedSalary.minSalary.toLocaleString()} - PHP ${job.expectedSalary.maxSalary.toLocaleString()}`
                    : "Salary information not available"}
                </p>

                <div className="flex items-center justify-between mt-56">
                  <p className="text-base font-medium font-jakarta mr-3">
                    <FormatTimeDate date={job.createdAt} />
                  </p>
                  <button
                    className="px-4 py-2 bg-buttonBlue text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedJob(job);
                      setOpen(true);
                    }}
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No job posts available.</p>
        )}
      </div>
      {selectedJob && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="text-base font-medium font-jakarta max-w-6xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedJob.jobTitle}</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
              >
                <XCircle />
              </button>
            </div>

            <p className="mb-2">Category: {selectedJob.jobCategory}</p>
            <p className="mb-2">Location: {selectedJob.locations.join(", ")}</p>
            <p className="mb-2">
              Preferred Language: {selectedJob.preferredLanguage}
            </p>
            <p className="mb-2">
              Job Qualifications: {selectedJob.jobQualifications}
            </p>
            <p className="mb-2">Experience: {selectedJob.jobExperience}</p>
            <p className="mb-2">Job Type: {selectedJob.jobType}</p>
            <p className="mb-2">Shift: {selectedJob.jobShift}</p>
            <p className="mb-2">Job Level: {selectedJob.jobLevel}</p>
            <p className="mb-4">Description: {selectedJob.jobDescription}</p>

            <p className="mb-2">
              Salary: PHP
              {selectedJob.expectedSalary.minSalary.toLocaleString()} - PHP
              {selectedJob.expectedSalary.maxSalary.toLocaleString()}
            </p>

            <a
              href={selectedJob.applyWithLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mb-4 inline-block"
            >
              Apply here
            </a>

            <p className="mb-2">
              Job Details PDF:
              <a
                href={selectedJob.jobAttachment}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download
              </a>
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JobsPage;
