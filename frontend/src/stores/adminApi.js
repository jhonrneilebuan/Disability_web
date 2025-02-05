// adminApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

// Retrieve the admin token (assumed to be stored in localStorage after login)
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` };

/**
 * Fetch users data from the backend.
 * Expected response shape: { employers: [...], applicants: [...] }
 */
export const fetchUsersApi = () => {
  return axios.get(`${BASE_URL}/get-users`, { headers });
};

/**
 * Delete a user by ID.
 */
export const deleteUserApi = (userId) => {
  return axios.delete(`${BASE_URL}/user/${userId}`, { headers });
};

/**
 * Ban a user by ID.
 */
export const banUserApi = (userId) => {
  return axios.patch(`${BASE_URL}/user/${userId}/ban`, {}, { headers });
};

/**
 * Unban a user by ID.
 */
export const unbanUserApi = (userId) => {
  return axios.patch(`${BASE_URL}/user/${userId}/unban`, {}, { headers });
};

/**
 * Update a user's full name by ID.
 */
export const updateUserApi = (userId, newFullName) => {
  return axios.put(`${BASE_URL}/users/${userId}`, { fullName: newFullName }, { headers });
};
