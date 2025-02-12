import { MdLogout, MdDashboard, MdPerson, MdPeople, MdVerifiedUser, MdAssignment } from "react-icons/md";
import { authStore } from "../stores/authStore";
import { useState } from "react";

const AdminSidebarNav = ({ handleNavigation }) => {
  const { logout } = authStore();
  const [activeNav, setActiveNav] = useState("dashboard");

  const handleLogout = () => {
    logout();
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    handleNavigation(navItem);
  };

  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-6 shadow-xl">
      <h1 className="text-2xl font-semibold text-center md:text-left mb-8 text-gray-100">
        Admin Panel
      </h1>

      <nav className="flex-1 space-y-2">
        {[
          { id: "dashboard", label: "Dashboard", icon: <MdDashboard className="w-6 h-6" /> },
          { id: "adminProfile", label: "Profile", icon: <MdPerson className="w-6 h-6" /> },
          { id: "EmployerList", label: "Employer Users", icon: <MdPeople className="w-6 h-6" /> },
          { id: "ApplicantList", label: "Applicant Users", icon: <MdPeople className="w-6 h-6" /> },
          { id: "AdminEmployerVerifyId", label: "Employer Verification ID", icon: <MdVerifiedUser className="w-6 h-6" /> },
          { id: "disabilityVerification", label: "PWD Verification ID", icon: <MdAssignment className="w-6 h-6" /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex items-center w-full py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
              activeNav === item.id ? "bg-gray-700 text-white font-medium" : "text-gray-300"
            }`}
          >
            <span className="mr-3 hover:text-white transition-all duration-300">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 flex items-center justify-center md:justify-start gap-2 py-3 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300"
      >
        <MdLogout className="w-6 h-6" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default AdminSidebarNav;