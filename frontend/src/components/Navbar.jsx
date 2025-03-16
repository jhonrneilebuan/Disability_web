import {
  ChevronDown,
  Edit,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";
const Navbar = () => {
  const {
    user,
    logout,
    notifications,
    clearNotifications,
    fetchNotifications,
    isAuthenticated,
    markAllNotificationsAsRead,
  } = authStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

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

  const handleNotificationClick = (notif) => {
    switch (notif.type) {
      case "interviewScheduled":
        navigate(`/job`);
        break;
      case "interviewCompleted":
        navigate(`/job`);
        break;
      case "applicationShortlisted":
        navigate(`/job`);
        break;
      case "applicationRejected":
        navigate(`/job`);
        break;
      case "verification":
        navigate(`/profile-info"`);
        break;
      default:
        console.log("Unknown notification type:", notif.type);
    }
  };
  const NavLink = ({ to, active, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`${
        active ? "text-browny font-normal" : "text-BLUE font-normal"
      } text-base hover:text-browny font-poppins`}
    >
      {children}
    </Link>
  );
  if (!isAuthenticated)
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/sample-logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </Link>
            <Link
              to="/"
              className="text-lg font-semibold text-browny font-mono ml-2"
            >
              Disability Careers
            </Link>
          </div>

          <button onClick={toggleMenu} className="lg:hidden text-browny">
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          <div className="hidden lg:flex space-x-8">
            <NavLink to="/" active={isActive("/")}>
              Home
            </NavLink>
            <NavLink to="/about-us" active={isActive("/about-us")}>
              About Us
            </NavLink>
            <NavLink to="/howitworks" active={isActive("/howitworks")}>
              How It Works
            </NavLink>
            <NavLink to="/contact-us" active={isActive("/contact-us")}>
              Contact Us
            </NavLink>
          </div>

          <div className="hidden lg:flex justify-end items-center space-x-6">
            <NavLink to="/login" active={isActive("/login")}>
              Login
            </NavLink>
            <Link
              to="/sign-up"
              className="bg-browny text-white px-5 py-2 rounded-sm font-poppins font-medium hover:bg-yellow-700 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed z-50 top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6">
            <NavLink to="/" active={isActive("/")} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              active={isActive("/about-us")}
              onClick={toggleMenu}
            >
              About Us
            </NavLink>
            <NavLink
              to="/howitworks"
              active={isActive("/howitworks")}
              onClick={toggleMenu}
            >
              How It Works
            </NavLink>
            <NavLink
              to="/contact-us"
              active={isActive("/contact-us")}
              onClick={toggleMenu}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/login"
              active={isActive("/login")}
              onClick={toggleMenu}
            >
              Login
            </NavLink>
            <Link
              to="/sign-up"
              className="bg-browny text-white px-5 py-2 rounded-sm font-poppins font-medium hover:bg-yellow-700 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    );

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-normal text-black flex items-center ml-5">
          <div className="flex-1 flex items-center">
            <Link to="/" className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/sample-logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </Link>
            <Link
              to="/"
              className="text-lg font-semibold text-browny font-mono ml-2 "
            >
              Disability Careers
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
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              markAllNotificationsAsRead();
            }}
            className="relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <FaBell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-poppins">
                {unreadCount}
              </span>
            )}
          </button>

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
                        to="/edit-profile"
                        className="flex items-center px-4 py-2 hover:bg-gray-200"
                      >
                        <Edit className="mr-2 w-4 h-4" />
                        Edit Profile
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
            to="/profile-info"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Profile
          </Link>
          <Link
            to="/edit-profile"
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center"
          >
            Edit Profile
          </Link>
          <p
            className="text-base py-3 px-4 font-poppins hover:text-browny w-full text-center cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50 mr-2">
          <div className="p-3 text-gray-700 font-semibold font-poppins text-center">
            Notifications
          </div>
          {notifications.length > 0 ? (
            <ul className="max-h-48 overflow-y-scroll no-scrollbar">
              {notifications.map((notif, index) => (
                <li
                  key={notif._id || index}
                  onClick={() => handleNotificationClick(notif)}
                  className={`px-4 py-2 text-sm border-b hover:bg-gray-100 cursor-pointer ${
                    notif.isRead
                      ? "text-gray-500 font-poppins"
                      : "text-black font-poppins font-medium"
                  }`}
                >
                  {notif?.message || notif}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500">
              No new notifications
            </div>
          )}

          {notifications.length > 0 && (
            <button
              onClick={() => {
                markAllNotificationsAsRead();
                fetchNotifications();
                clearNotifications();
                setIsOpen(false);
              }}
              className="w-full py-2 text-center text-red-600 hover:bg-gray-100 font-poppins"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
