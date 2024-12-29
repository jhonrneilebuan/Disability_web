import React from "react";
import { authStore } from "../stores/authStore";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = authStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center pr-16">
        <div className="text-lg font-bold text-black flex items-center ml-5">
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
            <Link to="/">
              <img
                src="cats.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>

        <div className="hidden md:flex space-x-10 items-center">
          <Link
            to="/applicant"
            className={`${
              isActive("/applicant") ? "font-extrabold" : "font-thin"
            } text-gray-800 hover:text-black font-jakarta`}
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className={`${
              isActive("/jobs") ? "font-extrabold" : "font-thin"
            } text-gray-800 hover:text-black font-jakarta`}
          >
            Find a Job
          </Link>

          <Link
            to="/job"
            className={`${
              isActive("/job") ? "font-extrabold" : "font-thin"
            } text-gray-800 hover:text-black font-jakarta`}
          >
            Jobs
          </Link>

          <Link
            to="/messaging"
            className={`${
              isActive("/messaging") ? "font-extrabold" : "font-thin"
            } text-gray-800 hover:text-black font-jakarta`}
          >
            Messaging
          </Link>

          <Link
            to="/notifications"
            className={`${
              isActive("/notifications") ? "font-extrabold" : "font-thin"
            } text-gray-800 hover:text-black font-jakarta`}
          >
            Notifications
          </Link>

          <Link to="/profile-info">
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer mr-5">
              <img
                src={user.profilePicture || "avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
