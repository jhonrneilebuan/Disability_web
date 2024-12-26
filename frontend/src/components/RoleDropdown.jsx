import React from "react";

const RoleDropdown = ({ role, setRole }) => {
  return (
    <div className="relative ">
      <label
        htmlFor="role"
        className="block text-sm font-medium text-gray-400"
      >
        Select Role
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 bg-gray-800 bg-opacity-50 text-green-400 rounded-lg border border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 mb-6"
        required
      >
        <option value="" disabled className="bg-gray-800 text-green-400">
          Choose a role
        </option>
        <option value="Applicant" className="bg-gray-800 text-green-400">
          Applicant
        </option>
        <option value="Employer" className="bg-gray-800 text-green-400">
          Employer
        </option>
      </select>
    </div>
  );
};

export default RoleDropdown;
