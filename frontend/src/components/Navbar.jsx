import { useState } from "react";
import { authStore } from "../stores/authStore";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Settings,
  User,
  Edit,
  LogOut,
  Menu,
  X,
} from "lucide-react";

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

    if (!isMenuOpen) {
      setDropdownOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-normal text-black flex items-center ml-5">
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
            <Link to="/">
              <img
                src="/cats.jpg"
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
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="ml-2 cursor-pointer flex items-center"
              >
                <ChevronDown className="text-gray-500 w-5 h-5" />
              </div>

              {isDropdownOpen && !isMenuOpen && (
                <div className="absolute right-0 top-full w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul className="text-sm font-poppins">
                    <li>
                      <Link
                        to="/profile-info"
                        className="flex items-center px-4 py-2 hover:bg-gray-200"
                      >
                        <User className="mr-2 w-4 h-4" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 hover:bg-gray-200"
                      >
                        <Edit className="mr-2 w-4 h-4" />
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 hover:bg-gray-200"
                      >
                        <Settings className="mr-2 w-4 h-4" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <p
                        className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 w-4 h-4" />
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
              <X className="text-gray-500 w-6 h-6" />
            ) : (
              <Menu className="text-gray-500 w-6 h-6" />
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white">
          <Link
            to="/applicant"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Find a Job
          </Link>
          <Link
            to="/job"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Jobs
          </Link>
          <Link
            to="/messaging"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Messaging
          </Link>
          <Link
            to="/notifications"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Notifications
          </Link>

          <Link
            to="/profile-info"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Edit Profile
          </Link>
          <Link
            to="/settings"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Settings
          </Link>
          <p
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
