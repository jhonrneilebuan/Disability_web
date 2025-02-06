import React from "react";

const RoleDropdown = ({ role, setRole }) => {
  return (
    <div className="relative mb-3">
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
        className="w-full p-2 bg-gray-100 rounded-lg border border-gray-400 focus:border-black focus:ring-2 focus:ring-black text-black placeholder-gray-500 transition duration-200"
        required
      >
        <option value="" disabled className="bg-gray-100 text-black">
          Choose a role
        </option>
        <option value="Applicant" className="bg-gray-100 text-black">
          Applicant
        </option>
        <option value="Employer" className="bg-gray-100 text-black">
          Employer
        </option>
      </select>
    </div>
  );
};

export default RoleDropdown;
