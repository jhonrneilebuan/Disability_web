import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const UserBan = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md rounded-2xl bg-white p-6 shadow-lg text-center">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800 font-poppins">Access Denied</h1>
        <p className="mt-2 text-gray-600 font-poppins">
          You have been banned from accessing this page.  
          If you believe this is an error, please contact support.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full rounded-xl bg-red-500 px-4 py-2 text-white font-semibold transition duration-200 hover:bg-red-600 font-poppins"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default UserBan;
