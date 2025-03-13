import {
  FaBriefcase,
  FaChartLine,
  FaCode,
  FaCog,
  FaDollarSign,
  FaFileAlt,
  FaGavel,
  FaGraduationCap,
  FaHardHat,
  FaHeart,
  FaIndustry,
  FaMusic,
  FaPaintBrush,
  FaTv,
  FaUsers,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ApplicantSearch from "../components/ApplicantSearch";
import Footer from "../components/Footer";
import FormatTimeDate from "../components/FormatTimeDate";
import JobPostSkeleton from "../components/JobPostSkeleton";
import Navbar from "../components/Navbar";
import { adminStore } from "../stores/adminApi";
import { authStore } from "../stores/authStore";
import { jobStore } from "../stores/jobStore";
import CategoryLoading from "./CategoryLoading";
const Homepage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [location, setLocation] = useState("");
  const [showAllJobs, setShowAllJobs] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();
  const { employers, fetchEmployers } = adminStore();
  const {
    categoryCounts,
    fetchCategoryCounts,
    getAllJobs,
    jobPosts,
    isLoading,
    loading,
    isError,
    error,
    fetchJobsByCategory,
  } = jobStore();

  useEffect(() => {
    getAllJobs();
    fetchEmployers();
    fetchCategoryCounts();
    fetchJobsByCategory();
  }, [getAllJobs, fetchEmployers, fetchCategoryCounts, fetchJobsByCategory]);

  const handleViewJobs = async (category) => {
    await fetchJobsByCategory(category);
    navigate(`/job-find/${category.toLowerCase().replace(/_/g, "-")}`);
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  const getRandomColor = () => {
    const colors = ["#F87171", "#34D399", "#60A5FA", "#FBBF24", "#A78BFA"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredJobPosts = jobPosts.filter((job) => {
    const matchesKeyword =
      searchKeyword === "" ||
      job.jobTitle?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.jobDescription?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.employer?.fullName
        ?.toLowerCase()
        .includes(searchKeyword.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || job.jobCategory === selectedCategory;

    const matchesLocation =
      location === "" ||
      job.locations.some((loc) =>
        loc
          .replace(/["]+/g, "")
          .toLowerCase()
          .trim()
          .includes(location.toLowerCase().trim())
      );

    return matchesKeyword && matchesCategory && matchesLocation;
  });

  const categories = [
    "Select Category",
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

  const handleJobDetails = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  const handleNavigateSignUp = () => {
    navigate(`/sign-up`);
  };

  const handleNavigateLogin = () => {
    navigate(`/login`);
  };

  const categoryIcons = {
    ALL: <FaBriefcase className="w-10 h-10 text-gray-500" />,
    DESIGN: <FaPaintBrush className="w-10 h-10 text-blue-500" />,
    DEVELOPMENT: <FaCode className="w-10 h-10 text-green-500" />,
    MARKETING: <FaChartLine className="w-10 h-10 text-red-500" />,
    SALES: <FaDollarSign className="w-10 h-10 text-purple-500" />,
    ENGINEERING: <FaIndustry className="w-10 h-10 text-yellow-500" />,
    HR: <FaUsers className="w-10 h-10 text-pink-500" />,
    FINANCE: <FaDollarSign className="w-10 h-10 text-teal-500" />,
    MANAGEMENT: <FaCog className="w-10 h-10 text-indigo-500" />,
    PRODUCT: <FaFileAlt className="w-10 h-10 text-cyan-500" />,
    CUSTOMER_SUPPORT: <FaUsers className="w-10 h-10 text-orange-500" />,
    OPERATIONS: <FaCog className="w-10 h-10 text-blue-600" />,
    RESEARCH: <FaFileAlt className="w-10 h-10 text-purple-600" />,
    EDUCATION: <FaGraduationCap className="w-10 h-10 text-green-600" />,
    ADMINISTRATION: <FaUsers className="w-10 h-10 text-gray-600" />,
    IT: <FaCode className="w-10 h-10 text-blue-400" />,
    CONSULTING: <FaBriefcase className="w-10 h-10 text-pink-400" />,
    HEALTHCARE: <FaHeart className="w-10 h-10 text-red-400" />,
    CONSTRUCTION: <FaHardHat className="w-10 h-10 text-yellow-600" />,
    LEGAL: <FaGavel className="w-10 h-10 text-indigo-600" />,
    ART: <FaMusic className="w-10 h-10 text-purple-400" />,
    MEDIA: <FaTv className="w-10 h-10 text-blue-300" />,
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <Navbar />

      <main className="flex-grow flex flex-col">
        <section className="relative h-[70vh] w-full flex flex-col items-center justify-center text-white text-center px-6 md:px-12 bg-applicant-nbg-3 bg-no-repeat bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 pointer-events-none z-0"></div>

          <div className="relative z-20 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-extrabold font-poppins drop-shadow-lg">
              Find Your Perfect Job Today
            </h1>
            <p className="mt-4 text-lg md:text-2xl font-light md:font-poppins max-w-3xl leading-relaxed drop-shadow-md">
              Connect with inclusive employers and build a career that fits your
              abilities.
            </p>

            <div className="flex flex-col items-center mx-auto space-y-6">
              <ApplicantSearch
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                location={location}
                setLocation={setLocation}
                categories={categories}
              />
            </div>
          </div>
        </section>

        <section className="bg-white h-[150] mb-2">
          <h2 className="text-4xl font-bold text-center font-poppins text-BLUE mt-16 mb-5">
            Latest Job Posts
          </h2>
          <p className="text-xl font-normal text-center font-poppins text-BLUE mb-12">
            List of Featured Jobs for Disabled People
          </p>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 px-4">
            {isLoading ? (
              <JobPostSkeleton rows={6} />
            ) : error ? (
              <p className="text-red-500 text-lg font-poppins col-span-full text-center">
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
                  <p className="text-base text-black font-light font-poppins mb-2">
                    {job.locations.join(", ").replace(/[\\[\]"]+/g, "")}
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
                  {isAuthenticated ? (
                    <button
                      className="text-blue-500 font-poppins underline py-2 text-left"
                      onClick={() => handleJobDetails(job._id)}
                    >
                      See more
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 font-poppins underline py-2 text-left opacity-50 cursor-not-allowed"
                      title="Login first to proceed"
                      disabled
                    >
                      See more
                    </button>
                  )}

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

        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-bold text-center text-BLUE mb-8 font-poppins">
              Explore Job Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <CategoryLoading key={index} />
                ))
              ) : isError ? (
                <p className="text-red-500 text-lg font-poppins col-span-full text-center">
                  {isError}
                </p>
              ) : (
                Object.entries(categoryCounts).map(([category, count]) => {
                  let formattedCategory = category
                    .toLowerCase()
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());

                  if (category === "IT" || category === "HR") {
                    formattedCategory = category;
                  }

                  return (
                    <div
                      key={category}
                      className="bg-white p-6 shadow-md flex flex-col items-center text-center 
            transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg"
                    >
                      <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                        {categoryIcons[category] || (
                          <FaBriefcase className="w-8 h-8" />
                        )}
                      </div>

                      <h3 className="text-lg font-medium mt-4 text-gray-800 font-[Poppins]">
                        {formattedCategory}
                      </h3>

                      <p className="text-gray-600 text-sm mt-1 font-[Poppins]">
                        {count} Jobs Available
                      </p>

                      <button
                        onClick={() => handleViewJobs(category)}
                        className="mt-4 px-8 py-2 text-sm font-medium text-white bg-blue-500 
              hover:bg-blue-600 transition-all font-[Poppins] rounded-lg"
                      >
                        View Jobs
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8 font-poppins text-BLUE">
            Trusted Top Companies
          </h2>
          <div className="px-4">
            {employers.length > 0 ? (
              <Swiper
                modules={[Navigation, FreeMode, Mousewheel, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                navigation={false}
                freeMode={true}
                grabCursor={true}
                mousewheel={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                speed={1000}
              >
                {employers.map((employer) => {
                  const firstLetter =
                    employer.fullName?.charAt(0).toUpperCase() || "?";
                  const bgColor = getRandomColor();

                  return (
                    <SwiperSlide key={employer._id}>
                      <div className="flex flex-col items-center justify-center text-center">
                        {employer.profilePicture ? (
                          <img
                            src={employer.profilePicture}
                            alt={employer.fullName}
                            className="h-16 w-16 object-cover rounded-full border-2 border-gray-300"
                          />
                        ) : (
                          <div
                            className="h-16 w-16 flex items-center justify-center rounded-full text-white font-bold text-xl"
                            style={{ backgroundColor: bgColor }}
                          >
                            {firstLetter}
                          </div>
                        )}
                        <h3 className="mt-2 text-base font-normal text-gray-800 w-full font-poppins">
                          {employer.employerInformation?.companyName ||
                            employer.fullName}
                        </h3>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <p className="text-gray-500 text-center">
                No featured employers yet.
              </p>
            )}
          </div>
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
              onClick={() => handleNavigateSignUp()}
              className="w-full sm:w-[250px] px-12 py-3 rounded border-2 border-solid border-BLUE font-poppins text-BLUE font-semibold text-center hover:bg-BLUE hover:text-white transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => handleNavigateLogin()}
              className="w-full sm:w-[250px] px-12 py-3 bg-buttonBlue text-white rounded border-2 border-transparent font-poppins font-semibold text-center hover:bg-transparent hover:border-BLUE hover:text-buttonBlue transition-colors"
            >
              Login
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Homepage;
