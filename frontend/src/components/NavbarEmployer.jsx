import React, { useState } from "react";
import { Bell, Search, CircleUser, Eye } from "lucide-react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";

const NavbarEmployer = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const { searchUsers, users, isLoading, error } = userStore();
  const navigate = useNavigate();

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
        <Bell
          size={20}
          className="cursor-pointer mr-5"
          onClick={toggleDropdown}
        />
        <CircleUser size={22} className="mr-5" />
      </div>

      {isDropdownOpen && (
        <div
          id="dropdownNotification"
          className="z-20 w-full max-w-xs bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 absolute right-0 mt-2 mr-5"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <a
              href="#"
              className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                <img
                  className="rounded-full w-11 h-11"
                  src="avatar.png"
                  alt="Jese image"
                />
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  New message from{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Mark Tristan Raroque
                  </span>
                  : "Good Morning"
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  a few moments ago
                </div>
              </div>
            </a>
          </div>

          <div className="flex justify-center items-center px-4 py-2 text-center">
            <a
              href="/notifications"
              className="flex items-center text-white hover:underline"
            >
              <Eye className="w-4 h-4 mr-2" />
              View All
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarEmployer;
