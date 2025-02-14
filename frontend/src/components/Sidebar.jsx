import { useEffect, useState } from "react";
import {
  BarChart,
  Briefcase,
  Mail,
  Clipboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { authStore } from "../stores/authStore";
import { jobStore } from "../stores/jobStore";
import { Link, useLocation } from "react-router-dom";

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
        className={`h-full bg-white shadow-xl relative  ${
          isSidebarCollapsed ? "w-20" : "w-60"
        } transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-6 -right-3 bg-white shadow-md border rounded-full p-1 ${
            isSidebarCollapsed ? "translate-x-3 right-1" : ""
          }`}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-5 w-5 text-blue-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-blue-gray-500" />
          )}
        </button>

        <div
          className={`p-4 flex justify-between ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
        >
          {!isSidebarCollapsed && (
            <h1 className="text-2xl text-blue-gray-700 font-bold"></h1>
          )}
        </div>
        <div className="ml-20">
          
        <img
          src="/sample-logo.png"
          alt="Admin Logo"
          className="w-20 h-20"
        />
        </div>

        <ul className="pt-4 space-y-2">
          {" "}
          <li
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100 ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <BarChart className="h-5 w-5 text-blue-gray-500" />
            {!isSidebarCollapsed && (
              <Link
                to="/employer"
                className={`${
                  isActive("/employer") ? "font-extrabold" : "font-semibold"
                } text-lg text-blue-gray-700`}
              >
                Dashboard
              </Link>
            )}
          </li>
          <li
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100 ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <Briefcase className="h-5 w-5 text-blue-gray-500" />
            {!isSidebarCollapsed && (
              <Link
                to="/post-job"
                className={`${
                  isActive("/post-job") ? "font-extrabold" : "font-semibold"
                } text-lg text-blue-gray-700`}
              >
                Jobs
              </Link>
            )}
          </li>
          <li
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100 ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <Clipboard className="h-5 w-5 text-blue-gray-500" />
            {!isSidebarCollapsed && (
              <Link
                to="/applicant-list"
                className={`${
                  isActive("/applicant-list")
                    ? "font-extrabold"
                    : "font-semibold"
                } text-lg text-blue-gray-700 flex items-center justify-between w-full`}
              >
                <span>Applicant</span>
                {totalApplicants !== null && (
                  <span className="text-sm font-normal">
                    {totalApplicants}
                  </span>
                )}
              </Link>
            )}
          </li>
          <li
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100 ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <Mail className="h-5 w-5 text-blue-gray-500" />
            {!isSidebarCollapsed && (
              <Link
                to="/messaging"
                className={`${
                  isActive("/messaging") ? "font-extrabold" : "font-semibold"
                } text-lg text-blue-gray-700`}
              >
                Messaging
              </Link>
            )}
          </li>
          <li
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-red-100 ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5 text-red-500" />
            {!isSidebarCollapsed && (
              <p
                onClick={handleLogout}
                className={`${
                  isActive("/logout") ? "font-extrabold" : "font-semibold"
                } text-lg text-red-600 cursor-pointer`}
              >
                Logout
              </p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
