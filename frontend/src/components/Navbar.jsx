import React, { useState } from "react"; 
import { authStore } from "../stores/authStore";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Settings, User, Edit, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = authStore();
  const location = useLocation();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-normal text-black flex items-center ml-5">
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

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/applicant"
            className={`${
              isActive("/applicant")
                ? "text-browny font-normal"
                : "text-BLUE font-normal"
            } text-base hover:text-browny font-poppins`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`${
              isActive("/jobs")
                ? "text-browny font-normal"
                : "text-BLUE font-normal"
            } text-base hover:text-browny font-poppins`}
          >
            Find a Job
          </Link>
          <Link
            to="/job"
            className={`${
              isActive("/job")
                ? "text-browny font-normal"
                : "text-BLUE font-normal"
            } text-base hover:text-browny font-poppins`}
          >
            Jobs
          </Link>
          <Link
            to="/messaging"
            className={`${
              isActive("/messaging")
                ? "text-browny font-normal"
                : "text-BLUE font-normal"
            } text-base hover:text-browny font-poppins`}
          >
            Messaging
          </Link>
          <Link
            to="/notifications"
            className={`${
              isActive("/notifications")
                ? "text-browny font-normal"
                : "text-BLUE font-normal"
            } text-base hover:text-browny font-poppins`}
          >
            Notifications
          </Link>

          <div className="h-10 border-l-2 border-BLUE mx-4"></div>

          <div className="relative flex items-center">
            <div className="w-10 h-10 rounded-md overflow-hidden cursor-pointer">
              <img
                src={user.profilePicture || "avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div onClick={toggleDropdown} className="ml-2 cursor-pointer">
              <ChevronDown className="text-gray-500" />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-60 w-48 bg-white border rounded-lg shadow-lg z-10">
                <ul className="text-sm font-poppins">
                  <li>
                    <Link
                      to="/profile-info"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <User className="mr-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <Edit className="mr-2" />
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <Settings className="mr-2" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <p
                      to="/logout"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <LogOut className="mr-2" onClick={handleLogout} />
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <div className="w-10 h-10 rounded-md overflow-hidden cursor-pointer">
            <img
              src={user.profilePicture || "avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div onClick={toggleMenu} className="ml-2 cursor-pointer">
            {isMenuOpen ? (
              <X className="text-gray-500" />
            ) : (
              <Menu className="text-gray-500" />
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-4">
          <Link
            to="/applicant"
            className="text-base py-2 px-4 font-poppins hover:text-browny"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="text-base py-2 px-4 font-poppins hover:text-browny"
          >
            Find a Job
          </Link>
          <Link
            to="/job"
            className="text-base py-2 px-4 font-poppins hover:text-browny"
          >
            Jobs
          </Link>
          <Link
            to="/messaging"
            className="text-base py-2 px-4 font-poppins hover:text-browny"
          >
            Messaging
          </Link>
          <Link
            to="/notifications"
            className="text-base py-2 px-4 font-poppins hover:text-browny"
          >
            Notifications
          </Link>
          <div className="py-4">
            <div onClick={toggleDropdown} className="cursor-pointer">
              <ChevronDown className="text-gray-500" />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-60 w-48 bg-white border rounded-lg shadow-lg z-10">
                <ul className="text-sm font-poppins">
                  <li>
                    <Link
                      to="/profile-info"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <User className="mr-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <Edit className="mr-2" />
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <Settings className="mr-2" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <p
                      to="/logout"
                      className="flex items-center px-4 py-2 hover:bg-gray-200"
                    >
                      <LogOut className="mr-2" onClick={handleLogout} />
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}; 

export default Navbar;
