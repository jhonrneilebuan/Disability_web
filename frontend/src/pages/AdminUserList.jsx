import { useEffect, useState } from "react";
import {
  fetchUsersApi,
  deleteUserApi,
  banUserApi,
  unbanUserApi,
} from "../stores/adminApi";

const AdminUserList = () => {
  const [users, setUsers] = useState({ employers: [], applicants: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterBanned, setFilterBanned] = useState("All");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsersApi();
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserApi(userId);
      fetchUsers();
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handleBanToggle = async (user) => {
    try {
      if (user.banned) {
        await unbanUserApi(user._id);
      } else {
        await banUserApi(user._id);
      }
      fetchUsers();
    } catch {
      setError("Failed to update ban status.");
    }
  };

  const filteredUsers = (usersList) => {
    return usersList
      .filter((user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((user) => filterRole === "All" || user.role?.toLowerCase() === filterRole.toLowerCase())
      .filter((user) => filterBanned === "All" || String(user.banned) === filterBanned);
  };

  return (
    <div className="p-6 bg--100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">USER LIST</h1>
      
      {loading && <p className="text-center text-gray-500">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="p-2 border rounded-md">
          <option value="All">All Roles</option>
          <option value="employer">Employer</option>
          <option value="applicant">Applicant</option>
        </select>
        <select value={filterBanned} onChange={(e) => setFilterBanned(e.target.value)} className="p-2 border rounded-md">
          <option value="All">All Status</option>
          <option value="true">Banned</option>
          <option value="false">Active</option>
        </select>
      </div>

      <div className="bg-white p-4 shadow rounded-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Banned</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers([...users.employers, ...users.applicants]).map((user) => (
              <tr key={user._id} className="text-center border">
                <td className="p-2 border">{user.fullName}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.banned ? "Yes" : "No"}</td>
                <td className="p-2 border space-x-2">
                  <button className="bg-blue-500 text-white p-1 rounded">Update</button>
                  <button className="bg-red-500 text-white p-1 rounded" onClick={() => handleDelete(user._id)}>Delete</button>
                  <button
                    className={`p-1 rounded ${user.banned ? "bg-yellow-500" : "bg-gray-500"} text-white`}
                    onClick={() => handleBanToggle(user)}
                  >
                    {user.banned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;
