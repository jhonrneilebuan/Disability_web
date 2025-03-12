import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicantSearch from "../components/ApplicantSearch";
import Footer from "../components/Footer";
import FormatTimeDate from "../components/FormatTimeDate";
import JobPostSkeleton from "../components/JobPostSkeleton";
import Navbar from "../components/Navbar";
import { jobStore } from "../stores/jobStore";

const ApplicantPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [location, setLocation] = useState("");
  const [showAllJobs, setShowAllJobs] = useState(false);
  const navigate = useNavigate();

  const { fetchJobsByDisability, disabilityJobs, error, isLoading } =
    jobStore();

  useEffect(() => {
    fetchJobsByDisability();
  }, [fetchJobsByDisability]);

  const filteredJobPosts = disabilityJobs.filter((job) => {
    const matchesKeyword =
      searchKeyword === "" ||
      job.jobTitle?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.jobDescription?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.employer?.fullName
        ?.toLowerCase()
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

  const displayedJobPosts = showAllJobs
    ? [...filteredJobPosts].reverse()
    : [...filteredJobPosts].reverse().slice(0, 6);

  const handleSearch = () => {
    console.log;
  };

  const handleJobDetails = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  const handleNavigateProfile = () => {
    window.scrollTo(0, 0);
    navigate(`/profile-info`);
  };

  const handleNavigateJobs = () => {
    window.scrollTo(0, 0);
    navigate(`/jobs`);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <Navbar />

      <main className="flex-grow flex flex-col">
        <section className="bg-applicant-nbg-3 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start h-[70vh] w-full relative pt-32">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-7xl font-bold font-poppins text-white">
              Disability Careers
            </h1>
            <p className="text-2xl font-normal font-poppins text-white">
              Connecting Talents with Accessible Job Opportunities
            </p>
          </div>
          <div className="flex flex-col items-center mx-auto space-y-6">
            <ApplicantSearch
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              location={location}
              setLocation={setLocation}
              categories={categories}
              onSearch={handleSearch}
            />
          </div>
        </section>

        <section className="bg-white h-[150] mb-10">
          <h2 className="text-4xl font-bold text-center font-poppins text-BLUE mt-16 mb-5">
            Job Opportunities Aligned with Your Abilities
          </h2>
          <p className="text-xl font-normal text-center font-poppins text-BLUE mb-12">
            Discover roles where your unique strengths and qualifications are
            highly valued.
          </p>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 px-4">
            {isLoading ? (
              <JobPostSkeleton rows={6} />
            ) : error ? (
              <p className="text-red-500 text-lg font-semibold col-span-full text-center">
                {error}
              </p>
            ) : displayedJobPosts.length > 0 ? (
              displayedJobPosts.map((job) => (
                <div
                  key={job.id}
                  className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col justify-between"
                >
                  <h3 className="text-xl font-semibold text-black mb-2 font-poppins">
                    {job.jobTitle || "Job Type Not Specified"}
                  </h3>
                  <p className="text-black font-light font-poppins bg-green-300 rounded-md w-24 text-center py-1 px-1 mb-1">
                    {job.jobType || "No job description available"}
                  </p>
                  <p className="text-base text-black font-light font-poppins mb-2">
                    {job.employer?.fullName}/
                    {job.companyName || job.employer.companyName}
                  </p>
                  <p className="text-black font-light font-poppins">
                    {job.expectedSalary &&
                    job.expectedSalary.minSalary &&
                    job.expectedSalary.maxSalary
                      ? `PHP ${job.expectedSalary.minSalary.toLocaleString()} - PHP ${job.expectedSalary.maxSalary.toLocaleString()}`
                      : "Salary information not available"}
                  </p>

                  <hr className="border-t-2 border-gray-300 my-6" />

                  <p className="text-black font-poppins font-normal flex-grow">
                    {job.jobDescription || "No job description available"}
                  </p>
                  <button
                    className="text-blue-500 font-poppins underline py-2 text-left"
                    onClick={() => handleJobDetails(job._id)}
                  >
                    See more
                  </button>
                  <p className="text-black mt-10 font-poppins">
                    <FormatTimeDate date={job.createdAt} formatType="date" />
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-lg font-semibold col-span-full text-center">
                No job posts available.
              </p>
            )}
          </div>

          {filteredJobPosts.length > 6 && (
            <div className="text-center my-16">
              <button
                onClick={() => setShowAllJobs(!showAllJobs)}
                className="text-blue-500 font-poppins text-lg underline"
              >
                {showAllJobs ? "SHOW LESS" : "VIEW MORE JOB POSTS"}
              </button>
            </div>
          )}
        </section>

        <section className="bg-applicant-nbg-5 bg-transparent bg-no-repeat bg-cover bg-center h-[500px] flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 relative">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-poppins text-BLUE mt-16 mb-8 sm:mb-10">
              Unlocking Opportunities, Embracing Potential
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl font-normal font-poppins text-white mb-8 sm:mb-10">
              Take the next step in your journey — your future starts here!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-7 mt-4 relative z-10">
            <button
              onClick={() => handleNavigateProfile()}
              className="px-12 py-3 sm:px-20 sm:py-3 bg-transparent rounded border-2 border-solid border-BLUE font-poppins text-BLUE font-semibold text-center hover:bg-BLUE hover:text-white transition duration-300"
            >
              View Profile
            </button>
            <button
              onClick={() => handleNavigateJobs()}
              className="px-12 py-3 sm:px-24 sm:py-3 bg-buttonBlue text-white rounded border-2 border-transparent font-poppins font-semibold text-center hover:bg-transparent hover:border-BLUE hover:text-buttonBlue transition duration-300"
            >
              Explore Jobs
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default ApplicantPage;
