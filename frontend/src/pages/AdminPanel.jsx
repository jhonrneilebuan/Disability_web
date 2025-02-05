import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/AdminSideBarNav";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar
        handleNavigation={handleNavigation}
        handleLogout={handleLogout}
      />
      <main className="flex-1 bg-white shadow-md rounded-lg p-6 mx-4 my-4 overflow-auto">
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
};

export default AdminPanel;