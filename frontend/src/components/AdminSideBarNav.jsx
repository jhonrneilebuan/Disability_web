import { MdLogout } from "react-icons/md";
import { authStore } from "../stores/authStore";

const AdminSidebarNav = ({ handleNavigation }) => {
  const { logout } = authStore();


  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col p-5">
      <h1 className="text-xl font-bold text-center md:text-left">
        Admin Panel
      </h1>

      <nav className="mt-5 space-y-4 text-center md:text-left">
        <button
          onClick={() => handleNavigation("dashboard")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Dashboard
        </button>

        <button
          onClick={() => handleNavigation("adminProfile")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Profile
        </button>

        <button
          onClick={() => handleNavigation("EmployerList")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Employer Users
        </button>

        <button
          onClick={() => handleNavigation("ApplicantList")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Applicant Users
        </button>
        <button
          onClick={() => handleNavigation("AdminEmployerVerifyId")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          Employer Verification ID
        </button>

        <button
          onClick={() => handleNavigation("disabilityVerification")}
          className="block w-full py-2 px-4 rounded hover:bg-gray-700"
        >
          PWD Verification ID
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
