import React, { useEffect, useState } from "react";
import {
  BarChart,
  Briefcase,
  Mail,
  User,
  Clipboard,
  Bell,
  LogOut,
} from "lucide-react";
import { authStore } from "../stores/authStore";
import { jobStore } from "../stores/jobStore";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { logout } = authStore();
  const location = useLocation();

  const { totalApplicants, getTotalApplications } = jobStore();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    getTotalApplications();
  }, [getTotalApplications]);

  return (
    <div className="h-screen w-full max-w-[20rem] p-4 bg-white shadow-xl">
      <div className="mb-4 p-4">
        <h1 className="text-3xl text-blue-gray-700 font-bold ">
          Employer Panel
        </h1>
      </div>

      <ul className="space-y-2">
        <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100">
          <BarChart className="h-5 w-5 text-blue-gray-500" />
          <Link
            to="/employer"
            className={`${
              isActive("/employer") ? "font-extrabold" : "font-semibold"
            } text-lg text-blue-gray-700`}
          >
            Dashboard
          </Link>
        </li>
        <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100">
          <Briefcase className="h-5 w-5 text-blue-gray-500" />
          <Link
            to="/post-job"
            className={`${
              isActive("/post-job") ? "font-extrabold" : "font-semibold"
            } text-lg text-blue-gray-700`}
          >
            Jobs
          </Link>
        </li>
        <li className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-blue-gray-100">
          <div className="flex items-center gap-4">
            <Clipboard className="h-5 w-5 text-blue-gray-500" />
            <Link
              to="/applicant-list"
              className={`${
                isActive("/applicant-list") ? "font-extrabold" : "font-semibold"
              } text-lg text-blue-gray-700`}
            >
              Applicant
            </Link>
          </div>
          <span className="text-sm bg-blue-gray-100 text-blue-gray-600 px-2 py-1 rounded-full">
            {totalApplicants}
          </span>
        </li>
        <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100">
          <Mail className="h-5 w-5 text-blue-gray-500" />
          <Link
            to="/messaging"
            className={`${
              isActive("/messaging") ? "font-extrabold" : "font-semibold"
            } text-lg text-blue-gray-700`}
          >
            Messaging
          </Link>
        </li>
        <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100">
          <User className="h-5 w-5 text-blue-gray-500" />
          <Link
            to="/profile"
            className={`${
              isActive("/profile") ? "font-extrabold" : "font-semibold"
            } text-lg text-blue-gray-700`}
          >
            Profile
          </Link>
        </li>
        <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-blue-gray-100">
          <Bell className="h-5 w-5 text-blue-gray-500" />
          <Link
            to="/notifications"
            className={`${
              isActive("/notifications") ? "font-extrabold" : "font-semibold"
            } text-lg text-blue-gray-700`}
          >
            Notifications
          </Link>
        </li>
        <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-100">
          <LogOut className="h-5 w-5 text-red-500" />
          <p
            onClick={handleLogout}
            className={`${
              isActive("/logout") ? "font-extrabold" : "font-semibold"
            } text-lg text-red-600`}
          >
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
