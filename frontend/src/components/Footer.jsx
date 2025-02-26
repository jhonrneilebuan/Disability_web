import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white text-gray-600 font-poppins text-xl py-12 mt-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl text-black font-semibold mb-4">Job Seekers</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/job-search" className="hover:underline">
                    Job Search
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:underline">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/recommended-jobs" className="hover:underline">
                    Recommended Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/saved-jobs" className="hover:underline">
                    Saved Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/job-applications" className="hover:underline">
                    Job Applications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl text-black font-semibold mb-4">Employers</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/post-job" className="hover:underline">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/hiring-advice" className="hover:underline">
                    Hiring Advice
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Link to="/about-us">
                <h3 className="text-2xl text-black font-semibold mb-4">About Us</h3>
              </Link>
              <ul className="space-y-2">
                <li>
                  <Link to="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="hover:underline">
                    Help Center
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
