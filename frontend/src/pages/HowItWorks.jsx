import React from "react";
import {
  FaUserPlus,
  FaSearch,
  FaFileUpload,
  FaComments,
  FaBriefcase,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">
        How It Works?
      </h2>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="p-6 border-l-8 border-blue-500 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              <FaUserPlus className="text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold">Sign Up & Create Profile</h3>
          </div>
          <p className="text-gray-700 mt-4">
            Applicants with disabilities can register on the platform and create
            a profile, highlighting their skills, experience, and accessibility
            needs.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 border-l-8 border-green-500 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              <FaSearch className="text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold">Browse Job Listings</h3>
          </div>
          <p className="text-gray-700 mt-4">
            Users can explore job opportunities tailored to their abilities and
            preferences, with filters to refine search results based on
            accessibility requirements.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 border-l-8 border-yellow-500 bg-yellow-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              <FaFileUpload className="text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold">Apply for Jobs</h3>
          </div>
          <p className="text-gray-700 mt-4">
            Once a suitable job is found, applicants can submit their
            applications directly through the platform, including uploading
            résumés and relevant documents.
          </p>
        </div>

        {/* Step 4 */}
        <div className="p-6 border-l-8 border-red-500 bg-red-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              <FaComments className="text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold">Connect with Employers</h3>
          </div>
          <p className="text-gray-700 mt-4">
            Employers may reach out for interviews or discussions through the
            built-in messaging system, ensuring a smooth communication process.
          </p>
        </div>

        {/* Step 5 */}
        <div className="p-6 border-l-8 border-purple-500 bg-purple-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              <FaBriefcase className="text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold">
              Get Hired & Start Working
            </h3>
          </div>
          <p className="text-gray-700 mt-4">
            Successful applicants will receive job offers and can begin their
            careers with inclusive employers who support accessibility and
            diversity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
