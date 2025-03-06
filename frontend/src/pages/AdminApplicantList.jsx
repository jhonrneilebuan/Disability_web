import { useEffect, useState } from "react";
import {
  fetchUsersApi,
  deleteUserApi,
  banUserApi,
  unbanUserApi,
  updateApplicant,
} from "../stores/adminApi";
import AdminListSkeletonLoader from "../components/AdminListSkeletonLoader";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBanned, setFilterBanned] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    address: "",
    role: "Applicant",
    isVerified: false,
    disabilityInformation: {
      disabilityType: "",
      accessibilityNeeds: "",
    },
  });

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const response = await fetchUsersApi();
      setApplicants(response.data.applicants);
    } catch (err) {
      setError("Failed to fetch applicants.");
    } finally {
      const elapsed = Date.now() - startTime;
      const remainingDelay = 2000 - elapsed;
      if (remainingDelay > 0) {
        setTimeout(() => {
          setLoading(false);
        }, remainingDelay);
      } else {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUserApi(userToDelete);
      fetchApplicants();
    } catch {
      setError("Failed to delete applicant.");
    } finally {
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleBanToggle = async (user) => {
    try {
      if (user.banned) {
        await unbanUserApi(user._id);
      } else {
        await banUserApi(user._id);
      }
      fetchApplicants();
    } catch {
      setError("Failed to update ban status.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await updateApplicant(selectedUser._id, formData);
      fetchApplicants();
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const filteredApplicants = applicants
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (user) => filterBanned === "All" || String(user.banned) === filterBanned
    );

  const disabilityTypes = [
    "Visual Impairment",
    "Hearing Impairment",
    "Mobility Impairment",
    "Cognitive Impairment",
    "Other",
  ];

  if (loading) {
    return <AdminListSkeletonLoader />;
  }

  return (
    <div className="p-6 bg--100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 font-poppins">APPLICANT LIST</h1>
      {error && <p className="text-center text-red-500 font-poppins">{error}</p>}

      <div className="flex space-x-4 mb-6 font-poppins">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <select
          value={filterBanned}
          onChange={(e) => setFilterBanned(e.target.value)}
          className="p-2 px-6 border rounded-md appearance-none font-poppins"
        >
          <option value="All">All Status</option>
          <option value="true">Banned</option>
          <option value="false">Active</option>
        </select>
      </div>

      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 font-poppins">
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Banned</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredApplicants].reverse().map((user) => (
              <tr key={user._id} className="border font-poppins">
                <td className="p-2 border text-left">{user.fullName}</td>
                <td className="p-2 border text-left">{user.email}</td>
                <td className="p-2 border text-center">{user.banned ? "Yes" : "No"}</td>
                <td className="p-2 border space-x-2 text-center">
                  <button
                    className="bg-blue-500 text-white p-2 px-4 rounded"
                    onClick={() => {
                      setSelectedUser(user);
                      setFormData({ ...user, password: "" });
                      setIsModalOpen(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 px-4 rounded"
                    onClick={() => {
                      setUserToDelete(user._id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={`p-2 px-4 rounded ${
                      user.banned ? "bg-yellow-500" : "bg-gray-500"
                    } text-white`}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={formData.fullName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label>Contact:</label>
                  <input
                    type="text"
                    value={formData.contact || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label>Role:</label>
                  <select
                    value={formData.role || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  >
                    <option value="Applicant">Applicant</option>
                    <option value="Employer">Employer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label>Verification:</label>
                  <select
                    value={formData.isVerified ? "true" : "false"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isVerified: e.target.value === "true",
                      })
                    }
                    className="border p-2 w-full rounded"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label>Disability Type:</label>
                  <select
                    value={formData.disabilityInformation?.disabilityType || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        disabilityInformation: {
                          ...formData.disabilityInformation,
                          disabilityType: e.target.value,
                        },
                      })
                    }
                    className="border p-2 w-full rounded"
                  >
                    {disabilityTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label>Accessibility Needs:</label>
                  <input
                    type="text"
                    value={
                      formData.disabilityInformation?.accessibilityNeeds || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        disabilityInformation: {
                          ...formData.disabilityInformation,
                          accessibilityNeeds: e.target.value,
                        },
                      })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this applicant?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantList;
