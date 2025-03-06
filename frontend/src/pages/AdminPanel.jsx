import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/AdminSideBarNav";
import AdminHeader from "../components/AdminHeader";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-800 text-white flex-shrink-0">
          <Sidebar handleNavigation={handleNavigation} handleLogout={handleLogout} />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
