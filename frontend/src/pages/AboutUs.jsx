import React from "react";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <section
        className="relative bg-applicant-nbg-3 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg animate-fade-in">
            About Disability Careers
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white drop-shadow-md animate-fade-in">
            A platform dedicated to empowering individuals with disabilities by connecting them with meaningful career opportunities.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Purpose</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-700">Empowering Careers</h3>
              <p className="text-gray-600 text-base">
                We aim to break down barriers and create pathways for individuals with disabilities to find fulfilling employment.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-purple-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-700">Promoting Inclusion</h3>
              <p className="text-gray-600 text-base">
                Our platform fosters an inclusive job market where diversity is celebrated and valued.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">Job Listings</h3>
              <p className="text-gray-600 text-sm">
                Access a wide range of job opportunities tailored for individuals with disabilities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v2h5m10 0v2M7 20l4-4 4 4M7 20l-4-4 4 4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">Accessibility Tools</h3>
              <p className="text-gray-600 text-sm">
                Our platform is designed with accessibility in mind, ensuring everyone can use it effectively.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">Resources & Support</h3>
              <p className="text-gray-600 text-sm">
                Find guides, tips, and support to help you navigate your career journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-teal-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-700">Changing Lives</h3>
              <p className="text-gray-600 text-base">
                Thousands of individuals have found meaningful careers through our platform.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-orange-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v2h5m10 0v2M7 20l4-4 4 4M7 20l-4-4 4 4"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-700">Building Communities</h3>
              <p className="text-gray-600 text-base">
                We connect employers and job seekers to create a more inclusive workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-abtusimg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
            Join Us Today
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white drop-shadow-md animate-fade-in">
            Whether you're a job seeker or an employer, Disability Careers is here to support you.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;