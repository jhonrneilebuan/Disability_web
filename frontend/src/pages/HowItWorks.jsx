import React from "react";
import {
  FaUserPlus,
  FaSearch,
  FaFileUpload,
  FaComments,
  FaBriefcase,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-4xl text-blue-600" />,
    title: "Sign Up & Create Profile",
    description:
      "Applicants with disabilities can register on the platform and create a profile, highlighting their skills, experience, and accessibility needs.",
  },
  {
    icon: <FaSearch className="text-4xl text-purple-600" />,
    title: "Browse Job Listings",
    description:
      "Users can explore job opportunities tailored to their abilities and preferences, with filters to refine search results based on accessibility requirements.",
  },
  {
    icon: <FaFileUpload className="text-4xl text-yellow-600" />,
    title: "Apply for Jobs",
    description:
      "Once a suitable job is found, applicants can submit their applications directly through the platform, including uploading résumés and relevant documents.",
  },
  {
    icon: <FaComments className="text-4xl text-red-600" />,
    title: "Connect with Employers",
    description:
      "Employers may reach out for interviews or discussions through the built-in messaging system, ensuring a smooth communication process.",
  },
  {
    icon: <FaBriefcase className="text-4xl text-green-600" />,
    title: "Get Hired & Start Working",
    description:
      "Successful applicants will receive job offers and can begin their careers with inclusive employers who support accessibility and diversity.",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-20 px-8 md:px-16 max-w-7xl mx-auto text-center">
      <h2 className="text-5xl font-extrabold text-blue-900 mb-14">
        How It Works?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.slice(0, 3).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-6 bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
          >
            <div className="bg-blue-100 p-5 rounded-full flex items-center justify-center w-20 h-20">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 text-lg text-center leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 max-w-2xl mx-auto">
        {steps.slice(3).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-6 bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 h-full"
          >
            <div className="bg-blue-100 p-5 rounded-full flex items-center justify-center w-20 h-20">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 text-lg text-center leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
