import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";
import { userStore } from "../stores/userStore";

const NavbarEmployer = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { notifications, clearNotifications, user, fetchNotifications } =
    authStore();

  const { searchUsers, users, isLoading, error } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSearch = () => {
    if (query.trim()) {
      searchUsers(query);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 text-white p-4 shadow-md relative">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Employer Panel</div>
        <div className="relative w-full max-w-screen-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none w-full"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) {
                searchUsers(e.target.value);
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />

          {query && (
            <div className="absolute bg-gray-700 text-white w-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
              {isLoading && (
                <p className="text-gray-400 px-4 py-2">Searching...</p>
              )}
              {error && (
                <p className="text-red-500 px-4 py-2">Error: {error}</p>
              )}
              {users.length > 0 &&
                users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer rounded"
                    onClick={() => handleUserClick(user._id)}
                  >
                    <img
                      src={user.profilePicture || "/avatar.png"}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>{user.fullName}</span>
                  </div>
                ))}
              {!isLoading && users.length === 0 && !error && (
                <p className="text-gray-400 px-4 py-2">No users found.</p>
              )}
            </div>
          )}
        </div>
        <button
          onClick={toggleDropdown}
          className="relative cursor-pointer mr-5"
        >
          <Bell className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 text-xs text-white px-1">
              {notifications.length}
            </span>
          )}
        </button>
        <div className="w-8 h-8 rounded-md overflow-hidden cursor-pointer">
          <img
            src={user.profilePicture || "avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isDropdownOpen && (
        <div
          id="dropdownNotification"
          className="z-20 w-full max-w-xs bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 absolute right-0 mt-2 mr-5"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-auto max-h-60">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <div
                  key={notif._id || index} 
                  className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    {notif?.message || notif} 
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-gray-500 text-center">
                No new notifications
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <button
              onClick={() => {
                clearNotifications();
                setIsDropdownOpen(false);
              }}
              className="w-full py-2 text-center text-red-600 hover:bg-gray-100"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarEmployer;
