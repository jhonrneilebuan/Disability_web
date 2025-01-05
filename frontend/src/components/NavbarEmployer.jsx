import React, { useState } from "react";
import { Bell, Search, CircleUser } from "lucide-react";
import { userStore } from "../stores/userStore";

const NavbarEmployer = () => {
  const [query, setQuery] = useState("");
  const { searchUsers, users, isLoading, error } = userStore();

  const handleSearch = () => {
    if (query.trim()) {
      searchUsers(query);
    }
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
        <Bell size={20} className="justify-end mr-5" />
        <CircleUser size={22} className="justify-end mr-5" />
      </div>
    </div>
  );
};

export default NavbarEmployer;
