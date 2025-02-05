// AdminUserList.jsx
import React, { useEffect, useState } from "react";
import {
  fetchUsersApi,
  deleteUserApi,
  banUserApi,
  unbanUserApi,
  updateUserApi,
} from "../stores/adminApi";

const AdminUserList = () => {
  const [users, setUsers] = useState({ employers: [], applicants: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch users from the backend API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsersApi();
      // Response data should have the shape: { employers: [...], applicants: [...] }
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await deleteUserApi(userId);
      fetchUsers(); // Refresh the list after deletion
    } catch (err) {
      console.error(err);
      setError("Error deleting user.");
    }
  };

  // Ban a user
  const banUser = async (userId) => {
    try {
      await banUserApi(userId);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Error banning user.");
    }
  };

  // Unban a user
  const unbanUser = async (userId) => {
    try {
      await unbanUserApi(userId);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Error unbanning user.");
    }
  };

  // Update a user (updates the full name)
  const updateUser = async (user) => {
    const newFullName = prompt("Enter new full name:", user.fullName);
    if (newFullName && newFullName !== user.fullName) {
      try {
        await updateUserApi(user._id, newFullName);
        fetchUsers();
      } catch (err) {
        console.error(err);
        setError("Error updating user.");
      }
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard - User List</h1>

      {/* Employers Table */}
      <h2>Employers</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.employers.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.contact}</td>
              <td>{user.banned ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => updateUser(user)}>Update</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                {user.banned ? (
                  <button onClick={() => unbanUser(user._id)}>Unban</button>
                ) : (
                  <button onClick={() => banUser(user._id)}>Ban</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Applicants Table */}
      <h2>Applicants</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Banned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.applicants.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.contact}</td>
              <td>{user.banned ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => updateUser(user)}>Update</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                {user.banned ? (
                  <button onClick={() => unbanUser(user._id)}>Unban</button>
                ) : (
                  <button onClick={() => banUser(user._id)}>Ban</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
