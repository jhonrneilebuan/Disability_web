
const RoleDropdown = ({ role, setRole }) => {
  return (
    <div className="relative mb-3">
      <label
        htmlFor="role"
        className="block text-sm font-medium text-black font-poppins"
      >
        Select Role
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 bg-gray-100 rounded-lg border border-gray-400 focus:border-black focus:ring-2 focus:ring-black text-black placeholder-gray-500 transition duration-200 appearance-none"
        required
      >
        <option value="" disabled className="bg-gray-100 text-black font-poppins">
          Choose a role
        </option>
        <option value="Applicant" className="bg-gray-100 text-black font-poppins">
          Applicant
        </option>
        <option value="Employer" className="bg-gray-100 text-black font-poppins">
          Employer
        </option>
      </select>
    </div>
  );
};

export default RoleDropdown;
