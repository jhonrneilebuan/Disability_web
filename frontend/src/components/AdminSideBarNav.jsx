import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";

const AdminSidebarNav = ({ handleNavigation }) => {
  const { logout } = authStore(); 
  const navigate = useNavigate(); 

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();

  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <aside className={`w-full md:w-64 bg-gray-900 text-white flex flex-col p-5 ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all`}>
      <h1 className="text-xl font-bold text-center md:text-left">
        Admin Panel
      </h1>
      <button
        onClick={toggleSidebar}
        className="absolute top-6 -right-3 bg-white shadow-md border rounded-full p-1"
      >
        {isSidebarCollapsed ? ">" : "<"}
      </button>
      <nav className="mt-5 space-y-4 text-center md:text-left">
        <button
          onClick={() => handleNavigation("dashboard")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavigation("AdminUserList")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Users
        </button>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center md:justify-start gap-2 py-2 px-4 bg-red-600 rounded hover:bg-red-700"
      >
        <MdLogout /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebarNav;
