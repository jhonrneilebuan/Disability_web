import { Banknote, Heart, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Search";
import { authStore } from "../stores/authStore";
import { jobStore } from "../stores/jobStore";
const FindAJob = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedJobShift, setSelectedJobShift] = useState("listedAnyTime");
  const [selectedJobType, setselectedJobType] = useState("All work types");
  const { isAuthenticated } = authStore();
  const { getAllJobs, jobPosts, error } = jobStore();

  useEffect(() => {
    getAllJobs();
  }, [getAllJobs]);

  useEffect(() => {
    return () => {
      setSearchKeyword("");
    };
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

  const handleSearch = () => {};

  return (
    <main className="min-h-screen flex flex-col overflow-auto">
      <Navbar />
      <section className="bg-applicant-nbg-4 pb-10 p-16  bg-cover bg-center flex-grow flex flex-col">
        <h1 className="text-7xl font-semibold font-poppins text-white ml-4 mb-4 pl-4 text-shadow-xl sm:text-5xl md:text-6xl text-center">
          Let&apos;s Get You Find a Job
        </h1>
        <p className="text-4xl text-center text-md font-medium font-jakarta ml-4 pl-4 text-white text-shadow-xl sm:text-xl md:text-2xl">
          WE&apos;VE GOT {jobPosts?.length || 0} JOBS TO APPLY!
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
            onSearch={handleSearch}
          />

          <div className="items-center justify-center w-full flex flex-col sm:flex-row sm:space-x-7 sm:space-y-0">
            <div className="relative w-full sm:w-48 ">
              <select
                className="px-4 py-3 text-browny text-opacity-70 font-light bg-transparent rounded-2xl border-2 border-solid border-browny font-poppins w-full"
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
                className="px-4 py-3 text-browny text-opacity-70 font-light bg-transparent rounded-2xl border-2 border-solid border-browny font-poppins w-full"
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

      <div className="mx-28 mt-4">

      <hr className="border-t-2 border-browny w-full my-10" />

        {error && (
          <p className="text-red-500 text-center">
            Failed to load job posts. Please try again later.
          </p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 bg-white">
          {filteredJobPosts.length > 0 ? (
            [...filteredJobPosts].reverse().map((job) => (
              <div
                key={job.id || job._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 font-poppins"
                onClick={() => console.log("Viewing job", job.id)}
              >
                <div>
                  <h3 className="text-2xl font-bold text-black">
                    {job.jobTitle}
                  </h3>
                  <p className="text-lg text-gray-600">{job.companyName}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-500 mt-2">
                  <MapPin className="h-5 w-5" />
                  <p className="text-base font-poppins">
                    {job.locations || "Location not specified"}
                  </p>
                </div>

                {job.expectedSalary && (
                  <div className="flex items-center gap-2 text-gray-600 mt-4">
                    <Banknote className="h-5 w-5" />
                    <p className="text-base font-poppins text-gray-600">
                      ₱{job.expectedSalary.minSalary.toLocaleString()} - ₱
                      {job.expectedSalary.maxSalary.toLocaleString()}
                    </p>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-4 line-clamp-3">
                  {job.jobDescription}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.jobCategory && (
                    <span className="rounded-lg bg-blue-100 text-xs px-3 py-1 font-semibold text-blue-500">
                      {job.jobCategory}
                    </span>
                  )}
                  {job.jobType && (
                    <span className="rounded-lg bg-blue-100 text-xs px-3 py-1 font-semibold text-blue-500">
                      {job.jobType}
                    </span>
                  )}
                  {job.jobLevel && (
                    <span className="rounded-lg bg-blue-100 text-xs px-3 py-1 font-semibold text-blue-500">
                      {job.jobLevel}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-6">
                  {isAuthenticated ? (
                    <>
                      <button
                        className="bg-buttonBlue text-white px-6 py-3 rounded-xl font-semibold text-base hover:cursor-pointer"
                        onClick={() => console.log("Applying for job", job.id)}
                      >
                        Apply Now
                      </button>
                      <button
                        className="bg-gray-200 text-black p-3 rounded-xl font-semibold hover:cursor-pointer"
                        onClick={() => console.log("Saving job", job.id)}
                      >
                        <Heart size={24} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-buttonBlue text-white px-6 py-3 rounded-xl font-semibold text-base opacity-50 cursor-not-allowed"
                        title="Login first to proceed"
                        disabled
                      >
                        Apply Now
                      </button>
                      <button
                        className="bg-gray-200 text-black p-3 rounded-xl font-semibold opacity-50 cursor-not-allowed"
                        title="Login first to proceed"
                        disabled
                      >
                        <Heart size={24} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No job posts available.</p>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default FindAJob;
