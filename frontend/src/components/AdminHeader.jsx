import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";
import { FaBell } from "react-icons/fa";

const Avatar = ({ children }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
      {children}
    </div>
  );
};

const AvatarFallback = ({ children }) => <>{children}</>;

const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    user,
    notifications,
    clearNotifications,
    fetchNotifications,
    markAllNotificationsAsRead,
  } = authStore();

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const handleNotificationClick = (notif) => {
    switch (notif.type) {
      case "newUserRegistration":
        if (notif.userRole === "Applicant") {
          navigate(`/admin/ApplicantList`);
        } else if (notif.userRole === "Employer") {
          navigate(`/admin/EmployerList`);
        } else {
          console.log("Unknown user role:", notif.userRole);
        }
        break;
      case "disabilityIdUpload":
        navigate(`/admin/disabilityVerification`);
        break;
      case "interviewDeclined":
        navigate(`/employer-interview?tab=scheduled`);
        break;
      case "employerIdUpload":
        navigate(`/admin/AdminEmployerVerifyId`);
        break;
      default:
        console.log("Unknown notification type:", notif.type);
    }
  };

  return (
    <header className="flex justify-end items-center p-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 hover:text-gray-300 focus:outline-none"
          >
            <FaBell className="w-6 h-6 text-white" fill="yellow"/>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isOpen && (
            <div className="absolute -right-14 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <div className="p-3 text-gray-700 font-semibold border-b font-poppins text-center">
                Notifications
              </div>
              {notifications.length > 0 ? (
                <ul className="max-h-48 overflow-y-scroll no-scrollbar">
                  {notifications.map((notif, index) => (
                    <li
                      key={notif._id || index}
                      onClick={() => handleNotificationClick(notif)}
                      className={`px-4 py-2 text-sm border-b hover:bg-gray-100 cursor-pointer ${
                        notif.isRead ? "text-gray-500 font-poppins" : "text-black font-poppins"
                      }`}
                    >
                      {notif?.message || notif}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-sm text-gray-500 font-poppins">
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
        </div>

        <Avatar>
          {user?.profilePicture ? (
            <AvatarImage
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarFallback>AD</AvatarFallback>
          )}
        </Avatar>
      </div>
    </header>
  );
};

export default AdminHeader;
