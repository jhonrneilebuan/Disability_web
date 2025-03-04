import { Link } from "react-router-dom";
import { authStore } from "../stores/authStore";
const Footer = () => {
  const { user } = authStore();

  return (
    <div>
      <footer className="bg-white text-gray-600 font-poppins text-xl py-12 mt-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl text-black font-semibold mb-4">Job Seekers</h3>
              <ul className="space-y-2">
                <li>
                  {user?.role === "Applicant" ? (
                    <Link to="/jobs" className="hover:underline">
                      Job Search
                    </Link>
                  ) : (
                    <span className="text-gray-400">Job Search</span>
                  )}
                </li>
                <li>
                  {user?.role === "Applicant" ? (
                    <Link to="/profile-info" className="hover:underline">
                      Profile
                    </Link>
                  ) : (
                    <span className="text-gray-400">Profile</span>
                  )}
                </li>
                <li>
                  {user?.role === "Applicant" ? (
                    <Link to="/jobs" className="hover:underline">
                      Recommended Jobs
                    </Link>
                  ) : (
                    <span className="text-gray-400">Recommended Jobs</span>
                  )}
                </li>
                <li>
                  {user?.role === "Applicant" ? (
                    <Link to="/job" className="hover:underline">
                      Saved Jobs
                    </Link>
                  ) : (
                    <span className="text-gray-400">Saved Jobs</span>
                  )}
                </li>
                <li>
                  {user?.role === "Applicant" ? (
                    <Link to="/job" className="hover:underline">
                      Job Applications
                    </Link>
                  ) : (
                    <span className="text-gray-400">Job Applications</span>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl text-black font-semibold mb-4">Employers</h3>
              <ul className="space-y-2">
                <li>
                  {user?.role === "Employer" ? (
                    <Link to="/sign-up" className="hover:underline">
                      Register
                    </Link>
                  ) : (
                    <span className="text-gray-400">Register</span>
                  )}
                </li>
                <li>
                  {user?.role === "Employer" ? (
                    <Link to="/post-job" className="hover:underline">
                      Post a Job
                    </Link>
                  ) : (
                    <span className="text-gray-400">Post a Job</span>
                  )}
                </li>
                <li>
                  {user?.role === "Employer" ? (
                    <Link to="/hiring-advice" className="hover:underline">
                      Hiring Advice
                    </Link>
                  ) : (
                    <span className="text-gray-400">Hiring Advice</span>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <Link to="/about-us">
                <h3 className="text-2xl text-black font-semibold mb-4">About Us</h3>
              </Link>
              <ul className="space-y-2">
                <li>
                  <Link to="/about-us" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/howitworks" className="hover:underline">
                  How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 border-t border-gray-600 pt-6">
            <div className="flex flex-wrap justify-center space-x-6">
              <Link to="/terms" className="hover:underline text-lg sm:text-xl">
                Terms & Conditions
              </Link>
              <Link to="/security-privacy" className="hover:underline text-lg sm:text-xl">
                Security & Privacy
              </Link>
              <p className="text-lg sm:text-xl mt-4 sm:mt-0">
                Copyright © 2024, Disabilitycareers
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;