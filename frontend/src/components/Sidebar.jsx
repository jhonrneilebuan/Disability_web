import {
  BarChart,
  Briefcase,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  FileCheck,
  LogOut,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { authStore } from "../stores/authStore";
import { jobStore } from "../stores/jobStore";

const Sidebar = () => {
  const { logout } = authStore();
  const location = useLocation();

  const { totalApplicants, getTotalApplications } = jobStore();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    getTotalApplications();
  }, [getTotalApplications]);

  return (
    <div className="flex min-h-screen">
      <div
        className={`h-full bg-gray-800 shadow-xl relative transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-6 -right-3 bg-white shadow-lg border border-gray-200 rounded-full p-2 hover:bg-gray-100 transition-all duration-300 ${
            isSidebarCollapsed ? "translate-x-3 right-1" : ""
          }`}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-700" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          )}
        </button>

        <div className="flex justify-center items-center py-6">
          <img
            src="/initiallogowhite.jpg"
            alt="Admin Logo"
            className={`rounded-full border-2 border-white transition-all duration-300 ${
              isSidebarCollapsed ? "w-12 h-12" : "w-16 h-16"
            }`}
          />
        </div>

        <ul className="pt-4 space-y-2 px-4">
          <li>
            <Link
              to="/employer"
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
                isSidebarCollapsed ? "justify-center" : ""
              } ${isActive("/employer") ? "bg-gray-700" : ""}`}
            >
              <BarChart
                className={`${
                  isSidebarCollapsed ? "h-8 w-8" : "h-6 w-6"
                } text-blue-400`}
              />
              {!isSidebarCollapsed && (
                <span className="text-lg text-white hover:text-blue-400 transition-colors duration-300">
                  Dashboard
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/post-job"
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
                isSidebarCollapsed ? "justify-center" : ""
              } ${isActive("/post-job") ? "bg-gray-700" : ""}`}
            >
              <Briefcase
                className={`${
                  isSidebarCollapsed ? "h-8 w-8" : "h-6 w-6"
                } text-blue-400`}
              />
              {!isSidebarCollapsed && (
                <span className="text-lg text-white hover:text-blue-400 transition-colors duration-300">
                  Jobs
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/applicant-list"
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
                isSidebarCollapsed ? "justify-center" : ""
              } ${isActive("/applicant-list") ? "bg-gray-700" : ""}`}
            >
              <Clipboard
                className={`${
                  isSidebarCollapsed ? "h-8 w-8" : "h-6 w-6"
                } text-blue-400`}
              />
              {!isSidebarCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg text-white hover:text-blue-400 transition-colors duration-300">
                    Applicants
                  </span>
                  {totalApplicants !== null && (
                    <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
                      {totalApplicants}
                    </span>
                  )}
                </div>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/employer-interview"
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
                isSidebarCollapsed ? "justify-center" : ""
              } ${isActive("/employer-interview") ? "bg-gray-700" : ""}`}
            >
              <CalendarCheck
                className={`${
                  isSidebarCollapsed ? "h-8 w-8" : "h-6 w-6"
                } text-blue-400`}
              />
              {!isSidebarCollapsed && (
                <span className="text-lg text-white hover:text-blue-400 transition-colors duration-300">
                  Interview Management
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/employer-hiring"
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
                isSidebarCollapsed ? "justify-center" : ""
              } ${isActive("/employer-hiring") ? "bg-gray-700" : ""}`}
            >
              <FileCheck
                className={`${
                  isSidebarCollapsed ? "h-8 w-8" : "h-6 w-6"
                } text-blue-400`}
              />
              {!isSidebarCollapsed && (
                <span className="text-lg text-white hover:text-blue-400 transition-colors duration-300">
                  Interview Management
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/messaging"
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
                isSidebarCollapsed ? "justify-center" : ""
              } ${isActive("/messaging") ? "bg-gray-700" : ""}`}
            >
              <Mail
                className={`${
                  isSidebarCollapsed ? "h-8 w-8" : "h-6 w-6"
                } text-blue-400`}
              />
              {!isSidebarCollapsed && (
                <span className="text-lg text-white hover:text-blue-400 transition-colors duration-300">
                  Messaging
                </span>
              )}
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-red-700 transition-all duration-300 w-full ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <LogOut
                className={`${
                  isSidebarCollapsed ? "h-8 w-8" : "h-6 w-6"
                } text-red-400`}
              />
              {!isSidebarCollapsed && (
                <span className="text-lg text-white hover:text-red-400 transition-colors duration-300">
                  Logout
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
